import { glossaryTerms } from "@/lib/glossaryTerms";

export function GET() {
  return Response.json({
    count: glossaryTerms.length,
    terms: glossaryTerms.map((item) => ({
      slug: item.slug,
      term: item.term,
      definition: item.definition,
      url: `https://saunawhisks.com/glossary/${item.slug}`,
    })),
  });
}
