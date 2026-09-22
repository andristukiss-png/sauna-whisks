"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SiteSearchItem } from "@/lib/siteSearch";
import {
  filterSiteSearchItems,
  isSiteSearchFilter,
  MAX_SEARCH_QUERY_LENGTH,
  normalizeSearchQuery,
  siteSearchFilters,
  type SiteSearchFilter,
} from "@/lib/search";

export function SiteSearch({
  items,
  initialQuery = "",
  initialType = "All",
}: {
  items: SiteSearchItem[];
  initialQuery?: string;
  initialType?: SiteSearchFilter;
}) {
  const [query, setQuery] = useState(initialQuery.slice(0, MAX_SEARCH_QUERY_LENGTH));
  const [type, setType] = useState<SiteSearchFilter>(
    isSiteSearchFilter(initialType) ? initialType : "All"
  );
  const normalized = normalizeSearchQuery(query);

  const matches = useMemo(
    () => filterSiteSearchItems(items, query, type, normalized ? 40 : 18),
    [items, query, type, normalized]
  );

  function syncUrl(nextQuery: string, nextType: SiteSearchFilter) {
    const normalizedQuery = normalizeSearchQuery(nextQuery);
    const params = new URLSearchParams();
    if (normalizedQuery) params.set("q", normalizedQuery);
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
          maxLength={MAX_SEARCH_QUERY_LENGTH}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            syncUrl(value, type);
          }}
          placeholder="Try birch, venik, USA, storage..."
          aria-controls="site-search-results"
        />
      </label>

      <div className="search-filter-row" role="group" aria-label="Filter search results">
        {siteSearchFilters.map((filter) => (
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
        {(query || type !== "All") ? (
          <button
            type="button"
            className="search-clear"
            onClick={() => {
              setQuery("");
              setType("All");
              syncUrl("", "All");
            }}
          >
            Clear
          </button>
        ) : null}
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
