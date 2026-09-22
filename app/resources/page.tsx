import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Resources",
  description: "SaunaWhisks.com learning, source, policy and public-data resources.",
  alternates: { canonical: "/resources" }
};

const sections = [
  ["/learn", "Learn", "Structured paths through materials, care, traditions and terminology."],
  ["/journal", "Journal", "Long-form source-backed guides."],
  ["/glossary", "Glossary", "Sauna-whisk terminology and regional language."],
  ["/sources", "Sources", "External sources referenced in educational content."],
  ["/data", "Public data", "Read-only JSON, CSV and feed endpoints."],
  ["/site-map", "Site map", "Human-readable navigation index."],
  ["/faq", "FAQ", "Common buyer, care, shipping and trade questions."],
  ["/status", "Launch status", "Current pre-launch commercial status."],
  ["/templates", "Templates", "Supplier, product-data and trade-trial downloads."]
];

export default function ResourcesPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
      <section className="page-hero">
        <p className="section-kicker">RESOURCES</p>
        <h1>Find the useful part quickly.</h1>
        <p>Learning, source transparency, public data and operational status in one place.</p>
      </section>

      <section className="hub-grid">
        {sections.map(([href,title,copy], index) => (
          <Link href={href} key={href}>
            <span>{String(index + 1).padStart(2,"0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Open →</b>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
