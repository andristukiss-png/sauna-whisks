import site from "@/config/site.json";
import { buyerGuides } from "@/lib/buyerGuides";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: buyerGuides.length,
    guides: buyerGuides.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      recommendation: guide.recommendation,
      url: `${site.origin}/guides/${guide.slug}`,
    })),
  });
}
