import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { launchStatus } from "@/lib/status";

export const metadata = pageMetadata({
  title: "Launch Status",
  description: "Current SaunaWhisks.com commercial launch status.",
  canonical: "/status",
});

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
        {launchStatus.items.map(({ area, status, description }, index) => (
          <div key={area}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{area}</h2>
            <b>{status}</b>
            <p>{description}</p>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
