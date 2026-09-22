import { articles } from "@/lib/articles";

export function GET() {
  return Response.json({
    count: articles.length,
    articles: articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      readTime: article.readTime,
      url: `https://saunawhisks.com/journal/${article.slug}`,
    })),
  });
}
