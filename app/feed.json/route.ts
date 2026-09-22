import { articles } from "@/lib/articles";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    version: "https://jsonfeed.org/version/1.1",
    title: "Sauna Whisks Journal",
    home_page_url: "https://saunawhisks.com/journal",
    feed_url: "https://saunawhisks.com/feed.json",
    description: "Guides to sauna whisks, pirts, materials, care and preparation.",
    language: "en",
    items: articles.map((article) => ({
      id: `https://saunawhisks.com/journal/${article.slug}`,
      url: `https://saunawhisks.com/journal/${article.slug}`,
      title: article.title,
      summary: article.description,
    })),
  });
}
