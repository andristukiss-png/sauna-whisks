"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SiteSearchItem } from "@/lib/siteSearch";

export function SiteSearch({ items }: { items: SiteSearchItem[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (!normalized) return items.slice(0, 12);
    return items
      .filter((item) =>
        [item.title, item.description, item.type, ...(item.keywords || [])]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .slice(0, 30);
  }, [items, normalized]);

  return (
    <section className="site-search">
      <label>
        <span>Search SaunaWhisks.com</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try birch, venik, USA, storage..."
        />
      </label>

      <p className="search-count">
        {normalized ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "Popular starting points"}
      </p>

      <div className="search-results">
        {matches.map((item) => (
          <Link href={item.href} key={item.href}>
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
          <p>Try a broader term, or send us an enquiry if the information is missing.</p>
          <Link href="/contact" className="text-link">Contact Sauna Whisks →</Link>
        </div>
      ) : null}
    </section>
  );
}
