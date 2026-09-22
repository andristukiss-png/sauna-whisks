import type { MetadataRoute } from "next";
import { saunaWhisks } from "@/lib/products";
import { articles } from "@/lib/articles";
import { markets } from "@/lib/markets";
import { tradeSegments } from "@/lib/tradeSegments";
import { operationGuides } from "@/lib/operations";
import { glossaryTerms } from "@/lib/glossaryTerms";
import { materialKnowledge } from "@/lib/materialKnowledge";
import { traditionDetails } from "@/lib/traditionDetails";

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
    "/care",
    "/markets",
    "/trade",
    "/search",
    "/operations",
    "/sources"
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
    })),
    ...markets.map((market) => ({
      url: `${base}/markets/${market.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...tradeSegments.map((segment) => ({
      url: `${base}/trade/${segment.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...operationGuides.map((guide) => ({
      url: `${base}/operations/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...glossaryTerms.map((item) => ({
      url: `${base}/glossary/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...materialKnowledge.map((item) => ({
      url: `${base}/materials/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...traditionDetails.map((item) => ({
      url: `${base}/traditions/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  ];
}
