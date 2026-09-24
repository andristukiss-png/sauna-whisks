import { articles } from "@/lib/articles";
import { saunaWhisks } from "@/lib/products";
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

export type SiteSearchItem = {
  title: string;
  description: string;
  href: string;
  type: "Product" | "Guide" | "Market" | "Trade" | "Page";
  keywords?: string[];
};

const saunaWhiskAliases = ["sauna broom", "venik", "vihta", "vasta"];

const pages: SiteSearchItem[] = [
  { title: "Learn", description: "Learning hub for sauna whisk materials, care and traditions.", href: "/learn", type: "Page", keywords: ["education", "beginner", ...saunaWhiskAliases] },
  { title: "Beginners", description: "A first-whisk path from choosing material to using it.", href: "/beginners", type: "Page", keywords: ["first whisk", "beginner"] },
  { title: "Materials", description: "Birch, oak and eucalyptus material hub.", href: "/materials", type: "Page", keywords: ["birch", "oak", "eucalyptus"] },
  { title: "Care", description: "Preparation, storage, reuse and troubleshooting.", href: "/care", type: "Page", keywords: ["storage", "prepare", "reuse"] },
  { title: "Traditions", description: "Latvian pirts, Finnish vihta/vasta and banya venik context.", href: "/traditions", type: "Page", keywords: ["pirts", "vihta", "vasta", "venik"] },
  { title: "Glossary", description: "Definitions for sauna whisk terminology.", href: "/glossary", type: "Page", keywords: ["terms", "definitions", ...saunaWhiskAliases] },
  { title: "Sourcing standards", description: "How SaunaWhisks.com plans to document product origin and quality.", href: "/standards", type: "Page", keywords: ["origin", "quality", "supplier"] },
  { title: "Shipping & availability", description: "Current pre-launch shipping and market status.", href: "/shipping", type: "Page", keywords: ["shipping", "country", "availability"] },
  { title: "FAQ", description: "Common questions about sauna whisks and launch plans.", href: "/faq", type: "Page", keywords: ["questions", "help"] },
  { title: "Suppliers", description: "Producer and supplier intake for sauna whisk production partners.", href: "/suppliers", type: "Page", keywords: ["producer", "supplier", "latvia", "baltic"] },
  { title: "Partnerships & Press", description: "Industry, press, practitioner and content collaboration.", href: "/partners", type: "Page", keywords: ["press", "partner", "collaboration"] },
  { title: "Company", description: "Company, launch, partnership, supplier, editorial and policy information.", href: "/company", type: "Page", keywords: ["company", "latvia", "brand", "status"] },
  { title: "Press facts", description: "Verified pre-launch facts for media and editorial reference.", href: "/press", type: "Page", keywords: ["press", "media", "facts", "brand"] },
  { title: "Sources", description: "External sources referenced across the sauna knowledge library.", href: "/sources", type: "Page", keywords: ["references", "evidence"] },
  { title: "Editorial policy", description: "How SaunaWhisks.com selects sources and separates factual, cultural and commercial claims.", href: "/editorial-policy", type: "Page", keywords: ["editorial", "sources", "evidence", "policy"] },
  { title: "Corrections", description: "How factual and product-data corrections are reported and reviewed.", href: "/corrections", type: "Page", keywords: ["correction", "error", "accuracy", "contact"] },
  { title: "Markets", description: "Current launch-market plans and availability status.", href: "/markets", type: "Page", keywords: ["usa", "canada", "uk", "germany", "australia", "finland", "eu"] },
  { title: "Trade", description: "Trade supply by business type.", href: "/trade", type: "Page", keywords: ["wholesale", "b2b", "venue", "retail"] },
  { title: "Launch status", description: "Current commercial launch gates and what is open or still being validated.", href: "/status", type: "Page", keywords: ["status", "pre-launch", "checkout"] },
  { title: "Site map", description: "Human-readable map of SaunaWhisks.com.", href: "/site-map", type: "Page", keywords: ["index", "navigation"] },
  { title: "Legal & policies", description: "Privacy, terms, returns, cookies, accessibility and shipping policies.", href: "/legal", type: "Page", keywords: ["privacy", "terms", "returns", "cookies"] },
  { title: "Public data", description: "Read-only JSON, CSV and feed endpoints for SaunaWhisks.com.", href: "/data", type: "Page", keywords: ["api", "json", "csv", "feed", "data"] },
  { title: "Quality", description: "Product standards, testing, provenance, claims and sample evaluation.", href: "/quality", type: "Page", keywords: ["quality", "testing", "provenance", "standards"] },
  { title: "Resources", description: "Learning, source, public-data and operational resources.", href: "/resources", type: "Page", keywords: ["resources", "sources", "help", "data"] },
  { title: "Help", description: "Product, shipping, learning, trade and contact help.", href: "/help", type: "Page", keywords: ["help", "support", "contact", "shipping", "faq"] },
  { title: "Templates & downloads", description: "Supplier, product-data and trade-trial CSV templates.", href: "/templates", type: "Page", keywords: ["template", "csv", "supplier", "trade"] },
  { title: "Supplier requirements", description: "Working data and documentation requirements for sauna-whisk producers.", href: "/suppliers/requirements", type: "Page", keywords: ["supplier", "requirements", "producer", "origin"] },
  { title: "Supplier sample evaluation", description: "Repeatable sample testing workflow for supplier comparison.", href: "/suppliers/sample-evaluation", type: "Page", keywords: ["sample", "testing", "supplier", "quality"] },
  { title: "Trade trial plan", description: "Structured venue or retailer product trial before recurring supply.", href: "/trade/trial", type: "Trade", keywords: ["trade", "trial", "venue", "retailer", "reorder"] },
  { title: "Product claims standard", description: "How SaunaWhisks.com separates product facts from unsupported health marketing.", href: "/claims", type: "Page", keywords: ["claims", "evidence", "health", "quality"] },
  { title: "Product data catalog", description: "Pre-launch product status, planned condition and verification fields.", href: "/catalog", type: "Page", keywords: ["product data", "verification", "status", "catalog"] },
  { title: "Operating tools", description: "Supplier, commercial, trade-demand and launch-readiness tools.", href: "/tools", type: "Page", keywords: ["tools", "supplier", "margin", "demand", "launch"] },
  { title: "Supplier scorecard", description: "Score producer candidates using evidence-based criteria.", href: "/tools/supplier-scorecard", type: "Page", keywords: ["supplier", "scorecard", "producer", "evidence"] },
  { title: "Landed-cost calculator", description: "Estimate variable unit cost and contribution before CAC.", href: "/tools/landed-cost", type: "Page", keywords: ["landed cost", "margin", "pricing", "commercial"] },
  { title: "Trade demand estimator", description: "Estimate monthly whisk usage for a venue.", href: "/tools/trade-demand", type: "Trade", keywords: ["demand", "monthly", "venue", "wholesale"] },
  { title: "Launch readiness", description: "Track product, compliance, commercial, technical and QA launch gates.", href: "/tools/launch-readiness", type: "Page", keywords: ["launch", "checklist", "readiness", "checkout"] },
  { title: "Whisk finder", description: "Three-question tool for choosing birch, oak, eucalyptus or the Discovery Trio.", href: "/finder", type: "Page", keywords: ["recommendation", "quiz", "choose"] },
  { title: "Quality checklist", description: "Interactive checklist for evaluating whisk origin, construction and prepared performance.", href: "/checklist", type: "Page", keywords: ["quality", "supplier", "leaf retention", "testing"] },
];

export const siteSearchItems: SiteSearchItem[] = [
  ...saunaWhisks.map((whisk) => ({
    title: whisk.name,
    description: whisk.description,
    href: `/shop/${whisk.slug}`,
    type: "Product" as const,
    keywords: [whisk.material, whisk.latin, whisk.character, ...saunaWhiskAliases]
  })),
  {
    title: "Discovery Trio",
    description: "Planned birch, oak and eucalyptus three-whisk comparison bundle.",
    href: "/shop/discovery-trio",
    type: "Product" as const,
    keywords: ["bundle", "birch", "oak", "eucalyptus", ...saunaWhiskAliases]
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
    href: getMarketPath(market),
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
  ...glossaryTerms.map((item) => ({
    title: item.term,
    description: item.definition,
    href: `/glossary/${item.slug}`,
    type: "Page" as const,
    keywords: [item.context]
  })),
  ...materialKnowledge.map((item) => ({
    title: `${item.name} sauna whisks`,
    description: item.summary,
    href: `/materials/${item.slug}`,
    type: "Page" as const,
    keywords: [item.latin, item.feel, item.aroma, ...item.notes]
  })),
  ...traditionDetails.map((item) => ({
    title: item.name,
    description: item.summary,
    href: `/traditions/${item.slug}`,
    type: "Page" as const,
    keywords: [item.region, ...item.terminology, ...item.principles]
  })),
  ...buyerGuides.map((guide) => ({
    title: guide.title,
    description: guide.description,
    href: `/guides/${guide.slug}`,
    type: "Guide" as const,
    keywords: [guide.recommendation, ...guide.reasons]
  })),
  ...comparisons.map((item) => ({
    title: item.title,
    description: item.description,
    href: `/compare/${item.slug}`,
    type: "Guide" as const,
    keywords: [item.left.name, item.right.name, item.conclusion]
  })),
  ...faqTopics.map((topic) => ({
    title: `${topic.title} FAQ`,
    description: topic.description,
    href: `/faq/topic/${topic.slug}`,
    type: "Page" as const,
    keywords: topic.items.flat()
  })),
  ...articleTopics.map((topic) => ({
    title: `${topic.title} — Journal topic`,
    description: topic.description,
    href: `/journal/topic/${topic.slug}`,
    type: "Guide" as const,
    keywords: topic.slugs
  })),
  ...productConditions.map((item) => ({
    title: item.name,
    description: item.summary,
    href: `/conditions/${item.slug}`,
    type: "Page" as const,
    keywords: [item.status, ...item.advantages, ...item.constraints]
  })),
  ...useCases.map((item) => ({
    title: item.name + " — use case",
    description: item.summary,
    href: `/use-cases/${item.slug}`,
    type: "Guide" as const,
    keywords: [...item.priorities, item.recommendation]
  })),
  ...techniques.map((item) => ({
    title: item.name,
    description: item.summary,
    href: `/techniques/${item.slug}`,
    type: "Guide" as const,
    keywords: [...item.steps, item.caution]
  })),
  ...pages,
];
