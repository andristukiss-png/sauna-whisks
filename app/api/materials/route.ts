import site from "@/config/site.json";
import { materialKnowledge } from "@/lib/materialKnowledge";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: materialKnowledge.length,
    materials: materialKnowledge.map((item) => ({
      slug: item.slug,
      name: item.name,
      botanicalGroup: item.latin,
      status: item.status,
      feel: item.feel,
      aroma: item.aroma,
      url: `${site.origin}/materials/${item.slug}`,
    })),
  });
}
