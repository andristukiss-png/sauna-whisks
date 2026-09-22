import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { comparisons, getComparison } from "@/lib/comparisons";

export function generateStaticParams() {
  return comparisons.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getComparison(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/compare/${item.slug}` }
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getComparison(slug);
  if (!item) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/compare" },
        { label: item.title }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">DIRECT COMPARISON</p>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
      </section>

      <section className="pair-comparison">
        {[item.left, item.right].map((side) => (
          <div key={side.name}>
            <h2>{side.name}</h2>
            {side.points.map((point) => <p key={point}>— {point}</p>)}
          </div>
        ))}
      </section>

      <section className="comparison-conclusion">
        <p className="section-kicker">CHOOSING BETWEEN THEM</p>
        <h2>{item.conclusion}</h2>
        <div>{item.related.map((link) => <Link href={link.href} key={link.href}>{link.label} →</Link>)}</div>
      </section>

      <SiteFooter />
    </main>
  );
}
