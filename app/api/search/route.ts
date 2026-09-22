import { siteSearchItems } from "@/lib/siteSearch";
import { noStoreJson } from "@/lib/publicApi";
import {
  filterSiteSearchItems,
  isSiteSearchFilter,
  MAX_SEARCH_QUERY_LENGTH,
  normalizeSearchQuery,
} from "@/lib/search";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get("q") || "";
  const query = normalizeSearchQuery(rawQuery);
  const requestedType = searchParams.get("type") || "";
  const type = isSiteSearchFilter(requestedType) ? requestedType : "All";
  const limit = query ? 40 : 18;
  const results = filterSiteSearchItems(siteSearchItems, query, type, limit);

  return noStoreJson({
    query,
    type,
    maxQueryLength: MAX_SEARCH_QUERY_LENGTH,
    count: results.length,
    results,
  });
}
