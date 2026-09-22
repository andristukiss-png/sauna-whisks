import { tradeSegments } from "@/lib/tradeSegments";

export function GET() {
  return Response.json({
    status: "pre-launch",
    segments: tradeSegments.map((segment) => ({
      slug: segment.slug,
      name: segment.name,
      summary: segment.summary,
      url: `https://saunawhisks.com/trade/${segment.slug}`,
    })),
  });
}
