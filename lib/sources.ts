import { articles } from "@/lib/articles";

export const articleSources = Array.from(
  new Map(
    articles
      .flatMap((article) => article.sources)
      .map((source) => [source.url, source])
  ).values()
);
