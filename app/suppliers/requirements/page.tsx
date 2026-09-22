import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Supplier Requirements",
  description: "Working supplier requirements for SaunaWhisks.com sauna whisk producers.",
  alternates: { canonical: "/suppliers/requirements" }
};

const requirements = [
  ["Origin", "Harvest country and production country must be distinguishable."],
  ["Material", "Common botanical material and species/group where known."],
  ["Condition", "Dried, fresh, frozen, vacuum-packed or other preservation method."],
  ["Dimensions", "Typical length and weight with realistic natural tolerance."],
  ["Preparation", "Supplier-recommended preparation and storage instructions."],
  ["Capacity", "MOQ, lead time, seasonal capacity and normal order quantities."],
  ["Packaging", "Current export/retail pack format and protection against crushing/moisture."],
  ["Documentation", "Available batch, harvest, export or plant-product documents."],
];

export default function SupplierRequirementsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Suppliers", href: "/suppliers" },
        { label: "Requirements" }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">SUPPLIER REQUIREMENTS</p>
        <h1>Start with evidence, not a product photo.</h1>
        <p>These are the working data points we need before a whisk can become a serious commercial SKU.</p>
      </section>

      <section className="requirements-list">
        {requirements.map(([title,copy], index) => (
          <div key={title}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">NEXT</p>
        <h2>Send structured supplier data.</h2>
        <p>Use the supplier enquiry or download the public product-data template.</p>
        <div className="condition-related">
          <Link href="/suppliers">Supplier enquiry →</Link>
          <a href="/api/product-data-template.csv">Download product-data CSV →</a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
