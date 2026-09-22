import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteSearch } from "@/components/SiteSearch";
import { siteSearchItems } from "@/lib/siteSearch";

export const metadata = {
  title: "Search",
  description: "Search SaunaWhisks.com products, guides, markets and trade information.",
  alternates: { canonical: "/search" }
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <section className="page-hero compact-hero">
        <p className="section-kicker">SEARCH</p>
        <h1>Find the branch you need.</h1>
        <p>Search products, materials, preparation guides, traditions, launch markets and trade information.</p>
      </section>
      <SiteSearch items={siteSearchItems} initialQuery={q} />
      <SiteFooter />
    </main>
  );
}
