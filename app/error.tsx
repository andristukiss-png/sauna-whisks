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
    <main className="route-error" role="alert" aria-live="assertive">
      <p className="section-kicker">ERROR</p>
      <h1>This page hit a knot.</h1>
      <p>Try again, return home, or email <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a> if the problem continues.</p>
      <div>
        <button type="button" className="button button-dark" onClick={() => reset()}>Try again</button>
        <Link className="text-link" href="/">Return home →</Link>
        <Link className="text-link" href="/status">Launch status →</Link>
        <Link className="text-link" href="/help">Help →</Link>
      </div>
    </main>
  );
}
