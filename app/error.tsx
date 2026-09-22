"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="route-error">
      <p className="section-kicker">ERROR</p>
      <h1>This page hit a knot.</h1>
      <p>Try again, return home, or email info@SaunaWhisks.com if the problem continues.</p>
      <div>
        <button type="button" className="button button-dark" onClick={() => reset()}>Try again</button>
        <Link className="text-link" href="/">Return home →</Link>
        <Link className="text-link" href="/status">Launch status →</Link>
        <Link className="text-link" href="/help">Help →</Link>
      </div>
    </main>
  );
}
