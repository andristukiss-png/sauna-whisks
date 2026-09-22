import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteSearch } from "@/components/SiteSearch";
import { siteSearchItems } from "@/lib/siteSearch";

export const metadata = {
  title: "Search",
  description: "Search SaunaWhisks.com products, guides, markets and trade information.",
  alternates: { canonical: "/search" }
};

export default function SearchPage() {
  return (
    <main>
      <Header />
      <section className="page-hero compact-hero">
        <p className="section-kicker">SEARCH</p>
        <h1>Find the branch you need.</h1>
        <p>Search products, materials, preparation guides, traditions, launch markets and trade information.</p>
      </section>
      <SiteSearch items={siteSearchItems} />
      <SiteFooter />
    </main>
  );
}
