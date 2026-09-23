import site from "@/config/site.json";
import { publicText } from "@/lib/publicApi";

export function GET() {
  const body = [
    "# SaunaWhisks.com",
    "",
    "> Latvia-based specialist sauna-whisk brand and educational resource.",
    "",
    "## Core sections",
    "- ${site.origin}/shop — pre-launch sauna whisk collection",
    "- ${site.origin}/learn — learning hub",
    "- ${site.origin}/journal — source-backed guides",
    "- ${site.origin}/traditions — Latvian pirts, Finnish vihta/vasta and banya context",
    "- ${site.origin}/standards — sourcing and product standards",
    "- ${site.origin}/operations — provenance, testing and compliance process",
    "- ${site.origin}/markets — planned market status",
    "- ${site.origin}/trade — B2B programs",
    "- ${site.origin}/sources — external sources referenced by the knowledge library",
    "",
    "## Important status",
    "- The site is pre-launch and does not currently accept payment.",
    "- Product prices are planned, not final.",
    "- Final product origin, species, harvest and supplier details are published only when verified.",
    "- Public contact: ${site.publicEmail}",
  ].join("\n");

  return publicText(body, { maxAge: 3600 });
}
