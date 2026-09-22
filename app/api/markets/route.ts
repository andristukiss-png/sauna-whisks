import { markets } from "@/lib/markets";

export function GET() {
  return Response.json({
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
