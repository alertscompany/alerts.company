
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistSignupRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WaitlistSignupRequest = await req.json();
    console.log("Received notification for new waitlist signup:", email);

    const emailResponse = await resend.emails.send({
      from: "The Alerts Company <onboarding@resend.dev>",
      to: ["ruben.stolk@capptions.com"],
      subject: "New Waitlist Signup!",
      html: `
        <h1>New Waitlist Signup</h1>
        <p>A new user has joined the waitlist:</p>
        <p><strong>Email:</strong> ${email}</p>
        <br>
        <p>Best regards,<br>The Alerts Company Team</p>
      `,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-waitlist-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
