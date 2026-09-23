import site from "@/config/site.json";
import type { MetadataRoute } from "next";
import { saunaWhisks } from "@/lib/products";
import { articles } from "@/lib/articles";
import { getMarketPath, markets } from "@/lib/markets";
import { tradeSegments } from "@/lib/tradeSegments";
import { operationGuides } from "@/lib/operations";
import { glossaryTerms } from "@/lib/glossaryTerms";
import { materialKnowledge } from "@/lib/materialKnowledge";
import { traditionDetails } from "@/lib/traditionDetails";
import { buyerGuides } from "@/lib/buyerGuides";
import { comparisons } from "@/lib/comparisons";
import { faqTopics } from "@/lib/faqTopics";
import { articleTopics } from "@/lib/articleTopics";
import { productConditions } from "@/lib/productConditions";
import { useCases } from "@/lib/useCases";
import { techniques } from "@/lib/techniques";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.origin;
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
    "/operations",
    "/sources",
    "/guides",
    "/status",
    "/site-map",
    "/legal",
    "/conditions",
    "/catalog",
    "/claims",
    "/data",
    "/quality",
    "/resources",
    "/help",
    "/company",
    "/press",
    "/editorial-policy",
    "/corrections",
    "/use-cases",
    "/techniques",
    "/tools",
    "/tools/supplier-scorecard",
    "/tools/landed-cost",
    "/tools/trade-demand",
    "/tools/launch-readiness",
    "/templates",
    "/suppliers/requirements",
    "/suppliers/sample-evaluation",
    "/trade/trial",
    "/finder",
    "/checklist",
    "/journal/topics"
  ];

  return [
    ...staticPages.map((path, index) => ({
      url: base + path,
      changeFrequency: index === 0 ? "weekly" as const : "monthly" as const,
      priority: index === 0 ? 1 : path === "/shop" ? 0.9 : 0.7,
    })),
    ...saunaWhisks.map((whisk) => ({
      url: `${base}/shop/${whisk.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${base}/journal/${article.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...markets.filter((market) => market.slug !== "united-states").map((market) => ({
      url: `${base}${getMarketPath(market)}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...tradeSegments.map((segment) => ({
      url: `${base}/trade/${segment.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...operationGuides.map((guide) => ({
      url: `${base}/operations/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...glossaryTerms.map((item) => ({
      url: `${base}/glossary/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...materialKnowledge.map((item) => ({
      url: `${base}/materials/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...traditionDetails.map((item) => ({
      url: `${base}/traditions/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...buyerGuides.map((guide) => ({
      url: `${base}/guides/${guide.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...comparisons.map((item) => ({
      url: `${base}/compare/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...faqTopics.map((topic) => ({
      url: `${base}/faq/topic/${topic.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...articleTopics.map((topic) => ({
      url: `${base}/journal/topic/${topic.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...productConditions.map((item) => ({
      url: `${base}/conditions/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...useCases.map((item) => ({
      url: `${base}/use-cases/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...techniques.map((item) => ({
      url: `${base}/techniques/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  ];
}
