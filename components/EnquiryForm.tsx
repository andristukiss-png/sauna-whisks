"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function EnquiryForm({
  subject = "SaunaWhisks.com enquiry",
}: {
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Your enquiry will be sent to info@SaunaWhisks.com."
  );

  function openMailFallback(name: string, email: string, message: string) {
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Enquiry:",
      message,
    ].join("\n");

    window.location.href =
      "mailto:info@SaunaWhisks.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const element = event.currentTarget;
    const form = new FormData(element);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const website = String(form.get("website") || "").trim();

    setStatus("sending");
    setStatusMessage("Sending your enquiry…");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website, subject }),
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
        openMailFallback(name, email, message);
        return;
      }

      setStatus("error");
      setStatusMessage(data.error || "Please try again.");
    } catch {
      setStatus("error");
      setStatusMessage("Opening your email app as a fallback…");
      openMailFallback(name, email, message);
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
          placeholder="Tell us what you are looking for..."
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
      </div>
    </form>
  );
}
