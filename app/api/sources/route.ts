import { articles } from "@/lib/articles";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  const sources = Array.from(
    new Map(
      articles.flatMap((article) => article.sources).map((source) => [source.url, source])
    ).values()
  );
  return publicJson({ count: sources.length, sources });
}
