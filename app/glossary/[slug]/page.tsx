import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getGlossaryTerm, glossaryTerms } from "@/lib/glossaryTerms";

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryTerms.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGlossaryTerm(slug);
  if (!item) return {};
  return pageMetadata({
    title: `${item.term} — Sauna Glossary`,
    description: item.definition,
    canonical: `/glossary/${item.slug}`,
  });
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGlossaryTerm(slug);
  if (!item) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: item.term,
    description: item.definition,
    inDefinedTermSet: "https://saunawhisks.com/glossary"
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Glossary", href: "/glossary" },
        { label: item.term }
      ]} />
      <section className="page-hero term-hero">
        <p className="section-kicker">GLOSSARY TERM</p>
        <h1>{item.term}</h1>
        <p>{item.definition}</p>
      </section>

      <section className="term-context">
        <p className="section-kicker">CONTEXT</p>
        <h2>What it means on SaunaWhisks.com</h2>
        <p>{item.context}</p>
        <div>
          {item.related.map((related) => <Link href={related.href} key={related.href}>{related.label} →</Link>)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
