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
  return (value || "").replace(/[\r\n\u0000]+/g, " ").trim().slice(0, max);
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  const reply = (
    body: Record<string, unknown>,
    status = 200
  ) =>
    NextResponse.json(
      { ...body, requestId },
      {
        status,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Request-ID": requestId,
        },
      }
    );

  try {
    const requestUrl = new URL(request.url);
    const origin = request.headers.get("origin");

    if (origin && origin !== requestUrl.origin) {
      return reply({ error: "Unsupported origin." }, 403);
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return reply({ error: "Unsupported request." }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 20_000) {
      return reply({ error: "Request too large." }, 413);
    }

    const body = (await request.json()) as EnquiryPayload;

    const name = cleanOptional(body.name, 120);
    const email = cleanOptional(body.email, 200);
    const message = (body.message || "").replace(/\u0000/g, "").trim();
    const subject = cleanOptional(body.subject || "SaunaWhisks.com enquiry", 160);
    const website = cleanOptional(body.website, 200);
    const topic = cleanOptional(body.topic, 120);
    const business = cleanOptional(body.business, 200);
    const country = cleanOptional(body.country, 120);
    const quantity = cleanOptional(body.quantity, 120);
    const pageUrl = cleanOptional(body.pageUrl, 500);
    const startedAt = Number(body.startedAt || "0");

    if (website) {
      return reply({ ok: true });
    }

    if (startedAt && Date.now() - startedAt < 1800) {
      return reply({ ok: true });
    }

    if (name.length < 2) {
      return reply({ error: "Please enter your name." }, 400);
    }

    if (!validEmail(email)) {
      return reply({ error: "Please enter a valid email address." }, 400);
    }

    if (message.length < 10 || message.length > 5000) {
      return reply(
        { error: "Please enter an enquiry between 10 and 5000 characters." },
        400
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ENQUIRY_FROM_EMAIL || "Sauna Whisks <onboarding@resend.dev>";
    const to = process.env.ENQUIRY_TO_EMAIL || "info@SaunaWhisks.com";

    if (!apiKey) {
      return reply(
        { error: "Email delivery is not configured yet.", fallback: "mailto" },
        503
      );
    }

    const context = [
      topic ? `Topic: ${topic}` : "",
      business ? `Business: ${business}` : "",
      country ? `Country: ${country}` : "",
      quantity ? `Approx. monthly requirement: ${quantity}` : "",
      pageUrl ? `Page: ${pageUrl}` : "",
      `Request ID: ${requestId}`,
    ].filter(Boolean);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(10_000),
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
      console.error("Resend enquiry error", { requestId, status: response.status, details });
      return reply(
        { error: "We could not send your enquiry right now.", fallback: "mailto" },
        502
      );
    }

    return reply({ ok: true });
  } catch (error) {
    console.error("Enquiry route error", { requestId, error });
    return reply(
      { error: "We could not send your enquiry right now.", fallback: "mailto" },
      500
    );
  }
}
