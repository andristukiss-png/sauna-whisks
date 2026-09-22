import { articles } from "@/lib/articles";

export function GET() {
  const sources = Array.from(
    new Map(
      articles.flatMap((article) => article.sources).map((source) => [source.url, source])
    ).values()
  );
  return Response.json({ count: sources.length, sources });
}
