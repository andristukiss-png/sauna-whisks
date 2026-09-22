import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { saunaWhisks } from "@/lib/products";
import { articles } from "@/lib/articles";
import { markets } from "@/lib/markets";
import { tradeSegments } from "@/lib/tradeSegments";

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
      ["/about", "About"], ["/standards", "Standards"], ["/operations", "Operations"],
      ["/sources", "Sources"], ["/contact", "Contact"], ["/partners", "Partners / Press"],
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
      <section className="page-hero compact-hero">
        <p className="section-kicker">SITE MAP</p>
        <h1>Everything, without the maze.</h1>
        <p>A human-readable index of the main SaunaWhisks.com sections.</p>
      </section>

      <section className="human-sitemap">
        {staticGroups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map(([href, label]) => <Link href={href} key={href}>{label} →</Link>)}
          </div>
        ))}
        <div>
          <h2>Products</h2>
          {saunaWhisks.map((product) => <Link href={"/shop/" + product.slug} key={product.slug}>{product.name} →</Link>)}
          <Link href="/shop/discovery-trio">Discovery Trio →</Link>
        </div>
        <div>
          <h2>Markets</h2>
          {markets.map((market) => <Link href={"/markets/" + market.slug} key={market.slug}>{market.name} →</Link>)}
        </div>
        <div>
          <h2>Trade</h2>
          {tradeSegments.map((segment) => <Link href={"/trade/" + segment.slug} key={segment.slug}>{segment.name} →</Link>)}
        </div>
        <div className="sitemap-journal">
          <h2>Journal</h2>
          {articles.map((article) => <Link href={"/journal/" + article.slug} key={article.slug}>{article.title} →</Link>)}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
