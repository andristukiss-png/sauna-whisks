import site from "@/config/site.json";
import { articles } from "@/lib/articles";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    count: articles.length,
    articles: articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      readTime: article.readTime,
      url: `${site.origin}/journal/${article.slug}`,
    })),
  });
}
