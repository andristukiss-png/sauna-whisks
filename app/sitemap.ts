import type { MetadataRoute } from "next";
import { saunaWhisks } from "@/lib/products";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://saunawhisks.com";
  const staticPages = [
    "",
    "/shop",
    "/shop/discovery-trio",
    "/traditions",
    "/journal",
    "/glossary",
    "/standards",
    "/faq",
    "/about",
    "/wholesale",
    "/contact",
    "/usa",
    "/compare",
    "/privacy",
    "/shipping",
    "/terms",
    "/returns",
    "/cookies",
    "/accessibility",
    "/suppliers",
    "/partners",
    "/learn",
    "/beginners",
    "/materials",
    "/care"
  ];

  return [
    ...staticPages.map((path, index) => ({
      url: base + path,
      lastModified: new Date(),
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : path === "/shop" ? 0.9 : 0.7,
    })),
    ...saunaWhisks.map((whisk) => ({
      url: `${base}/shop/${whisk.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${base}/journal/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  ];
}
