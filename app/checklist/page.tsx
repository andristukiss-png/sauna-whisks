import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { QualityChecklist } from "@/components/QualityChecklist";

export const metadata = {
  title: "Sauna Whisk Quality Checklist",
  description: "Interactive checklist for evaluating sauna whisk provenance, construction and prepared performance.",
  alternates: { canonical: "/checklist" }
};

export default function ChecklistPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quality checklist" }]} />
      <section className="page-hero">
        <p className="section-kicker">QUALITY TOOL</p>
        <h1>Evaluate the whisk after preparation.</h1>
        <p>
          Product photography is not enough. Use this checklist for supplier samples,
          trade trials or your own comparison.
        </p>
      </section>
      <section className="checklist-wrap">
        <QualityChecklist />
        <p className="checklist-note">
          This is a working commercial-quality checklist, not an official certification standard.
        </p>
        <Link className="text-link" href="/journal/sauna-whisk-quality-checklist">Read the full quality guide →</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
