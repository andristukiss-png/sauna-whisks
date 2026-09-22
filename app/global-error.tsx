"use client";

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
          <p>SAUNA WHISKS</p>
          <h1>Something went wrong.</h1>
          <p>Please try the page again. If the problem continues, email info@SaunaWhisks.com.</p>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
