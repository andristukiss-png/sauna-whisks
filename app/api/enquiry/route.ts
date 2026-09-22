import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  website?: string;
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();
    const subject = (body.subject || "SaunaWhisks.com enquiry")
      .replace(/[\r\n]+/g, " ")
      .trim()
      .slice(0, 160);
    const website = (body.website || "").trim();

    // Honeypot field: bots often fill this invisible field.
    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!validEmail(email) || email.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Please enter an enquiry between 10 and 5000 characters." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ENQUIRY_FROM_EMAIL || "Sauna Whisks <onboarding@resend.dev>";
    const to = process.env.ENQUIRY_TO_EMAIL || "info@SaunaWhisks.com";

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "Email delivery is not configured yet.",
          fallback: "mailto",
        },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend enquiry error:", response.status, details);
      return NextResponse.json(
        { error: "We could not send your enquiry right now.", fallback: "mailto" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry route error:", error);
    return NextResponse.json(
      { error: "We could not send your enquiry right now.", fallback: "mailto" },
      { status: 500 }
    );
  }
}
