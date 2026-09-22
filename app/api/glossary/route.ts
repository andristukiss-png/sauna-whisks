import { glossaryTerms } from "@/lib/glossaryTerms";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: glossaryTerms.length,
    terms: glossaryTerms.map((item) => ({
      slug: item.slug,
      term: item.term,
      definition: item.definition,
      url: `https://saunawhisks.com/glossary/${item.slug}`,
    })),
  });
}
