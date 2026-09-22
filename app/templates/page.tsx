import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Templates & Downloads",
  description: "Public SaunaWhisks.com supplier, product-data and trade-trial templates.",
  alternates: { canonical: "/templates" }
};

const downloads = [
  ["/api/product-data-template.csv", "Product data template", "Fields for origin, condition, dimensions, preparation, cost and compliance."],
  ["/api/supplier-sample-template.csv", "Supplier sample evaluation", "Repeatable sample testing fields for supplier comparison."],
  ["/api/trade-trial-template.csv", "Trade trial template", "Venue/retailer usage and reorder evaluation fields."],
  ["/api/catalog.csv", "Current pre-launch catalog", "Public working catalog with verification state."],
  ["/api/sources.csv", "Source library", "Public external source list used by current educational content."],
];

export default function TemplatesPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Templates" }]} />
      <section className="page-hero">
        <p className="section-kicker">TEMPLATES</p>
        <h1>Use structured data from the start.</h1>
        <p>Simple CSV templates for supplier intake, sample testing and trade trials.</p>
      </section>

      <section className="data-endpoints">
        {downloads.map(([href,title,copy]) => (
          <a href={href} key={href}>
            <h2>{title}</h2>
            <p>{copy}</p>
            <code>{href}</code>
            <b>Download / open →</b>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
