
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

    if (!email) {
      throw new Error("Email is required");
    }

    const emailResponse = await resend.emails.send({
      from: "The Alerts Company <alerts@resend.dev>",
      to: ["ruben.stolk@capptions.com"],
      subject: "🎉 New Waitlist Signup!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Waitlist Signup</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 20px auto; padding: 20px; }
              .header { background: #7c3aed; color: white; padding: 20px; border-radius: 8px; }
              .content { margin: 20px 0; }
              .footer { color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Waitlist Signup!</h1>
              </div>
              <div class="content">
                <p>A new user has joined the waitlist:</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>
              <div class="footer">
                <p>Best regards,<br>The Alerts Company Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email notification sent successfully:", emailResponse);

    if (emailResponse.error) {
      throw new Error(`Failed to send email: ${emailResponse.error.message}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in notify-waitlist-signup function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: "error",
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
