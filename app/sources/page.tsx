import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articleSources } from "@/lib/sources";

export const metadata = pageMetadata({
  title: "Sources",
  description: "Primary and supporting sources referenced across the SaunaWhisks.com knowledge library.",
  canonical: "/sources",
});

export default function SourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sources" }]} />
      <section className="page-hero">
        <p className="section-kicker">SOURCES</p>
        <h1>Show the source, not just the story.</h1>
        <p>
          This library collects the external references currently cited in our educational articles.
          Commercial product claims will require supplier and batch documentation in addition to public sources.
        </p>
      </section>

      <section className="source-policy-links">
        <Link href="/editorial-policy">Editorial & source policy →</Link>
        <Link href="/corrections">Corrections policy →</Link>
        <Link href="/claims">Product claims standard →</Link>
      </section>
      <section className="source-list">
        {articleSources.map((source, index) => (
          <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{source.label}</h2>
            <p>{source.url}</p>
            <b>Open source ↗</b>
          </a>
        ))}
      </section>
    </>
  );
}
