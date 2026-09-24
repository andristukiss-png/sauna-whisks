"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MAX_SEARCH_QUERY_LENGTH, normalizeSearchQuery } from "@/lib/search";

type JournalItem = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  readTime: string;
  headings: string[];
};

export function JournalSearch({ items }: { items: JournalItem[] }) {
  const [query, setQuery] = useState("");

  const normalized = normalizeSearchQuery(query);

  const filtered = useMemo(() => {
    if (!normalized) return items;

    const tokens = normalized.split(" ");
    return items.filter((item) => {
      const haystack = [item.title, item.eyebrow, item.description, ...item.headings]
        .join(" ")
        .normalize("NFKC")
        .toLowerCase();

      return tokens.every((token) => haystack.includes(token));
    });
  }, [items, normalized]);

  return (
    <section className="journal-search-section" aria-label="Search sauna guides">
      <label className="journal-search">
        <span>Search the sauna library</span>
        <input
          type="search"
          value={query}
          maxLength={MAX_SEARCH_QUERY_LENGTH}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try birch, storage, venik..."
          aria-controls="journal-search-results"
          aria-describedby="journal-search-count"
        />
      </label>

      <p id="journal-search-count" className="search-count" role="status" aria-live="polite" aria-atomic="true">
        {normalized
          ? `${filtered.length} guide${filtered.length === 1 ? "" : "s"}`
          : `${filtered.length} guides in the library`}
      </p>

      <div className="journal-list" id="journal-search-results">
        {filtered.map((article, index) => (
          <Link prefetch={false} href={"/journal/" + article.slug} className="journal-row" key={article.slug}>
            <span className="journal-index">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <p className="journal-description">{article.description}</p>
            </div>
            <span className="journal-time">{article.readTime} →</span>
          </Link>
        ))}
        {!filtered.length ? (
          <p className="journal-empty">No guide matched that search. Try a broader term.</p>
        ) : null}
      </div>
    </section>
  );
}
