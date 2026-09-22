import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import { glossaryTerms } from "@/lib/glossaryTerms";

const terms = glossaryTerms.map(({ slug, term, definition }) => [slug, term, definition]);

export const metadata = {
  title: "Sauna Whisk Glossary",
  description: "Definitions of sauna whisk, pirts, pirtnieks, venik, vihta, vasta and other sauna terms.",
  alternates: { canonical: "/glossary" }
};

export default function GlossaryPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Sauna Whisk Glossary",
    url: "https://saunawhisks.com/glossary",
    hasDefinedTerm: glossaryTerms.map(({ term, definition }) => ({
      "@type": "DefinedTerm",
      name: term,
      description: definition
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <section className="page-hero">
        <p className="section-kicker">GLOSSARY</p>
        <h1>The language of whisking.</h1>
        <p>
          A practical vocabulary for navigating Latvian pirts, Finnish sauna and banya terminology without mixing everything together.
        </p>
      </section>
      <section className="glossary">
        {terms.map(([slug, term, definition], index) => (
          <Link className="glossary-row" href={"/glossary/" + slug} key={slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{term}</h2>
            <p>{definition}</p>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
