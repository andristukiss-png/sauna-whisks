import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getTraditionDetail, traditionDetails } from "@/lib/traditionDetails";

export const dynamicParams = false;

export function generateStaticParams() {
  return traditionDetails.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getTraditionDetail(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: item.summary,
    canonical: `/traditions/${item.slug}`,
  });
}

export default async function TraditionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getTraditionDetail(slug);
  if (!item) notFound();

  return (
    <>
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Traditions", href: "/traditions" },
        { label: item.name }
      ]} />

      <section className="page-hero">
        <p className="section-kicker">{item.region.toUpperCase()}</p>
        <h1>{item.name}</h1>
        <p>{item.summary}</p>
      </section>

      <section className="tradition-principles">
        <p className="section-kicker">PRINCIPLES</p>
        <div>
          {item.principles.map((principle, index) => (
            <article key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tradition-terms">
        <div>
          <p className="section-kicker">TERMINOLOGY</p>
          <p>{item.terminology.join(" · ")}</p>
        </div>
        <div>
          <p className="section-kicker">READ NEXT</p>
          {item.related.map((related) => <Link href={related.href} key={related.href}>{related.label} →</Link>)}
        </div>
      </section>
    </>
  );
}
