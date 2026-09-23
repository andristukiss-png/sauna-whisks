import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Trade Trial Plan",
  description: "A low-risk evaluation plan for venues and retailers testing sauna whisks before recurring supply.",
  canonical: "/trade/trial",
});

const steps = [
  ["Choose a mixed case", "Include at least two materials so preference becomes visible."],
  ["Standardize preparation", "Use the same soaking/warming instructions for comparable samples."],
  ["Record performance", "Track leaf retention, flexibility, preparation time and staff/customer response."],
  ["Review usage", "Measure how quickly stock is consumed and which material is actually preferred."],
  ["Decide reorder format", "Move to recurring supply only after real usage data exists."],
];

export default function TradeTrialPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Trade", href: "/trade" },
        { label: "Trial plan" }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">TRADE TRIAL</p>
        <h1>Test before committing to volume.</h1>
        <p>A small structured trial creates better reorder data than a large first order based on assumptions.</p>
      </section>

      <section className="requirements-list">
        {steps.map(([title,copy], index) => (
          <div key={title}>
            <span>{String(index+1).padStart(2,"0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </div>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">TRIAL TEMPLATE</p>
        <h2>Record the same fields every time.</h2>
        <div className="condition-related">
          <a href="/api/trade-trial-template.csv">Download trade-trial CSV →</a>
          <Link href="/wholesale">Start a wholesale enquiry →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
