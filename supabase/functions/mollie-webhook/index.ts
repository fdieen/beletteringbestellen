import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!MOLLIE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing environment variables");
    }

    // Mollie sends payment ID in the body
    const formData = await req.formData();
    const paymentId = formData.get("id");

    if (!paymentId) {
      throw new Error("No payment ID provided");
    }

    console.log("Webhook received for payment:", paymentId);

    // Fetch payment details from Mollie
    const mollieResponse = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: {
        "Authorization": `Bearer ${MOLLIE_API_KEY}`,
      },
    });

    if (!mollieResponse.ok) {
      throw new Error("Failed to fetch payment from Mollie");
    }

    const payment = await mollieResponse.json();
    console.log("Payment status:", payment.status);

    // Initialize Supabase client with service role (admin access)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get order ID and customer email from metadata
    const orderId = payment.metadata?.order_id;
    const customerEmail = payment.metadata?.customer_email;

    if (!orderId) {
      console.error("No order_id in payment metadata");
      return new Response("OK", { status: 200 });
    }

    // Map Mollie status to our order status
    let orderStatus: string;
    switch (payment.status) {
      case "paid":
        orderStatus = "paid";
        break;
      case "failed":
      case "canceled":
      case "expired":
        orderStatus = "payment_failed";
        break;
      case "pending":
      case "open":
        orderStatus = "pending";
        break;
      default:
        orderStatus = "pending";
    }

    // If payment is successful and we have an email, try to find the user
    let userId = null;
    if (payment.status === "paid" && customerEmail) {
      // Look up user by email
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

      if (!userError && userData?.users) {
        const matchingUser = userData.users.find(
          (u) => u.email?.toLowerCase() === customerEmail.toLowerCase()
        );
        if (matchingUser) {
          userId = matchingUser.id;
          console.log("Found user for email:", customerEmail, "-> user_id:", userId);
        }
      }
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      status: orderStatus,
    };

    // If we found a user, link the order to them
    if (userId) {
      updateData.user_id = userId;
    }

    // Update order status in database
    const { error: updateError } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (updateError) {
      console.error("Error updating order:", updateError);
    } else {
      console.log("Order updated successfully:", orderId, "-> status:", orderStatus, userId ? `-> user: ${userId}` : "");
    }

    // Mollie expects a 200 response
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    // Still return 200 to prevent Mollie from retrying
    return new Response("OK", { status: 200 });
  }
});
