import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getMaterialKnowledge, materialKnowledge } from "@/lib/materialKnowledge";

export function generateStaticParams() {
  return materialKnowledge.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getMaterialKnowledge(slug);
  if (!item) return {};
  return {
    title: `${item.name} Sauna Whisks`,
    description: item.summary,
    alternates: { canonical: `/materials/${item.slug}` }
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getMaterialKnowledge(slug);
  if (!item) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Materials", href: "/materials" },
        { label: item.name }
      ]} />

      <section className="page-hero">
        <p className="section-kicker">{item.status.toUpperCase()}</p>
        <h1>{item.name}</h1>
        <p>{item.summary}</p>
      </section>

      <section className="material-profile">
        <div><span>Botanical group</span><b>{item.latin}</b></div>
        <div><span>Typical feel</span><b>{item.feel}</b></div>
        <div><span>Aroma character</span><b>{item.aroma}</b></div>
      </section>

      <section className="material-notes">
        <p className="section-kicker">WHAT TO KNOW</p>
        {item.notes.map((note, index) => (
          <div key={note}><span>{String(index + 1).padStart(2, "0")}</span><p>{note}</p></div>
        ))}
        {item.relatedProduct ? <Link className="button button-dark" href={item.relatedProduct}>View planned product</Link> : <Link className="text-link" href="/contact">Ask about future availability →</Link>}
      </section>

      <SiteFooter />
    </main>
  );
}
