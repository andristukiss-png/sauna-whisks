import { buyerGuides } from "@/lib/buyerGuides";

export function GET() {
  return Response.json({
    count: buyerGuides.length,
    guides: buyerGuides.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      recommendation: guide.recommendation,
      url: `https://saunawhisks.com/guides/${guide.slug}`,
    })),
  });
}
