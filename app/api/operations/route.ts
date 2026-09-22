import { operationGuides } from "@/lib/operations";

export function GET() {
  return Response.json({
    count: operationGuides.length,
    operations: operationGuides.map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      description: guide.description,
      url: `https://saunawhisks.com/operations/${guide.slug}`,
    })),
  });
}
