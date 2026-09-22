import { publicText } from "@/lib/publicApi";

export function GET() {
  return publicText(
    [
      "SaunaWhisks.com",
      "Built in Latvia.",
      "Focus: sauna whisks, pirts culture, materials, care and international trade.",
      "Contact: info@SaunaWhisks.com",
      "Principle: publish what can be verified.",
    ].join("\n"),
    { maxAge: 86400 }
  );
}
