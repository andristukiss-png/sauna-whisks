import fs from "node:fs";

const rss = fs.readFileSync("app/feed.xml/route.ts", "utf8");
const jsonFeed = fs.readFileSync("app/feed.json/route.ts", "utf8");
const layout = fs.readFileSync("app/layout.tsx", "utf8");
const errors = [];

const rssRequirements = [
  ['xmlns:atom="http://www.w3.org/2005/Atom"', "RSS Atom namespace"],
  ['rel="self"', "RSS self link"],
  ['https://saunawhisks.com/feed.xml', "RSS canonical feed URL"],
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
  ['home_page_url: "https://saunawhisks.com/journal"', "JSON Feed home page"],
  ['feed_url: "https://saunawhisks.com/feed.json"', "JSON Feed canonical URL"],
  ['language: "en"', "JSON Feed language"],
  ["publicJson", "shared public JSON response helper"],
];

for (const [needle, label] of jsonRequirements) {
  if (!jsonFeed.includes(needle)) errors.push("Missing " + label + ".");
}

if (!layout.includes('"application/rss+xml": "https://saunawhisks.com/feed.xml"')) {
  errors.push("Root metadata does not advertise the RSS feed.");
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
