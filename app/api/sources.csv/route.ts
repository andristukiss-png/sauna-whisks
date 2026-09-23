import { articleSources } from "@/lib/sources";
import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

export function GET() {
  const rows = [
    ["label","url"],
    ...articleSources.map((source) => [source.label, source.url]),
  ];

  return publicCsv(encodeCsv(rows), "saunawhisks-sources.csv");
}
