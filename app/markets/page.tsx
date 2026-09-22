import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { getMarketPath, markets } from "@/lib/markets";

export const metadata = pageMetadata({
  title: "Markets",
  description: "Planned SaunaWhisks.com launch markets and current availability status.",
  canonical: "/markets",
});

export default function MarketsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Markets" }]} />
      <section className="page-hero">
        <p className="section-kicker">MARKETS</p>
        <h1>Launch where the logistics make sense.</h1>
        <p>
          Each market has different plant-product, shipping, tax and fulfilment realities.
          We publish status rather than pretending every country is already open.
        </p>
      </section>

      <section className="market-grid">
        {markets.map((market, index) => (
          <Link prefetch={false} href={getMarketPath(market)} key={market.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{market.status}</b>
            <h2>{market.name}</h2>
            <p>{market.summary}</p>
            <em>Market plan →</em>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
