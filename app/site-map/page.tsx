import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { saunaWhisks } from "@/lib/products";
import { articles } from "@/lib/articles";
import { getMarketPath, markets } from "@/lib/markets";
import { tradeSegments } from "@/lib/tradeSegments";
import { useCases } from "@/lib/useCases";
import { techniques } from "@/lib/techniques";

export const metadata = {
  title: "Site Map",
  description: "Human-readable map of SaunaWhisks.com.",
  alternates: { canonical: "/site-map" }
};

const staticGroups = [
  {
    title: "Learn",
    links: [
      ["/learn", "Learn hub"], ["/beginners", "Beginners"], ["/materials", "Materials"],
      ["/care", "Care"], ["/traditions", "Traditions"], ["/glossary", "Glossary"],
      ["/journal", "Journal"], ["/faq", "FAQ"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/company", "Company"], ["/about", "About"], ["/press", "Press facts"], ["/standards", "Standards"], ["/operations", "Operations"],
      ["/sources", "Sources"], ["/editorial-policy", "Editorial policy"], ["/corrections", "Corrections"], ["/contact", "Contact"], ["/partners", "Partners / Press"],
      ["/suppliers", "Suppliers"]
    ]
  },
  {
    title: "Commercial",
    links: [
      ["/shop", "Shop"], ["/compare", "Compare"], ["/guides", "Buying guides"],
      ["/trade", "Trade"], ["/wholesale", "Wholesale"], ["/markets", "Markets"],
      ["/shipping", "Shipping & availability"]
    ]
  },
  {
    title: "Legal",
    links: [
      ["/privacy", "Privacy"], ["/terms", "Terms"], ["/returns", "Returns"],
      ["/cookies", "Cookies"], ["/accessibility", "Accessibility"]
    ]
  }
];

export default function SiteMapPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Site map" }]} />
      <section className="page-hero compact-hero">
        <p className="section-kicker">SITE MAP</p>
        <h1>Everything, without the maze.</h1>
        <p>A human-readable index of the main SaunaWhisks.com sections.</p>
      </section>

      <section className="human-sitemap">
        {staticGroups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([href, label]) => <Link prefetch={false} href={href} key={href}>{label} →</Link>)}
          </div>
        ))}
        <div>
          <h2>Products</h2>
          {saunaWhisks.map((product) => <Link prefetch={false} href={"/shop/" + product.slug} key={product.slug}>{product.name} →</Link>)}
          <Link prefetch={false} href="/shop/discovery-trio">Discovery Trio →</Link>
        </div>
        <div>
          <h2>Markets</h2>
          {markets.map((market) => <Link prefetch={false} href={getMarketPath(market)} key={market.slug}>{market.name} →</Link>)}
        </div>
        <div>
          <h2>Trade</h2>
          {tradeSegments.map((segment) => <Link prefetch={false} href={"/trade/" + segment.slug} key={segment.slug}>{segment.name} →</Link>)}
        </div>
        <div>
          <h2>Use cases</h2>
          {useCases.map((item) => <Link prefetch={false} href={"/use-cases/" + item.slug} key={item.slug}>{item.name} →</Link>)}
        </div>
        <div>
          <h2>Techniques</h2>
          {techniques.map((item) => <Link prefetch={false} href={"/techniques/" + item.slug} key={item.slug}>{item.name} →</Link>)}
        </div>
        <div>
          <h2>Tools</h2>
          <Link prefetch={false} href="/tools">Tools hub →</Link>
          <Link prefetch={false} href="/tools/supplier-scorecard">Supplier scorecard →</Link>
          <Link prefetch={false} href="/tools/landed-cost">Landed-cost calculator →</Link>
          <Link prefetch={false} href="/tools/trade-demand">Trade demand estimator →</Link>
          <Link prefetch={false} href="/tools/launch-readiness">Launch readiness →</Link>
        </div>
        <div className="sitemap-journal">
          <h2>Journal</h2>
          {articles.map((article) => <Link prefetch={false} href={"/journal/" + article.slug} key={article.slug}>{article.title} →</Link>)}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
