export function GET() {
  return new Response(
    [
      "Contact: mailto:info@SaunaWhisks.com",
      "Canonical: https://saunawhisks.com/.well-known/security.txt",
      "Preferred-Languages: en",
      "Expires: 2027-09-22T00:00:00.000Z",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
