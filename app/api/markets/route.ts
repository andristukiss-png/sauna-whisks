import site from "@/config/site.json";
import { getMarketPath, markets } from "@/lib/markets";
import { publicJson } from "@/lib/publicApi";
import { launchStatus } from "@/lib/status";

export function GET() {
  return publicJson({
    status: launchStatus.status,
    markets: markets.map((market) => ({
      slug: market.slug,
      name: market.name,
      status: market.status,
      summary: market.summary,
      url: `${site.origin}${getMarketPath(market)}`,
    })),
  });
}
