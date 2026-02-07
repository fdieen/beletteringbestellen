import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  amount: number;
  description: string;
  redirectUrl: string;
  webhookUrl: string;
  metadata: {
    order_id: string;
    customer_email: string;
  };
  method?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MOLLIE_API_KEY = Deno.env.get("MOLLIE_API_KEY");

    if (!MOLLIE_API_KEY) {
      throw new Error("MOLLIE_API_KEY is not configured");
    }

    const { amount, description, redirectUrl, webhookUrl, metadata, method }: PaymentRequest = await req.json();

    // Validate required fields
    if (!amount || !description || !redirectUrl || !metadata?.order_id) {
      throw new Error("Missing required fields: amount, description, redirectUrl, metadata.order_id");
    }

    // Create payment via Mollie API
    const molliePayload: Record<string, unknown> = {
      amount: {
        currency: "EUR",
        value: amount.toFixed(2), // Mollie requires string with 2 decimals
      },
      description,
      redirectUrl,
      webhookUrl,
      metadata,
    };

    // Add specific payment method if provided
    if (method) {
      molliePayload.method = method;
    }

    const mollieResponse = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MOLLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(molliePayload),
    });

    if (!mollieResponse.ok) {
      const errorData = await mollieResponse.json();
      console.error("Mollie API error:", errorData);
      throw new Error(`Mollie API error: ${errorData.detail || errorData.title || "Unknown error"}`);
    }

    const molliePayment = await mollieResponse.json();

    // Return the checkout URL to redirect the customer
    return new Response(
      JSON.stringify({
        success: true,
        paymentId: molliePayment.id,
        checkoutUrl: molliePayment._links.checkout.href,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
