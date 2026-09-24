import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const rss = fs.readFileSync("app/feed.xml/route.ts", "utf8");
const jsonFeed = fs.readFileSync("app/feed.json/route.ts", "utf8");
const layout = fs.readFileSync("app/layout.tsx", "utf8");
const errors = [];

const rssRequirements = [
  ['xmlns:atom="http://www.w3.org/2005/Atom"', "RSS Atom namespace"],
  ['rel="self"', "RSS self link"],
  ['${site.origin}/feed.xml', "RSS configured feed URL"],
  ['<language>en</language>', "RSS language"],
  ['<generator>SaunaWhisks.com</generator>', "RSS generator"],
  ['guid isPermaLink="true"', "RSS permalink GUIDs"],
  ["escapeXml(article.title)", "RSS escaped titles"],
  ["escapeXml(article.description)", "RSS escaped descriptions"],
  ["publicText", "shared public text response helper"],
];

for (const [needle, label] of rssRequirements) {
  if (!rss.includes(needle)) errors.push("Missing " + label + ".");
}

const jsonRequirements = [
  ['version: "https://jsonfeed.org/version/1.1"', "JSON Feed version"],
  ['home_page_url: `${site.origin}/journal`', "JSON Feed configured home page"],
  ['feed_url: `${site.origin}/feed.json`', "JSON Feed configured canonical URL"],
  ['language: "en"', "JSON Feed language"],
  ["content_text: article.description", "JSON Feed required item content"],
  ["publicText", "shared public text response helper"],
  ["JSON.stringify(feed)", "JSON Feed serialization"],
  ['contentType: "application/feed+json; charset=utf-8"', "JSON Feed media type"],
];

for (const [needle, label] of jsonRequirements) {
  if (!jsonFeed.includes(needle)) errors.push("Missing " + label + ".");
}

if (!layout.includes('"application/rss+xml": `${site.origin}/feed.xml`')) {
  errors.push("Root metadata does not advertise the configured RSS feed.");
}
if (!layout.includes('"application/feed+json": `${site.origin}/feed.json`')) {
  errors.push("Root metadata does not advertise the configured JSON Feed.");
}

for (const [file, text] of [["RSS", rss], ["JSON Feed", jsonFeed], ["layout", layout]]) {
  if (text.includes(site.origin)) {
    errors.push(file + " still hard-codes the canonical origin instead of site config.");
  }
}

if (/new Date\(|Date\.now\(/.test(rss + "\n" + jsonFeed)) {
  errors.push("Feeds must not invent publication timestamps when article dates are unavailable.");
}

if (errors.length) {
  console.error("Feed validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Feed validation passed.");
