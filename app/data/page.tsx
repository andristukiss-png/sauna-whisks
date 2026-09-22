import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Public Data",
  description: "Public pre-launch SaunaWhisks.com JSON, CSV and feed endpoints.",
  alternates: { canonical: "/data" }
};

const endpoints = [
  ["/api/catalog", "Product catalog JSON"],
  ["/api/catalog.csv", "Product catalog CSV"],
  ["/api/articles", "Journal index JSON"],
  ["/api/materials", "Materials JSON"],
  ["/api/conditions", "Product conditions JSON"],
  ["/api/markets", "Market plans JSON"],
  ["/api/trade", "Trade segments JSON"],
  ["/api/glossary", "Glossary JSON"],
  ["/api/guides", "Buyer guides JSON"],
  ["/api/operations", "Operations standards JSON"],
  ["/api/company", "Company facts JSON"],
  ["/api/use-cases", "Use cases JSON"],
  ["/api/techniques", "Techniques JSON"],
  ["/api/faq", "FAQ topics JSON"],
  ["/api/traditions", "Traditions JSON"],
  ["/api/comparisons", "Comparisons JSON"],
  ["/api/editorial", "Editorial/source-policy JSON"],
  ["/api/tools", "Tools index JSON"],
  ["/api/sources", "Source library JSON"],
  ["/api/sources.csv", "Source library CSV"],
  ["/api/product-data-template.csv", "Product data template CSV"],
  ["/api/supplier-sample-template.csv", "Supplier sample evaluation CSV"],
  ["/api/trade-trial-template.csv", "Trade trial template CSV"],
  ["/feed.xml", "RSS feed"],
  ["/feed.json", "JSON Feed"],
];

export default function DataPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Public data" }]} />
      <section className="page-hero">
        <p className="section-kicker">PUBLIC DATA</p>
        <h1>Use the same information the site uses.</h1>
        <p>Read-only pre-launch endpoints for product, content, market, trade and source data.</p>
      </section>
      <section className="data-endpoints">
        {endpoints.map(([href, label]) => (
          <a href={href} key={href}>
            <h2>{label}</h2>
            <code>{href}</code>
            <b>Open →</b>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
