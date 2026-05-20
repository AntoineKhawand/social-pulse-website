import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, services, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return NextResponse.json(
        { error: "Email service is currently misconfigured." },
        { status: 500 }
      );
    }

    // Construct the email body
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 8px;">
        <h2 style="color: #7C3AED; border-bottom: 2px solid #7C3AED; padding-bottom: 10px;">New Social Pulse Lead</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #1a202c;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
            <td style="padding: 8px 0; color: #1a202c;">
              <a href="mailto:${email}" style="color: #7C3AED; text-decoration: none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Company/Brand:</td>
            <td style="padding: 8px 0; color: #1a202c;">${company || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Services:</td>
            <td style="padding: 8px 0; color: #1a202c;">${services || "None selected"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Budget:</td>
            <td style="padding: 8px 0; color: #1a202c;">${budget || "Not specified"}</td>
          </tr>
        </table>

        <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <h3 style="color: #4a5568; margin-bottom: 10px;">Project Description:</h3>
          <p style="color: #2d3748; line-height: 1.6; white-space: pre-wrap; background-color: #f7fafc; padding: 15px; border-radius: 6px;">
            ${message}
          </p>
        </div>

        <div style="margin-top: 40px; font-size: 12px; color: #a0aec0; text-align: center;">
          Sent from Social Pulse Agency website contact form.
        </div>
      </div>
    `;

    // Fetch Resend REST API directly
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Social Pulse Lead <onboarding@resend.dev>",
        to: "socialpulselb@gmail.com",
        subject: `New Lead: ${name} (${company || "Inquiry"})`,
        html: emailHtml,
        replyTo: email,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error response:", resendResult);
      return NextResponse.json(
        { error: resendResult.message || "Failed to send email via Resend." },
        { status: resendResponse.status }
      );
    }

    return NextResponse.json({ success: true, id: resendResult.id });
  } catch (error: any) {
    console.error("Error inside contact API route:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
