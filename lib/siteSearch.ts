import { articles } from "@/lib/articles";
import { saunaWhisks } from "@/lib/products";
import { markets } from "@/lib/markets";
import { tradeSegments } from "@/lib/tradeSegments";
import { operationGuides } from "@/lib/operations";

export type SiteSearchItem = {
  title: string;
  description: string;
  href: string;
  type: "Product" | "Guide" | "Market" | "Trade" | "Page";
  keywords?: string[];
};

const pages: SiteSearchItem[] = [
  { title: "Learn", description: "Learning hub for sauna whisk materials, care and traditions.", href: "/learn", type: "Page", keywords: ["education", "beginner"] },
  { title: "Beginners", description: "A first-whisk path from choosing material to using it.", href: "/beginners", type: "Page", keywords: ["first whisk", "beginner"] },
  { title: "Materials", description: "Birch, oak and eucalyptus material hub.", href: "/materials", type: "Page", keywords: ["birch", "oak", "eucalyptus"] },
  { title: "Care", description: "Preparation, storage, reuse and troubleshooting.", href: "/care", type: "Page", keywords: ["storage", "prepare", "reuse"] },
  { title: "Traditions", description: "Latvian pirts, Finnish vihta/vasta and banya venik context.", href: "/traditions", type: "Page", keywords: ["pirts", "vihta", "vasta", "venik"] },
  { title: "Glossary", description: "Definitions for sauna whisk terminology.", href: "/glossary", type: "Page", keywords: ["terms", "definitions"] },
  { title: "Sourcing standards", description: "How SaunaWhisks.com plans to document product origin and quality.", href: "/standards", type: "Page", keywords: ["origin", "quality", "supplier"] },
  { title: "Shipping & availability", description: "Current pre-launch shipping and market status.", href: "/shipping", type: "Page", keywords: ["shipping", "country", "availability"] },
  { title: "FAQ", description: "Common questions about sauna whisks and launch plans.", href: "/faq", type: "Page", keywords: ["questions", "help"] },
  { title: "Suppliers", description: "Producer and supplier intake for sauna whisk production partners.", href: "/suppliers", type: "Page", keywords: ["producer", "supplier", "latvia", "baltic"] },
  { title: "Partnerships & Press", description: "Industry, press, practitioner and content collaboration.", href: "/partners", type: "Page", keywords: ["press", "partner", "collaboration"] },
  { title: "Sources", description: "External sources referenced across the sauna knowledge library.", href: "/sources", type: "Page", keywords: ["references", "evidence"] },
  { title: "Markets", description: "Current launch-market plans and availability status.", href: "/markets", type: "Page", keywords: ["usa", "canada", "uk", "germany", "australia", "finland", "eu"] },
  { title: "Trade", description: "Trade supply by business type.", href: "/trade", type: "Page", keywords: ["wholesale", "b2b", "venue", "retail"] },
];

export const siteSearchItems: SiteSearchItem[] = [
  ...saunaWhisks.map((whisk) => ({
    title: whisk.name,
    description: whisk.description,
    href: `/shop/${whisk.slug}`,
    type: "Product" as const,
    keywords: [whisk.material, whisk.latin, whisk.character]
  })),
  {
    title: "Discovery Trio",
    description: "Planned birch, oak and eucalyptus three-whisk comparison bundle.",
    href: "/shop/discovery-trio",
    type: "Product" as const,
    keywords: ["bundle", "birch", "oak", "eucalyptus"]
  },
  ...articles.map((article) => ({
    title: article.title,
    description: article.description,
    href: `/journal/${article.slug}`,
    type: "Guide" as const,
    keywords: [article.eyebrow]
  })),
  ...markets.map((market) => ({
    title: market.name,
    description: market.summary,
    href: `/markets/${market.slug}`,
    type: "Market" as const,
    keywords: [market.status, ...market.priorities]
  })),
  ...tradeSegments.map((segment) => ({
    title: segment.name,
    description: segment.summary,
    href: `/trade/${segment.slug}`,
    type: "Trade" as const,
    keywords: [...segment.needs, ...segment.offer]
  })),
  ...operationGuides.map((guide) => ({
    title: guide.title,
    description: guide.description,
    href: `/operations/${guide.slug}`,
    type: "Page" as const,
    keywords: [guide.eyebrow, ...guide.sections.map((section) => section.title)]
  })),
  ...pages,
];
