import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { publicDataEndpoints } from "@/lib/publicData";

export const metadata = {
  title: "Public Data",
  description: "Public pre-launch SaunaWhisks.com JSON, CSV, feed and machine-readable endpoints.",
  alternates: { canonical: "/data" }
};

export default function DataPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Public data" }]} />
      <section className="page-hero">
        <p className="section-kicker">PUBLIC DATA</p>
        <h1>Use the same information the site uses.</h1>
        <p>Read-only pre-launch endpoints for product, content, market, trade, source and machine-readable site data.</p>
      </section>
      <section className="data-endpoints">
        {publicDataEndpoints.map(({ path, label }) => (
          <a href={path} key={path}>
            <h2>{label}</h2>
            <code>{path}</code>
            <b>Open →</b>
          </a>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
