import { articles } from "@/lib/articles";

function csv(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

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
  return new Response(rows.map((row) => row.map((value) => csv(value)).join(",")).join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="saunawhisks-sources.csv"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
