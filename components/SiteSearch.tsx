"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SiteSearchItem } from "@/lib/siteSearch";

const filters = ["All", "Product", "Guide", "Market", "Trade", "Page"] as const;
type Filter = (typeof filters)[number];

export function SiteSearch({
  items,
  initialQuery = "",
  initialType = "All",
}: {
  items: SiteSearchItem[];
  initialQuery?: string;
  initialType?: Filter;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<Filter>(filters.includes(initialType) ? initialType : "All");
  const normalized = query.trim().toLowerCase();

  const matches = useMemo(() => {
    const typed = type === "All" ? items : items.filter((item) => item.type === type);
    if (!normalized) return typed.slice(0, 18);
    return typed
      .filter((item) =>
        [item.title, item.description, item.type, ...(item.keywords || [])]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 40);
  }, [items, normalized, type]);

  function syncUrl(nextQuery: string, nextType: Filter) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextType !== "All") params.set("type", nextType);
    const suffix = params.toString();
    window.history.replaceState(null, "", suffix ? "/search?" + suffix : "/search");
  }

  return (
    <section className="site-search">
      <label>
        <span>Search SaunaWhisks.com</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            syncUrl(value, type);
          }}
          placeholder="Try birch, venik, USA, storage..."
          aria-controls="site-search-results"
        />
      </label>

      <div className="search-filter-row" aria-label="Filter search results">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={type === filter ? "selected" : ""}
            aria-pressed={type === filter}
            onClick={() => {
              setType(filter);
              syncUrl(query, filter);
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="search-count" role="status" aria-live="polite">
        {normalized || type !== "All"
          ? `${matches.length} result${matches.length === 1 ? "" : "s"}`
          : "Popular starting points"}
      </p>

      <div className="search-results" id="site-search-results">
        {matches.map((item) => (
          <Link href={item.href} key={item.href} prefetch={false}>
            <span>{item.type}</span>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <b>Open →</b>
          </Link>
        ))}
      </div>

      {!matches.length ? (
        <div className="search-empty">
          <h2>No exact match.</h2>
          <p>Try a broader term, switch the filter, or send us an enquiry if the information is missing.</p>
          <Link href="/contact" className="text-link">Contact Sauna Whisks →</Link>
        </div>
      ) : null}
    </section>
  );
}
