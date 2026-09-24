import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QualityChecklist } from "@/components/QualityChecklist";

export const metadata = pageMetadata({
  title: "Supplier Sample Evaluation",
  description: "A practical sample-evaluation workflow for sauna whisk supplier candidates.",
  canonical: "/suppliers/sample-evaluation",
});

export default function SupplierSampleEvaluationPage() {
  return (
    <>
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Suppliers", href: "/suppliers" },
        { label: "Sample evaluation" }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">SAMPLE EVALUATION</p>
        <h1>Test the prepared whisk, not just the dry bundle.</h1>
        <p>Use the same evaluation language across supplier samples so comparisons are repeatable.</p>
      </section>

      <section className="checklist-wrap">
        <QualityChecklist />
        <div className="supplier-eval-links">
          <Link className="text-link" href="/operations/product-testing">Product testing standard →</Link>
          <a className="text-link" href="/api/supplier-sample-template.csv">Download sample-evaluation CSV →</a>
        </div>
      </section>
    </>
  );
}
