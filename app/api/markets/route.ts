import { markets } from "@/lib/markets";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    status: "pre-launch",
    markets: markets.map((market) => ({
      slug: market.slug,
      name: market.name,
      status: market.status,
      summary: market.summary,
      url: `https://saunawhisks.com/markets/${market.slug}`,
    })),
  });
}
