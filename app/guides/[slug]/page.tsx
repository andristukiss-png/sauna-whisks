import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buyerGuides, getBuyerGuide } from "@/lib/buyerGuides";

export const dynamicParams = false;\n\nexport function generateStaticParams() {
  return buyerGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    canonical: `/guides/${guide.slug}`,
  });
}

export default async function BuyerGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getBuyerGuide(slug);
  if (!guide) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Buying guides", href: "/guides" },
        { label: guide.title }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">BUYING GUIDE</p>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
      </section>

      <section className="buyer-recommendation">
        <p className="section-kicker">WORKING RECOMMENDATION</p>
        <h2>{guide.recommendation}</h2>
        <div>
          {guide.reasons.map((reason, index) => (
            <p key={reason}><span>{String(index + 1).padStart(2, "0")}</span>{reason}</p>
          ))}
        </div>
      </section>

      <section className="buyer-next">
        <p className="section-kicker">NEXT</p>
        {guide.links.map((link) => <Link href={link.href} key={link.href}>{link.label} →</Link>)}
      </section>
      <SiteFooter />
    </main>
  );
}
