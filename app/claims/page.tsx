import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Product Claims Standard",
  description: "How SaunaWhisks.com separates observable product characteristics from unsupported health marketing.",
  canonical: "/claims",
});

export default function ClaimsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Product claims" }]} />
      <section className="page-hero">
        <p className="section-kicker">CLAIMS STANDARD</p>
        <h1>Describe the branch. Do not invent the cure.</h1>
        <p>
          SaunaWhisks.com focuses on material, aroma, physical feel, preparation,
          origin, condition and documented tradition—not unsupported medical promises.
        </p>
      </section>

      <section className="claims-grid">
        <article>
          <span>YES</span>
          <h2>Observable product facts</h2>
          <p>Material, origin, condition, dimensions, aroma character, preparation, storage and tested physical performance.</p>
        </article>
        <article>
          <span>YES</span>
          <h2>Sourced cultural context</h2>
          <p>Regional terminology and traditions when the source and context are clear.</p>
        </article>
        <article>
          <span>NO</span>
          <h2>Medical promises</h2>
          <p>No detox, cure, treatment, immunity or other health-benefit claims without a separate evidence and regulatory review.</p>
        </article>
        <article>
          <span>NO</span>
          <h2>Vague healing mythology</h2>
          <p>No invented ancient-healing language used as a substitute for verifiable product information.</p>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
