import { tradeSegments } from "@/lib/tradeSegments";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    status: "pre-launch",
    segments: tradeSegments.map((segment) => ({
      slug: segment.slug,
      name: segment.name,
      summary: segment.summary,
      url: `https://saunawhisks.com/trade/${segment.slug}`,
    })),
  });
}
