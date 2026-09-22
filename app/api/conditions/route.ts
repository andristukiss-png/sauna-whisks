import { productConditions } from "@/lib/productConditions";

export function GET() {
  return Response.json({
    count: productConditions.length,
    conditions: productConditions.map((item) => ({
      slug: item.slug,
      name: item.name,
      status: item.status,
      summary: item.summary,
      url: `https://saunawhisks.com/conditions/${item.slug}`,
    })),
  });
}
