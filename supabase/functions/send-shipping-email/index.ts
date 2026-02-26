import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, customerName, orderNumber, trackingCode } = await req.json();

    if (!to || !customerName || !orderNumber) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const trackingHtml = trackingCode
      ? `<div style="background: #f0f7ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
           <p style="margin: 0; font-size: 14px; color: #666;">Track &amp; Trace code</p>
           <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: bold; color: #333;">${trackingCode}</p>
         </div>`
      : "";

    const html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3d8c26, #5ec035); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 26px;">Je bestelling is onderweg!</h1>
        </div>
        <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px;">Hallo ${customerName},</p>
          <p>Goed nieuws! Je belettering is klaar en op weg naar jou. Je kunt hem binnenkort verwachten.</p>

          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">Bestelnummer</p>
            <p style="margin: 5px 0 0 0; font-size: 22px; font-weight: bold; color: #3d8c26;">${orderNumber}</p>
          </div>

          ${trackingHtml}

          <div style="margin-top: 24px; padding: 16px; background: #f0f8eb; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px;">Tips voor het plakken</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px;">
              <li>Reinig het oppervlak goed voor het plakken</li>
              <li>Plak bij voorkeur boven 10°C</li>
              <li>Gebruik een bankpasje om luchtbellen te verwijderen</li>
              <li>Bekijk onze instructievideo op de website voor hulp</li>
            </ul>
          </div>

          <p style="margin-top: 24px; color: #666; font-size: 14px;">
            Vragen? Neem contact op via <a href="mailto:info@beletteringbestellen.nl" style="color: #3d8c26;">info@beletteringbestellen.nl</a> of bel <a href="tel:0614145350" style="color: #3d8c26;">06 14 14 53 50</a>.
          </p>
        </div>
        <div style="text-align: center; padding: 16px; color: #999; font-size: 12px;">
          &copy; ${new Date().getFullYear()} BeletteringBestellen.nl
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BeletteringBestellen <info@beletteringbestellen.nl>",
        to: [to],
        subject: `Je bestelling ${orderNumber} is verzonden! — BeletteringBestellen`,
        html,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: resData }),
        { status: res.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: resData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
