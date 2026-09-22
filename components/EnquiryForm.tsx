"use client";

import { FormEvent, useState } from "react";

export function EnquiryForm({
  subject = "SaunaWhisks.com enquiry",
}: {
  subject?: string;
}) {
  const [sent, setSent] = useState(false);

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Enquiry:",
      message,
    ].join("\n");

    const href =
      "mailto:info@SaunaWhisks.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);

    setSent(true);
    window.location.href = href;
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

      <label>
        <span>Your enquiry</span>
        <textarea
          name="message"
          rows={7}
          placeholder="Tell us what you are looking for..."
          required
        />
      </label>

      <div className="enquiry-submit">
        <button className="button button-dark" type="submit">
          Send enquiry
        </button>
        <p>
          {sent
            ? "Your email app should open with the enquiry prepared."
            : "Your enquiry will be addressed to info@SaunaWhisks.com."}
        </p>
      </div>
    </form>
  );
}
