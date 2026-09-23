import site from "@/config/site.json";
import { productConditions } from "@/lib/productConditions";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: productConditions.length,
    conditions: productConditions.map((item) => ({
      slug: item.slug,
      name: item.name,
      status: item.status,
      summary: item.summary,
      url: `${site.origin}/conditions/${item.slug}`,
    })),
  });
}
