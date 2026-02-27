import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  text: string;
  font: string;
  color: string;
  height: number;
  quantity: number;
  price: number;
}

interface OrderEmailRequest {
  to: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
  };
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(price);
};

const generateEmailHtml = (data: OrderEmailRequest): string => {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee;">
          <strong>${item.text}</strong><br>
          <span style="color: #666; font-size: 14px;">${item.font} · ${item.color} · ${item.height}cm · ${item.quantity}×</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">${formatPrice(item.price)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Orderbevestiging</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Bedankt voor je bestelling!</h1>
      </div>

      <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-top: none;">
        <p style="font-size: 16px;">Hallo ${data.customerName},</p>

        <p>Bedankt voor je bestelling bij BeletteringBestellen.nl! We hebben je bestelling ontvangen en gaan deze zo snel mogelijk verwerken.</p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #666;">Bestelnummer</p>
          <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #667eea;">${data.orderNumber}</p>
        </div>

        <h2 style="font-size: 18px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Je bestelling</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f8f9fa;">
              <th style="padding: 12px; text-align: left;">Product</th>
              <th style="padding: 12px; text-align: right;">Totaal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
          <p style="margin: 5px 0;"><span style="color: #666;">Subtotaal:</span> ${formatPrice(data.subtotal)}</p>
          <p style="margin: 5px 0;"><span style="color: #666;">Verzending:</span> ${data.shipping === 0 ? "Gratis" : formatPrice(data.shipping)}</p>
          <p style="margin: 10px 0 0 0; font-size: 20px; font-weight: bold;"><span style="color: #666;">Totaal:</span> ${formatPrice(data.total)}</p>
        </div>

        <h2 style="font-size: 18px; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Verzendadres</h2>

        <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
          ${data.customerName}<br>
          ${data.address.street} ${data.address.houseNumber}<br>
          ${data.address.postalCode} ${data.address.city}
        </p>

        <div style="margin-top: 30px; padding: 20px; background: #f0f7ff; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px;">Wat gebeurt er nu?</h3>
          <ol style="margin: 0; padding-left: 20px; color: #555;">
            <li>We gaan je belettering produceren</li>
            <li>Je ontvangt een e-mail wanneer je bestelling verzonden wordt</li>
            <li>Verwachte levertijd: 3-5 werkdagen</li>
          </ol>
        </div>

        <p style="margin-top: 30px; color: #666;">
          Vragen over je bestelling? Neem contact met ons op via <a href="mailto:info@beletteringbestellen.nl" style="color: #667eea;">info@beletteringbestellen.nl</a>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
        <p>&copy; ${new Date().getFullYear()} BeletteringBestellen.nl - Alle rechten voorbehouden</p>
      </div>
    </body>
    </html>
  `;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const data: OrderEmailRequest = await req.json();

    // Validate required fields
    if (!data.to || !data.orderNumber || !data.customerName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = generateEmailHtml(data);

    // Send confirmation email to customer
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BeletteringBestellen <info@beletteringbestellen.nl>",
        to: [data.to],
        subject: `Orderbevestiging ${data.orderNumber} - BeletteringBestellen`,
        html: emailHtml,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", resData);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resData }),
        {
          status: res.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send notification email to shop owner
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BeletteringBestellen <info@beletteringbestellen.nl>",
        to: ["info@beletteringbestellen.nl"],
        subject: `🛒 Nieuwe bestelling ${data.orderNumber} - €${data.total.toFixed(2)}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #3d8c26; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: white; margin: 0; font-size: 20px;">Nieuwe bestelling ontvangen!</h2>
            </div>
            <div style="border: 1px solid #ddd; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">

              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; color: #666; width: 140px;">Bestelnummer</td><td style="padding: 6px 0; font-weight: bold;">${data.orderNumber}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Klant</td><td style="padding: 6px 0;">${data.customerName}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">E-mail</td><td style="padding: 6px 0;"><a href="mailto:${data.to}">${data.to}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Verzendadres</td><td style="padding: 6px 0;">${data.address.street} ${data.address.houseNumber}, ${data.address.postalCode} ${data.address.city}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;">Totaal</td><td style="padding: 6px 0; font-weight: bold; font-size: 18px;">€${data.total.toFixed(2)}</td></tr>
              </table>

              <h3 style="border-bottom: 2px solid #eee; padding-bottom: 8px; margin-bottom: 12px;">Te maken — productiedetails</h3>

              ${data.items.map((item: OrderItem, i: number) => `
                <div style="background: #f9f9f9; border-left: 4px solid #3d8c26; padding: 14px 16px; margin-bottom: 12px; border-radius: 0 6px 6px 0;">
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${i + 1}. &ldquo;${item.text}&rdquo;</div>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 3px 12px 3px 0; color: #666;">Lettertype</td>
                      <td style="padding: 3px 0; font-weight: bold;">${item.font}</td>
                    </tr>
                    <tr>
                      <td style="padding: 3px 12px 3px 0; color: #666;">Kleur</td>
                      <td style="padding: 3px 0;">
                        <span style="display: inline-block; width: 14px; height: 14px; background: ${item.color}; border: 1px solid #ccc; border-radius: 3px; vertical-align: middle; margin-right: 6px;"></span>
                        <strong>${item.color}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 3px 12px 3px 0; color: #666;">Hoogte</td>
                      <td style="padding: 3px 0; font-weight: bold;">${item.height} cm</td>
                    </tr>
                    <tr>
                      <td style="padding: 3px 12px 3px 0; color: #666;">Aantal</td>
                      <td style="padding: 3px 0; font-weight: bold;">${item.quantity}×</td>
                    </tr>
                    <tr>
                      <td style="padding: 3px 12px 3px 0; color: #666;">Prijs</td>
                      <td style="padding: 3px 0;">€${item.price.toFixed(2)}</td>
                    </tr>
                  </table>
                </div>
              `).join('')}

            </div>
          </div>`,
      }),
    });

    return new Response(
      JSON.stringify({ success: true, messageId: resData.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
