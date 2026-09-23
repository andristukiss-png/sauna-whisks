import site from "@/config/site.json";
import { publicText } from "@/lib/publicApi";

export function GET() {
  return publicText(
    [
      "SaunaWhisks.com",
      "Built in Latvia.",
      "Focus: sauna whisks, pirts culture, materials, care and international trade.",
      `Contact: ${site.publicEmail}`,
      "Principle: publish what can be verified.",
    ].join("\n"),
    { maxAge: 86400 }
  );
}
