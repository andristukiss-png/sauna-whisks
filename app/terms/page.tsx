import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Pre-launch website terms for SaunaWhisks.com.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <article className="legal-page">
        <p className="section-kicker">TERMS</p>
        <h1>Website terms</h1>

        <section>
          <h2>Pre-launch status</h2>
          <p>
            SaunaWhisks.com is currently a pre-launch information and enquiry website.
            Product descriptions, planned prices and shipping information may change before commercial sales open.
          </p>
        </section>

        <section>
          <h2>No order is created by an enquiry</h2>
          <p>
            Sending a message through the website does not create an order, reservation, contract or obligation to supply a product.
          </p>
        </section>

        <section>
          <h2>Product information</h2>
          <p>
            Natural products vary. Final botanical identity, origin, harvest, dimensions, preservation method and preparation instructions
            will be published for commercial products when verified.
          </p>
        </section>

        <section>
          <h2>Educational content</h2>
          <p>
            Articles and guides are general educational material. Product-specific preparation instructions supplied with a purchased item
            should take priority over general site guidance.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href="mailto:info@SaunaWhisks.com">info@SaunaWhisks.com</a>.
          </p>
        </section>

        <p className="legal-note">
          These are interim pre-launch terms. Formal seller identity, governing law, consumer rights and checkout terms will be completed before sales open.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
