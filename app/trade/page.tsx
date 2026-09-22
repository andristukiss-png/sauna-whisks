import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { tradeSegments } from "@/lib/tradeSegments";

export const metadata = {
  title: "Trade Supply",
  description: "Trade supply plans for public saunas, hotels, spas, retailers, builders, wellness clubs and distributors.",
  alternates: { canonical: "/trade" }
};

export default function TradePage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Trade" }]} />
      <section className="page-hero dark-page">
        <p className="section-kicker light">TRADE</p>
        <h1>Different businesses need different whisk programs.</h1>
        <p>
          Trade supply will be built around how the product is actually used: venue replenishment,
          retail merchandising, sauna handover, guest ritual or regional distribution.
        </p>
      </section>

      <section className="trade-segment-grid">
        {tradeSegments.map((segment, index) => (
          <Link href={"/trade/" + segment.slug} key={segment.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{segment.name}</h2>
            <p>{segment.summary}</p>
            <b>View trade plan →</b>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
