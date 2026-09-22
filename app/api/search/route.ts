import { siteSearchItems } from "@/lib/siteSearch";
import { noStoreJson } from "@/lib/publicApi";

const allowedTypes = new Set(["Product", "Guide", "Market", "Trade", "Page"]);
const MAX_QUERY_LENGTH = 200;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().slice(0, MAX_QUERY_LENGTH).toLowerCase();
  const requestedType = searchParams.get("type") || "";
  const type = allowedTypes.has(requestedType) ? requestedType : "All";
  const typed = type === "All"
    ? siteSearchItems
    : siteSearchItems.filter((item) => item.type === type);

  if (!query) {
    return noStoreJson({ query: "", type, count: Math.min(18, typed.length), results: typed.slice(0, 18) });
  }

  const results = typed
    .filter((item) =>
      [item.title, item.description, item.type, ...(item.keywords || [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
    .slice(0, 40);

  return noStoreJson({ query, type, count: results.length, results });
}
