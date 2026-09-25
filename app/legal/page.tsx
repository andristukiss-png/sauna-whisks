import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Legal & Policies",
  description: "Legal, privacy, cookie, returns and accessibility information for SaunaWhisks.com.",
  canonical: "/legal",
});

const links = [
  ["/terms", "Website terms", "Rules for using the current pre-launch website and enquiry service."],
  ["/privacy", "Privacy notice", "What personal data is processed, why, and the rights available to you."],
  ["/cookies", "Cookie notice", "Current cookie and tracking position, including future consent requirements."],
  ["/returns", "Returns & refunds", "Current no-sales position and the commercial policy that must exist before checkout."],
  ["/shipping", "Shipping & availability", "Market-by-market launch and shipping status."],
  ["/accessibility", "Accessibility", "Accessibility approach and the contact path for reporting barriers."],
  ["/editorial-policy", "Editorial policy", "How factual, cultural, regulatory and commercial claims are sourced."],
  ["/corrections", "Corrections", "How to report factual, source or product-data errors."]
] as const;

export default function LegalPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }]} />
      <section className="page-hero">
        <p className="section-kicker">LEGAL & POLICIES</p>
        <h1>Clear rules before commerce.</h1>
        <p>
          These documents describe the current pre-launch website, enquiry service, privacy position and the policies that will support commercial launch.
        </p>
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">CURRENT LEGAL STATUS</p>
        <h2>Checkout is disabled.</h2>
        <p>
          SaunaWhisks.com does not currently accept online payment or create online orders. The formal seller/controller legal name,
          registration number, business address and VAT details have not yet been published and must be completed before commercial checkout opens.
        </p>
        <p>
          Current legal and privacy contact: <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.
        </p>
      </section>

      <section className="legal-hub">
        {links.map(([href, title, copy]) => (
          <Link href={href} key={href}>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Read →</b>
          </Link>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">CONSUMER & DATA RIGHTS</p>
        <h2>Latvia and European Union rules apply where relevant.</h2>
        <p>
          Before online sales open, the commercial checkout flow and sales terms will be reviewed against applicable Latvian and European Union
          distance-selling, consumer-information and data-protection requirements.
        </p>
        <div className="support-links">
          <a href="https://www.ptac.gov.lv/en/distance-trading" target="_blank" rel="noreferrer">
            Latvia Consumer Rights Protection Centre — distance trading ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="https://www.dvi.gov.lv/en/rights-data-subject" target="_blank" rel="noreferrer">
            Latvia Data State Inspectorate — privacy rights ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
