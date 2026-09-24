"use client";

import site from "@/config/site.json";
import Link from "next/link";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

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
  const statusId = useId();
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState(
    `Your enquiry will be sent to ${site.publicEmail}.`
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
      `mailto:${site.publicEmail}?subject=` +
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
        setStatusMessage("Thank you. Your enquiry was submitted.");
        element.reset();
        startedAt.current = Date.now();
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
    <form className="enquiry-form" onSubmit={submitEnquiry} aria-busy={status === "sending"}>
      <div className="enquiry-two">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" inputMode="email" maxLength={200} required />
        </label>
      </div>

      {topics?.length ? (
        <label>
          <span>Enquiry type</span>
          <select name="topic" defaultValue="" aria-label="Enquiry type">
            <option value="">Choose a topic</option>
            {topics.map((topic) => <option value={topic} key={topic}>{topic}</option>)}
          </select>
        </label>
      ) : null}

      {countryField && !businessFields ? (
        <label>
          <span>Country</span>
          <input name="country" type="text" autoComplete="country-name" maxLength={120} required />
        </label>
      ) : null}

      {businessFields ? (
        <>
          <div className="enquiry-two">
            <label>
              <span>Business / venue</span>
              <input name="business" type="text" autoComplete="organization" maxLength={200} />
            </label>
            <label>
              <span>Country</span>
              <input name="country" type="text" autoComplete="country-name" maxLength={120} />
            </label>
          </div>
          <label>
            <span>Approx. monthly requirement</span>
            <input name="quantity" type="text" maxLength={120} placeholder="e.g. 24, 100, 500 whisks" />
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
          aria-describedby={statusId}
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
            id={statusId}
            className={
              status === "success"
                ? "form-status success"
                : status === "error"
                  ? "form-status error"
                  : "form-status"
            }
            role="status"
            aria-live="polite"
            aria-atomic="true"
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
