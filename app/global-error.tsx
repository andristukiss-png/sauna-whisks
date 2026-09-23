"use client";

import site from "@/config/site.json";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="fatal-error" role="alert" aria-live="assertive">
          <p>SAUNA WHISKS</p>
          <h1>Something went wrong.</h1>
          <p>Please try the page again. If the problem continues, email <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.</p>
          <button type="button" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
