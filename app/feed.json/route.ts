import { articles } from "@/lib/articles";

export function GET() {
  return Response.json({
    version: "https://jsonfeed.org/version/1.1",
    title: "Sauna Whisks Journal",
    home_page_url: "https://saunawhisks.com/journal",
    feed_url: "https://saunawhisks.com/feed.json",
    description: "Guides to sauna whisks, pirts, materials, care and preparation.",
    items: articles.map((article) => ({
      id: `https://saunawhisks.com/journal/${article.slug}`,
      url: `https://saunawhisks.com/journal/${article.slug}`,
      title: article.title,
      summary: article.description,
    })),
  });
}
