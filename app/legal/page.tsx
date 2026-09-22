import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Legal & Policies",
  description: "Legal, privacy, returns, cookie and accessibility information for SaunaWhisks.com.",
  alternates: { canonical: "/legal" }
};

const links = [
  ["/privacy", "Privacy", "How enquiry information is handled."],
  ["/terms", "Website terms", "Pre-launch website and product-information terms."],
  ["/returns", "Returns & refunds", "Pre-launch policy and future commercial expectations."],
  ["/cookies", "Cookies", "Current minimal tracking position."],
  ["/accessibility", "Accessibility", "Accessibility approach and contact path."],
  ["/shipping", "Shipping & availability", "Market status and pre-launch shipping policy."],
  ["/editorial-policy", "Editorial policy", "Source hierarchy and factual-review approach."],
  ["/corrections", "Corrections", "How factual and product-data corrections are handled."]
];

export default function LegalPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal" }]} />
      <section className="page-hero">
        <p className="section-kicker">LEGAL & POLICIES</p>
        <h1>Clear before checkout.</h1>
        <p>Current pre-launch policies and the documents that will become the foundation for commercial terms.</p>
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
      <SiteFooter />
    </main>
  );
}
