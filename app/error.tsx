"use client";

import site from "@/config/site.json";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="route-error">
      <div className="route-error-message" role="alert" aria-live="assertive" aria-atomic="true">
        <p className="section-kicker">ERROR</p>
        <h1>This page hit a knot.</h1>
        <p>Try again or use the support options below if the problem continues.</p>
      </div>
      <div className="route-error-actions">
        <button type="button" className="button button-dark" onClick={() => reset()}>Try again</button>
        <Link className="text-link" href="/">Return home →</Link>
        <Link className="text-link" href="/status">Launch status →</Link>
        <Link className="text-link" href="/help">Help →</Link>
        <a className="text-link" href={`mailto:${site.publicEmail}`}>Email {site.publicEmail} →</a>
      </div>
    </div>
  );
}
