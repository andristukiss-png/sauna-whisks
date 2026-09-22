import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { saunaWhisks } from "@/lib/products";

export const metadata = pageMetadata({
  title: "Pre-launch Product Catalog",
  description: "Transparent pre-launch catalog with product status, planned condition and verification state.",
  canonical: "/catalog",
});

export default function CatalogPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Catalog" }]} />
      <section className="page-hero">
        <p className="section-kicker">PRODUCT DATA</p>
        <h1>What is known, and what is still pending.</h1>
        <p>
          This pre-launch catalog separates planned commercial information from supplier and harvest details that are not yet verified.
        </p>
      </section>

      <section className="data-catalog">
        {saunaWhisks.map((whisk) => (
          <article key={whisk.slug}>
            <div className="data-catalog-head">
              <span>{whisk.status}</span>
              <h2>{whisk.name}</h2>
              <Link href={"/shop/" + whisk.slug}>Product page →</Link>
            </div>
            <dl>
              <div><dt>Material</dt><dd>{whisk.material}</dd></div>
              <div><dt>Botanical group</dt><dd>{whisk.latin}</dd></div>
              <div><dt>Working origin</dt><dd>{whisk.origin}</dd></div>
              <div><dt>Planned condition</dt><dd>{whisk.plannedCondition}</dd></div>
              <div><dt>Verification</dt><dd>{whisk.verification}</dd></div>
              <div><dt>Planned price</dt><dd>{whisk.plannedPrice}</dd></div>
              <div><dt>Purchasable</dt><dd>No — pre-launch</dd></div>
            </dl>
          </article>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">MACHINE-READABLE</p>
        <h2>The same pre-launch catalog is available as JSON.</h2>
        <p>For integrations and internal tooling, use the public pre-launch catalog endpoint.</p>
        <a className="text-link" href="/api/catalog">Open /api/catalog →</a>
      </section>

      <SiteFooter />
    </main>
  );
}
