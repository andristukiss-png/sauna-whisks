import type { SiteSearchItem } from "@/lib/siteSearch";

export const siteSearchFilters = ["All", "Product", "Guide", "Market", "Trade", "Page"] as const;
export type SiteSearchFilter = (typeof siteSearchFilters)[number];

export const MAX_SEARCH_QUERY_LENGTH = 200;

export function normalizeSearchQuery(query: string) {
  return query
    .slice(0, MAX_SEARCH_QUERY_LENGTH)
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function isSiteSearchFilter(value: string): value is SiteSearchFilter {
  return siteSearchFilters.includes(value as SiteSearchFilter);
}

export function filterSiteSearchItems(
  items: SiteSearchItem[],
  query: string,
  type: SiteSearchFilter = "All",
  limit = 40
) {
  const normalized = normalizeSearchQuery(query);
  const typed = type === "All" ? items : items.filter((item) => item.type === type);

  if (!normalized) return typed.slice(0, limit);

  const tokens = normalized.split(" ");
  return typed
    .filter((item) => {
      const haystack = [item.title, item.description, item.type, ...(item.keywords || [])]
        .join(" ")
        .normalize("NFKC")
        .toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    })
    .slice(0, limit);
}
