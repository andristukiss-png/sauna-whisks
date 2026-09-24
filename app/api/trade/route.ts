import site from "@/config/site.json";
import { tradeSegments } from "@/lib/tradeSegments";
import { publicJson } from "@/lib/publicApi";
import { launchStatus } from "@/lib/status";

export function GET() {
  return publicJson({
    status: launchStatus.status,
    segments: tradeSegments.map((segment) => ({
      slug: segment.slug,
      name: segment.name,
      summary: segment.summary,
      url: `${site.origin}/trade/${segment.slug}`,
    })),
  });
}
