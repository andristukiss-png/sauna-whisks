"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type EnquiryFormProps = {
  subject?: string;
  topics?: string[];
  businessFields?: boolean;
  countryField?: boolean;
  messagePlaceholder?: string;
};

export function EnquiryForm({
  subject = "SaunaWhisks.com enquiry",
  topics,
  businessFields = false,
  countryField = false,
  messagePlaceholder = "Tell us what you are looking for...",
}: EnquiryFormProps) {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Your enquiry will be sent to info@SaunaWhisks.com."
  );

  function openMailFallback(fields: Record<string, string>) {
    const lines = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      fields.topic ? `Topic: ${fields.topic}` : "",
      fields.business ? `Business: ${fields.business}` : "",
      fields.country ? `Country: ${fields.country}` : "",
      fields.quantity ? `Approx. monthly requirement: ${fields.quantity}` : "",
      fields.pageUrl ? `Page: ${fields.pageUrl}` : "",
      "",
      "Enquiry:",
      fields.message,
    ].filter(Boolean);

    window.location.href =
      "mailto:info@SaunaWhisks.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const element = event.currentTarget;
    const form = new FormData(element);
    const fields = {
      name: String(form.get("name") || "").trim(),
      email: String(form.get("email") || "").trim(),
      message: String(form.get("message") || "").trim(),
      website: String(form.get("website") || "").trim(),
      topic: String(form.get("topic") || "").trim(),
      business: String(form.get("business") || "").trim(),
      country: String(form.get("country") || "").trim(),
      quantity: String(form.get("quantity") || "").trim(),
      pageUrl: window.location.href,
      startedAt: String(startedAt.current),
    };

    setStatus("sending");
    setStatusMessage("Sending your enquiry…");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, subject }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        fallback?: string;
      };

      if (response.ok && data.ok) {
        setStatus("success");
        setStatusMessage("Thank you. Your enquiry has been sent.");
        element.reset();
        return;
      }

      if (data.fallback === "mailto") {
        setStatus("error");
        setStatusMessage("Opening your email app as a fallback…");
        openMailFallback(fields);
        return;
      }

      setStatus("error");
      setStatusMessage(data.error || "Please try again.");
    } catch {
      setStatus("error");
      setStatusMessage("Opening your email app as a fallback…");
      openMailFallback(fields);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submitEnquiry}>
      <div className="enquiry-two">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      {topics?.length ? (
        <label>
          <span>Enquiry type</span>
          <select name="topic" defaultValue="">
            <option value="">Choose a topic</option>
            {topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}
          </select>
        </label>
      ) : null}

      {countryField && !businessFields ? (
        <label>
          <span>Country</span>
          <input name="country" type="text" autoComplete="country-name" required />
        </label>
      ) : null}

      {businessFields ? (
        <>
          <div className="enquiry-two">
            <label>
              <span>Business / venue</span>
              <input name="business" type="text" autoComplete="organization" />
            </label>
            <label>
              <span>Country</span>
              <input name="country" type="text" autoComplete="country-name" />
            </label>
          </div>
          <label>
            <span>Approx. monthly requirement</span>
            <input name="quantity" type="text" placeholder="e.g. 24, 100, 500 whisks" />
          </label>
        </>
      ) : null}

      <label className="enquiry-honeypot" aria-hidden="true">
        <span>Website</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label>
        <span>Your enquiry</span>
        <textarea
          name="message"
          rows={7}
          minLength={10}
          maxLength={5000}
          placeholder={messagePlaceholder}
          required
        />
      </label>

      <div className="enquiry-submit">
        <button
          className="button button-dark"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <div className="enquiry-status-wrap">
          <p
            className={
              status === "success"
                ? "form-status success"
                : status === "error"
                  ? "form-status error"
                  : "form-status"
            }
            aria-live="polite"
          >
            {statusMessage}
          </p>
          <small>
            We use your details only to respond to this enquiry. <Link href="/privacy">Privacy</Link>.
          </small>
        </div>
      </div>
    </form>
  );
}
