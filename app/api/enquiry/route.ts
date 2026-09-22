import { NextResponse } from "next/server";

type EnquiryPayload = {
  name?: string;
  email?: string;
  message?: string;
  subject?: string;
  website?: string;
  topic?: string;
  business?: string;
  country?: string;
  quantity?: string;
  pageUrl?: string;
  startedAt?: string;
};

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanOptional(value: string | undefined, max = 200) {
  return (value || "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Unsupported request." }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 20_000) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const body = (await request.json()) as EnquiryPayload;

    const name = cleanOptional(body.name, 120);
    const email = cleanOptional(body.email, 200);
    const message = (body.message || "").trim();
    const subject = cleanOptional(body.subject || "SaunaWhisks.com enquiry", 160);
    const website = cleanOptional(body.website, 200);
    const topic = cleanOptional(body.topic, 120);
    const business = cleanOptional(body.business, 200);
    const country = cleanOptional(body.country, 120);
    const quantity = cleanOptional(body.quantity, 120);
    const pageUrl = cleanOptional(body.pageUrl, 500);
    const startedAt = Number(body.startedAt || "0");

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (startedAt && Date.now() - startedAt < 1800) {
      return NextResponse.json({ ok: true });
    }

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }

    if (!validEmail(email)) {
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
        { error: "Email delivery is not configured yet.", fallback: "mailto" },
        { status: 503 }
      );
    }

    const context = [
      topic ? `Topic: ${topic}` : "",
      business ? `Business: ${business}` : "",
      country ? `Country: ${country}` : "",
      quantity ? `Approx. monthly requirement: ${quantity}` : "",
      pageUrl ? `Page: ${pageUrl}` : "",
    ].filter(Boolean);

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
          ...context,
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
