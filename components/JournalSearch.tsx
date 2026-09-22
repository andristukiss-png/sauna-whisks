"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type JournalItem = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  readTime: string;
};

export function JournalSearch({ items }: { items: JournalItem[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.title, item.eyebrow, item.description]
        .join(" ")
        .toLowerCase()
        .includes(normalized)
    );
  }, [items, query]);

  return (
    <section className="journal-search-section" aria-label="Search sauna guides">
      <label className="journal-search">
        <span>Search the sauna library</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try birch, storage, venik..."
        />
      </label>

      <div className="journal-list">
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
