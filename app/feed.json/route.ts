import site from "@/config/site.json";
import { articles } from "@/lib/articles";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    version: "https://jsonfeed.org/version/1.1",
    title: "Sauna Whisks Journal",
    home_page_url: `${site.origin}/journal`,
    feed_url: `${site.origin}/feed.json`,
    description: "Guides to sauna whisks, pirts, materials, care and preparation.",
    language: "en",
    items: articles.map((article) => ({
      id: `${site.origin}/journal/${article.slug}`,
      url: `${site.origin}/journal/${article.slug}`,
      title: article.title,
      summary: article.description,
    })),
  });
}
