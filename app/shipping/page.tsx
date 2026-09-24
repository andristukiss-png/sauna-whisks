import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getMarket, getMarketPath } from "@/lib/markets";

export const metadata = pageMetadata({
  title: "Shipping & Availability",
  description: "Current pre-launch shipping and availability status for SaunaWhisks.com.",
  canonical: "/shipping",
});

function requireMarket(slug: string) {
  const market = getMarket(slug);
  if (!market) throw new Error(`Shipping market configuration is missing: ${slug}`);
  return market;
}

const shippingMarkets = [
  "european-union",
  "united-kingdom",
  "united-states",
  "canada",
  "australia",
].map(requireMarket);

export default function ShippingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shipping" }]} />

      <section className="page-hero">
        <p className="section-kicker">SHIPPING & AVAILABILITY</p>
        <h1>We are not shipping yet.</h1>
        <p>
          SaunaWhisks.com is still pre-launch. We are building product, supplier, import and
          fulfilment systems before accepting payment.
        </p>
      </section>

      <section className="shipping-status">
        {shippingMarkets.map((market, index) => (
          <div className="shipping-row" key={market.slug}>
            <span>0{index + 1}</span>
            <h2>{market.name}</h2>
            <b>{market.status}</b>
            <p>{market.logistics}</p>
            <Link className="text-link" href={getMarketPath(market)}>Market details →</Link>
          </div>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">WHY WE ARE CAUTIOUS</p>
        <h2>Natural plant products need real logistics.</h2>
        <p>
          Shipping a dried whisk is not the same as shipping a towel or a sauna hat.
          Rules can depend on species, condition, origin and destination. We will open a market
          only when the relevant product and documentation path is clear.
        </p>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">ASK ABOUT YOUR COUNTRY</p>
        <h2>Planning a future order?</h2>
        <p>
          Send your country and what you are interested in. We can use that demand to prioritize launch markets.
        </p>
        <EnquiryForm
          subject="SaunaWhisks.com shipping enquiry"
          countryField
          topics={["Home customer", "Trade / business", "Future market interest"]}
          messagePlaceholder="Tell us which products and shipping destination you are interested in..."
        />
      </section>
    </>
  );
}
