import { siteSearchItems } from "@/lib/siteSearch";

const allowedTypes = new Set(["Product", "Guide", "Market", "Trade", "Page"]);

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const type = searchParams.get("type") || "";
  const typed = allowedTypes.has(type)
    ? siteSearchItems.filter((item) => item.type === type)
    : siteSearchItems;

  if (!query) {
    return Response.json({ query: "", type: type || "All", results: typed.slice(0, 18) });
  }

  const results = typed
    .filter((item) =>
      [item.title, item.description, item.type, ...(item.keywords || [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
    .slice(0, 40);

  return Response.json({ query, type: type || "All", count: results.length, results });
}
