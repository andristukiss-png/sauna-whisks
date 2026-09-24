import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = pageMetadata({
  title: "Suppliers & Producers",
  description: "SaunaWhisks.com is looking for experienced sauna-whisk producers and botanical suppliers in Latvia and the wider Baltic region.",
  canonical: "/suppliers",
});

export default function SuppliersPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Suppliers" }]} />
      <section className="page-hero">
        <p className="section-kicker">SUPPLIERS / PRODUCERS</p>
        <h1>We want to know who made the whisk.</h1>
        <p>
          SaunaWhisks.com is looking for experienced producers who can document materials,
          origin, preservation method and commercial capacity.
        </p>
      </section>

      <section className="supplier-grid">
        <article><span>01</span><h2>Origin</h2><p>Where branches are harvested and where the finished whisk is produced.</p></article>
        <article><span>02</span><h2>Botanical detail</h2><p>Species or botanical group, condition and seasonal harvesting information where known.</p></article>
        <article><span>03</span><h2>Capacity</h2><p>Typical MOQ, annual volume, packaging format and lead time.</p></article>
        <article><span>04</span><h2>Export experience</h2><p>Countries already supplied and any plant-product documentation routinely provided.</p></article>
      </section>

      <section className="supplier-resource-links">
        <Link href="/suppliers/requirements">Supplier requirements →</Link>
        <Link href="/suppliers/sample-evaluation">Sample evaluation →</Link>
        <Link href="/templates">Templates & downloads →</Link>
        <Link href="/tools/supplier-scorecard">Supplier scorecard →</Link>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">BECOME A SUPPLY PARTNER</p>
        <h2>Introduce your production.</h2>
        <p>
          Tell us what you make, where you are based and your approximate commercial capacity.
        </p>
        <EnquiryForm
          subject="SaunaWhisks.com supplier enquiry"
          topics={["Birch producer", "Oak producer", "Eucalyptus producer", "Herbal / mixed whisk producer", "Packaging / preservation", "Other supply"]}
          businessFields
          messagePlaceholder="Describe your products, production season, MOQ and export experience..."
        />
      </section>
    </>
  );
}
