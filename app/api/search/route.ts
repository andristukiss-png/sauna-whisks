import { siteSearchItems } from "@/lib/siteSearch";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  if (!query) {
    return Response.json({ query: "", results: siteSearchItems.slice(0, 12) });
  }

  const results = siteSearchItems
    .filter((item) =>
      [item.title, item.description, item.type, ...(item.keywords || [])]
        .join(" ")
        .toLowerCase()
        .includes(query)
    )
    .slice(0, 30);

  return Response.json({ query, count: results.length, results });
}
