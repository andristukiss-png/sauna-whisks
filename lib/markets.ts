export type Market = {
  slug: string;
  name: string;
  status: "Planned" | "Researching" | "Later phase";
  headline: string;
  summary: string;
  priorities: string[];
  logistics: string;
  enquiryTopic: string;
};

export const markets: Market[] = [
  {
    slug: "united-states",
    name: "United States",
    status: "Researching",
    headline: "Baltic sauna whisks for the US market.",
    summary: "A priority launch market built around dried whisks, clear preparation guidance, bundles and trade supply.",
    priorities: ["Dried birch, oak and eucalyptus", "Discovery Trio", "Public sauna and retailer trade", "Product-by-product import clearance"],
    logistics: "Each plant-product SKU will be checked for admissibility and documentation before US sales open.",
    enquiryTopic: "United States market enquiry"
  },
  {
    slug: "canada",
    name: "Canada",
    status: "Researching",
    headline: "A sauna-literate market with room for better provenance.",
    summary: "Canada is a natural future market for traditional sauna whisks, education and recurring trade supply.",
    priorities: ["Core dried assortment", "Cold-climate sauna audience", "Trade packs", "Clear origin and preparation"],
    logistics: "Import and shipping requirements will be confirmed by product and origin before orders open.",
    enquiryTopic: "Canada market enquiry"
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    status: "Planned",
    headline: "Traditional sauna materials for a growing UK sauna audience.",
    summary: "The UK plan emphasizes Finnish/Baltic sauna language, compact bundles and specialist retail partnerships.",
    priorities: ["Birch-led assortment", "Discovery bundles", "Specialist sauna retail", "Education-first merchandising"],
    logistics: "Customs, plant-product requirements and fulfilment economics will be finalized before commercial launch.",
    enquiryTopic: "United Kingdom market enquiry"
  },
  {
    slug: "germany",
    name: "Germany",
    status: "Later phase",
    headline: "A mature sauna market that expects product depth.",
    summary: "Germany is attractive for a broader specialist assortment once the core English-language launch is proven.",
    priorities: ["Broader botanical range", "Detailed material specifications", "Trade and specialist retail", "Localized content later"],
    logistics: "The market will be approached after product, fulfilment and localization systems are proven.",
    enquiryTopic: "Germany market enquiry"
  },
  {
    slug: "australia",
    name: "Australia",
    status: "Later phase",
    headline: "A future market where local sourcing may matter more than imports.",
    summary: "Australia is strategically interesting for eucalyptus, but plant biosecurity makes imported foliage a separate operational project.",
    priorities: ["Local eucalyptus possibilities", "Regional production partnerships", "Trade supply", "Biosecurity-first planning"],
    logistics: "No import promise will be made until species, condition, origin and Australian biosecurity requirements are resolved.",
    enquiryTopic: "Australia market enquiry"
  },
  {
    slug: "finland",
    name: "Finland",
    status: "Later phase",
    headline: "Authority and sourcing before aggressive selling.",
    summary: "Finland matters most as a source of tradition, quality benchmarks, producers and knowledge rather than as the first growth market.",
    priorities: ["Producer relationships", "Tradition and content", "Quality benchmarking", "Selective premium products"],
    logistics: "Commercial positioning will respect the strength of local producers and existing sauna culture.",
    enquiryTopic: "Finland market enquiry"
  },
  {
    slug: "european-union",
    name: "European Union",
    status: "Planned",
    headline: "The home-region fulfilment base.",
    summary: "EU operations are intended to provide the first stable inventory and fulfilment base for the Latvia-based brand.",
    priorities: ["Latvia/Baltic sourcing", "EU inventory", "Trade supply", "Foundation for later exports"],
    logistics: "Final VAT, shipping, returns and fulfilment rules will be published before payment is enabled.",
    enquiryTopic: "European Union market enquiry"
  }
];

export function getMarket(slug: string) {
  return markets.find((market) => market.slug === slug);
}

export function getMarketPath(market: Pick<Market, "slug">) {
  return market.slug === "united-states" ? "/usa" : `/markets/${market.slug}`;
}
