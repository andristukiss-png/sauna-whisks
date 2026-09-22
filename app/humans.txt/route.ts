export function GET() {
  return new Response(
    [
      "SaunaWhisks.com",
      "Built in Latvia.",
      "Focus: sauna whisks, pirts culture, materials, care and international trade.",
      "Contact: info@SaunaWhisks.com",
      "Principle: publish what can be verified.",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
}
