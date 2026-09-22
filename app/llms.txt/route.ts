export function GET() {
  const body = [
    "# SaunaWhisks.com",
    "",
    "> Latvia-based specialist sauna-whisk brand and educational resource.",
    "",
    "## Core sections",
    "- https://saunawhisks.com/shop — pre-launch sauna whisk collection",
    "- https://saunawhisks.com/learn — learning hub",
    "- https://saunawhisks.com/journal — source-backed guides",
    "- https://saunawhisks.com/traditions — Latvian pirts, Finnish vihta/vasta and banya context",
    "- https://saunawhisks.com/standards — sourcing and product standards",
    "- https://saunawhisks.com/operations — provenance, testing and compliance process",
    "- https://saunawhisks.com/markets — planned market status",
    "- https://saunawhisks.com/trade — B2B programs",
    "- https://saunawhisks.com/sources — external sources referenced by the knowledge library",
    "",
    "## Important status",
    "- The site is pre-launch and does not currently accept payment.",
    "- Product prices are planned, not final.",
    "- Final product origin, species, harvest and supplier details are published only when verified.",
    "- Public contact: info@SaunaWhisks.com",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
