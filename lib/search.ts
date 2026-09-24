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

function normalizedText(value: string) {
  return value.normalize("NFKC").toLowerCase();
}

function searchScore(item: SiteSearchItem, query: string) {
  const title = normalizedText(item.title);
  const description = normalizedText(item.description);
  const keywords = (item.keywords || []).map(normalizedText);

  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if (keywords.some((keyword) => keyword === query)) return 50;
  if (keywords.some((keyword) => keyword.startsWith(query))) return 40;
  if (description.includes(query)) return 30;
  if (keywords.some((keyword) => keyword.includes(query))) return 20;

  const tokens = query.split(" ");
  const titleTokenMatches = tokens.filter((token) => title.includes(token)).length;
  const keywordTokenMatches = tokens.filter((token) =>
    keywords.some((keyword) => keyword.includes(token))
  ).length;
  const descriptionTokenMatches = tokens.filter((token) => description.includes(token)).length;

  const tokenScore = 10 + titleTokenMatches * 8 + keywordTokenMatches * 5 + descriptionTokenMatches * 2;
  return Math.min(19, tokenScore);
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
    .map((item, index) => {
      const haystack = [item.title, item.description, item.type, ...(item.keywords || [])]
        .join(" ")
        .normalize("NFKC")
        .toLowerCase();
      return { item, index, haystack };
    })
    .filter(({ haystack }) => tokens.every((token) => haystack.includes(token)))
    .sort((left, right) => {
      const scoreDifference = searchScore(right.item, normalized) - searchScore(left.item, normalized);
      return scoreDifference || left.index - right.index;
    })
    .slice(0, limit)
    .map(({ item }) => item);
}
