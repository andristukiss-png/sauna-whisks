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
        <main className="fatal-error">
          <div className="fatal-error-message" role="alert" aria-live="assertive" aria-atomic="true">
            <p>SAUNA WHISKS</p>
            <h1>Something went wrong.</h1>
            <p>Please try the page again. If the problem continues, use the support email below.</p>
          </div>
          <div className="fatal-error-actions">
            <button type="button" onClick={() => reset()}>Try again</button>
            <a href={`mailto:${site.publicEmail}`}>Email {site.publicEmail}</a>
          </div>
        </main>
      </body>
    </html>
  );
}
