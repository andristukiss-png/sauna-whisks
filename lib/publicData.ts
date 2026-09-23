export type PublicDataEndpoint = {
  path: string;
  label: string;
  group: "Core" | "Catalog" | "Content" | "Knowledge" | "Commercial" | "Templates" | "Machine";
};

export const publicDataEndpoints: PublicDataEndpoint[] = [
  { path: "/api", label: "Public API endpoint index", group: "Core" },
  { path: "/api/status", label: "Launch status JSON", group: "Core" },
  { path: "/api/health", label: "Service health JSON", group: "Core" },
  { path: "/api/company", label: "Company facts JSON", group: "Core" },

  { path: "/api/catalog", label: "Product catalog JSON", group: "Catalog" },
  { path: "/api/catalog.csv", label: "Product catalog CSV", group: "Catalog" },

  { path: "/api/articles", label: "Journal index JSON", group: "Content" },
  { path: "/api/search?q=birch", label: "Search API example", group: "Content" },
  { path: "/api/faq", label: "FAQ topics JSON", group: "Content" },
  { path: "/api/traditions", label: "Traditions JSON", group: "Content" },
  { path: "/api/comparisons", label: "Comparisons JSON", group: "Content" },
  { path: "/api/editorial", label: "Editorial and source-policy JSON", group: "Content" },

  { path: "/api/materials", label: "Materials JSON", group: "Knowledge" },
  { path: "/api/conditions", label: "Product conditions JSON", group: "Knowledge" },
  { path: "/api/glossary", label: "Glossary JSON", group: "Knowledge" },
  { path: "/api/guides", label: "Buyer guides JSON", group: "Knowledge" },
  { path: "/api/operations", label: "Operations standards JSON", group: "Knowledge" },
  { path: "/api/use-cases", label: "Use cases JSON", group: "Knowledge" },
  { path: "/api/techniques", label: "Techniques JSON", group: "Knowledge" },
  { path: "/api/tools", label: "Tools index JSON", group: "Knowledge" },
  { path: "/api/sources", label: "Source library JSON", group: "Knowledge" },
  { path: "/api/sources.csv", label: "Source library CSV", group: "Knowledge" },

  { path: "/api/markets", label: "Market plans JSON", group: "Commercial" },
  { path: "/api/trade", label: "Trade segments JSON", group: "Commercial" },

  { path: "/api/product-data-template.csv", label: "Product data template CSV", group: "Templates" },
  { path: "/api/supplier-sample-template.csv", label: "Supplier sample evaluation CSV", group: "Templates" },
  { path: "/api/trade-trial-template.csv", label: "Trade trial template CSV", group: "Templates" },

  { path: "/feed.xml", label: "RSS feed", group: "Machine" },
  { path: "/feed.json", label: "JSON Feed", group: "Machine" },
  { path: "/llms.txt", label: "LLM-readable site summary", group: "Machine" },
  { path: "/humans.txt", label: "Human-readable site credits", group: "Machine" },
  { path: "/.well-known/security.txt", label: "Security contact file", group: "Machine" },
  { path: "/sitemap.xml", label: "XML sitemap", group: "Machine" },
  { path: "/robots.txt", label: "Crawler policy", group: "Machine" },
];


export const publicCrossOriginPaths = [
  ...new Set(
    publicDataEndpoints
      .map(({ path }) => path.split("?")[0])
      .filter((path) => !["/sitemap.xml", "/robots.txt"].includes(path))
  ),
];
