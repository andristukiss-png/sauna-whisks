import site from "@/config/site.json";
import { operationGuides } from "@/lib/operations";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: operationGuides.length,
    operations: operationGuides.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      url: `${site.origin}/operations/${guide.slug}`,
    })),
  });
}
