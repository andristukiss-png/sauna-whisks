import { NextResponse } from "next/server";

type EnquiryPayload = Record<string, unknown>;

const STRING_FIELDS = [
  "name",
  "email",
  "message",
  "subject",
  "website",
  "topic",
  "business",
  "country",
  "quantity",
  "pageUrl",
  "elapsedMs",
] as const;

const MAX_BODY_BYTES = 20_000;

class RequestTooLargeError extends Error {}

async function readTextBodyWithLimit(request: Request, maxBytes: number) {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        try {
          await reader.cancel("Request body exceeds the configured limit.");
        } catch {}
        throw new RequestTooLargeError("Request body too large");
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();
    return text;
  } finally {
    reader.releaseLock();
  }
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function configuredEmail(value: string | undefined) {
  const cleaned = (value || "").replace(/[\r\n\u0000]+/g, " ").trim();
  const angle = cleaned.match(/<([^<>]+)>$/);
  const address = (angle?.[1] || cleaned).trim();
  return validEmail(address) ? cleaned : "";
}

function cleanOptional(value: unknown, max = 200) {
  return (typeof value === "string" ? value : "")
    .replace(/[\r\n\u0000]+/g, " ")
    .trim()
    .slice(0, max);
}

function hasInvalidFieldTypes(body: EnquiryPayload) {
  return STRING_FIELDS.some(
    (field) =>
      Object.prototype.hasOwnProperty.call(body, field) &&
      body[field] !== undefined &&
      body[field] !== null &&
      typeof body[field] !== "string"
  );
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
    const fetchSite = request.headers.get("sec-fetch-site");

    if (origin && origin !== requestUrl.origin) {
      return reply({ error: "Unsupported origin." }, 403);
    }

    if (fetchSite === "cross-site") {
      return reply({ error: "Unsupported request context." }, 403);
    }

    const contentType = request.headers.get("content-type") || "";
    const mediaType = contentType.split(";")[0]?.trim().toLowerCase() || "";
    if (mediaType !== "application/json") {
      return reply({ error: "Unsupported request." }, 415);
    }

    const contentLengthHeader = request.headers.get("content-length");
    const contentLength = contentLengthHeader ? Number(contentLengthHeader) : 0;
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return reply({ error: "Request too large." }, 413);
    }

    let rawBody = "";
    try {
      rawBody = await readTextBodyWithLimit(request, MAX_BODY_BYTES);
    } catch (error) {
      if (error instanceof RequestTooLargeError) {
        return reply({ error: "Request too large." }, 413);
      }
      throw error;
    }

    let body: EnquiryPayload;
    try {
      const parsed = JSON.parse(rawBody) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        return reply({ error: "Invalid request." }, 400);
      }
      body = parsed as EnquiryPayload;
      if (hasInvalidFieldTypes(body)) {
        return reply({ error: "Invalid field type." }, 400);
      }
    } catch {
      return reply({ error: "Invalid JSON." }, 400);
    }

    const name = cleanOptional(body.name, 120);
    const email = cleanOptional(body.email, 200);
    const message = (typeof body.message === "string" ? body.message : "")
      .replace(/\u0000/g, "")
      .trim();
    const subject = cleanOptional(
      typeof body.subject === "string" && body.subject ? body.subject : "SaunaWhisks.com enquiry",
      160
    );
    const website = cleanOptional(body.website, 200);
    const topic = cleanOptional(body.topic, 120);
    const business = cleanOptional(body.business, 200);
    const country = cleanOptional(body.country, 120);
    const quantity = cleanOptional(body.quantity, 120);
    const submittedPageUrl = cleanOptional(body.pageUrl, 500);
    const pageUrl = submittedPageUrl.startsWith(requestUrl.origin + "/") ? submittedPageUrl : "";
    const elapsedMs = Number(typeof body.elapsedMs === "string" ? body.elapsedMs : "0");

    if (website) {
      return reply({ ok: true });
    }

    if (Number.isFinite(elapsedMs) && elapsedMs > 0 && elapsedMs < 1800) {
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

    const apiKey = (process.env.RESEND_API_KEY || "").trim();
    const from = configuredEmail(process.env.ENQUIRY_FROM_EMAIL);
    const to = configuredEmail(process.env.ENQUIRY_TO_EMAIL);

    if (!apiKey || !from || !to) {
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
      console.error("Resend enquiry error", { requestId, status: response.status });
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
