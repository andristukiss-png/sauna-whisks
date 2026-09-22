import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = {
  title: "Shipping & Availability",
  description:
    "Current pre-launch shipping and availability status for SaunaWhisks.com.",
  alternates: { canonical: "/shipping" }
};

const markets = [
  ["European Union", "Planned", "Initial fulfilment and VAT/shipping setup is being prepared."],
  ["United Kingdom", "Planned", "Shipping and plant-product requirements will be confirmed before orders open."],
  ["United States", "Researching", "Each SKU will be checked for admissibility and documentation before sale."],
  ["Canada", "Researching", "Product-specific import and shipping requirements are still being validated."],
  ["Australia", "Later phase", "Plant biosecurity makes imported foliage a separate operational project."]
];

export default function ShippingPage() {
  return (
    <main>
      <Header />
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
        {markets.map(([market, status, copy], index) => (
          <div className="shipping-row" key={market}>
            <span>0{index + 1}</span>
            <h2>{market}</h2>
            <b>{status}</b>
            <p>{copy}</p>
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

      <SiteFooter />
    </main>
  );
}
