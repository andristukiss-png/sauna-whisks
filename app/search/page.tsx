import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteSearch } from "@/components/SiteSearch";
import { siteSearchItems } from "@/lib/siteSearch";
import { isSiteSearchFilter } from "@/lib/search";

export const metadata = pageMetadata({
  title: "Search",
  description: "Search SaunaWhisks.com products, guides, markets and trade information.",
  canonical: "/search",
  robots: { index: false, follow: true },
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type = "All" } = await searchParams;
  const initialType = isSiteSearchFilter(type) ? type : "All";

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <section className="page-hero compact-hero">
        <p className="section-kicker">SEARCH</p>
        <h1>Find the branch you need.</h1>
        <p>Search products, materials, preparation guides, traditions, launch markets and trade information.</p>
      </section>
      <SiteSearch items={siteSearchItems} initialQuery={q} initialType={initialType} />
      <SiteFooter />
    </main>
  );
}
