import { articles } from "@/lib/articles";
import { publicText } from "@/lib/publicApi";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = articles
    .map(
      (article) => `
      <item>
        <title>${escapeXml(article.title)}</title>
        <link>https://saunawhisks.com/journal/${article.slug}</link>
        <guid>https://saunawhisks.com/journal/${article.slug}</guid>
        <description>${escapeXml(article.description)}</description>
      </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Sauna Whisks Journal</title>
    <link>https://saunawhisks.com/journal</link>
    <description>Guides to sauna whisks, pirts, venik, vihta, materials, care and preparation.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return publicText(xml, {
    contentType: "application/rss+xml; charset=utf-8",
    maxAge: 3600,
  });
}
