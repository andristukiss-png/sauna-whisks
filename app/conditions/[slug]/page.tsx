import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProductCondition, productConditions } from "@/lib/productConditions";

export const dynamicParams = false;\n\nexport function generateStaticParams() {
  return productConditions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProductCondition(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: item.summary,
    canonical: `/conditions/${item.slug}`,
  });
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getProductCondition(slug);
  if (!item) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Conditions", href: "/conditions" },
        { label: item.name }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">{item.status.toUpperCase()}</p>
        <h1>{item.name}</h1>
        <p>{item.summary}</p>
      </section>

      <section className="condition-detail">
        <div>
          <p className="section-kicker">ADVANTAGES</p>
          {item.advantages.map((value) => <p key={value}>+ {value}</p>)}
        </div>
        <div>
          <p className="section-kicker">CONSTRAINTS</p>
          {item.constraints.map((value) => <p key={value}>— {value}</p>)}
        </div>
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">PREPARATION PRINCIPLE</p>
        <h2>{item.preparation}</h2>
        <div className="condition-related">
          {item.related.map((link) => <Link href={link.href} key={link.href}>{link.label} →</Link>)}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
