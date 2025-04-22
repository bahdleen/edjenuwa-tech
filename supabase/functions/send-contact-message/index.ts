
// Edge Function for sending contact form submissions via Resend to info@edjenuwa.tech

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <pre>${message}</pre>
    `;

    // Send to the designated email
    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["info@edjenuwa.tech"],
      reply_to: email,
      subject: "New Contact Form Submission",
      html,
    });

    // Check for error in a more detailed way
    if (emailResponse.error) {
      // For free tier users, we might get an object as an error
      const errorMessage = typeof emailResponse.error === 'object' 
        ? "Email sending failed. This might be due to using Resend's free tier limitations." 
        : String(emailResponse.error);
        
      console.error("Resend API error:", errorMessage);
      throw new Error(errorMessage);
    }

    return new Response(JSON.stringify({ message: "sent" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-contact-message:", error);
    return new Response(
      JSON.stringify({
        error: typeof error === "object" && error !== null && "message" in error
          ? (error as any).message
          : "Email sending failed. Please try again or contact directly."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
