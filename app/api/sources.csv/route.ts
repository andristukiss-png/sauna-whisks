import { articles } from "@/lib/articles";
import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

export function GET() {
  const sources = Array.from(
    new Map(
      articles.flatMap((article) => article.sources).map((source) => [source.url, source])
    ).values()
  );
  const rows = [
    ["label","url"],
    ...sources.map((source) => [source.label, source.url]),
  ];

  return publicCsv(encodeCsv(rows), "saunawhisks-sources.csv");
}
