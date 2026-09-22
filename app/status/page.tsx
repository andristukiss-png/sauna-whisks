import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Launch Status",
  description: "Current SaunaWhisks.com commercial launch status.",
  alternates: { canonical: "/status" }
};

const items = [
  ["Brand & website", "In development", "Core website, education, enquiry and product architecture are built."],
  ["Supplier verification", "Open", "Producer, product and batch documentation still needs commercial verification."],
  ["Import compliance", "Researching", "Destination-market checks are required before plant products are offered for sale."],
  ["Fulfilment", "Open", "Warehouse, packaging and shipping processes are not final."],
  ["Payments", "Disabled", "Checkout remains intentionally off until product and fulfilment gates are complete."],
  ["Customer enquiries", "Open", "Pre-launch product, supplier, trade and market enquiries are accepted."]
];

export default function StatusPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Launch status" }]} />
      <section className="page-hero">
        <p className="section-kicker">LAUNCH STATUS</p>
        <h1>Pre-launch, on purpose.</h1>
        <p>We would rather open later with verified products than accept payment before the supply chain is ready.</p>
      </section>
      <section className="status-list">
        {items.map(([area, status, copy], index) => (
          <div key={area}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{area}</h2>
            <b>{status}</b>
            <p>{copy}</p>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
