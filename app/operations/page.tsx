import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { operationGuides } from "@/lib/operations";

export const metadata = {
  title: "Product Operations",
  description: "SaunaWhisks.com working standards for provenance, testing, harvest, packaging, specifications and import compliance.",
  alternates: { canonical: "/operations" }
};

export default function OperationsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">PRODUCT OPERATIONS</p>
        <h1>Make a natural product measurable.</h1>
        <p>
          Tradition matters, but a serious international product also needs specifications,
          testing, documentation, packaging and market-specific compliance.
        </p>
      </section>

      <section className="operations-grid">
        {operationGuides.map((guide, index) => (
          <Link href={"/operations/" + guide.slug} key={guide.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{guide.eyebrow}</p>
            <h2>{guide.title}</h2>
            <em>{guide.description}</em>
            <b>Read standard →</b>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
