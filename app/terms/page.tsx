import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Website Terms",
  description: "Website-use and pre-launch terms for SaunaWhisks.com.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <article className="legal-page">
        <p className="section-kicker">WEBSITE TERMS</p>
        <h1>Terms for using SaunaWhisks.com</h1>
        <p className="legal-note">Last updated: 25 September 2026</p>

        <section>
          <h2>1. Scope</h2>
          <p>
            These terms govern use of SaunaWhisks.com. The site is currently a pre-launch information, education and enquiry website.
            These are website-use terms, not final consumer sales terms.
          </p>
        </section>

        <section>
          <h2>2. No online sales yet</h2>
          <p>
            Checkout is currently disabled and SaunaWhisks.com does not accept payment through the website.
            Product availability, planned prices, market availability, delivery information and commercial specifications may change before sales open.
          </p>
          <p>
            Sending an enquiry does not create an order, reservation, distance contract or obligation to supply a product.
          </p>
        </section>

        <section>
          <h2>3. Seller information before checkout</h2>
          <p>
            The final legal seller name, registration details, registered or business address, VAT information where applicable, and complete commercial
            contact information will be published before checkout is enabled. We will not treat a pre-launch enquiry as a substitute for the information
            required for an online consumer sale.
          </p>
        </section>

        <section>
          <h2>4. Product information</h2>
          <p>
            Sauna whisks are natural plant products and can vary in size, color, leaf density, aroma and appearance.
            Product origin, botanical identity, preservation method, dimensions, producer information and preparation instructions will be stated only
            to the level that has been verified for the commercial product.
          </p>
          <p>
            Planned prices and launch assumptions are clearly described as provisional and are not offers capable of acceptance while checkout is disabled.
          </p>
        </section>

        <section>
          <h2>5. Educational content</h2>
          <p>
            Articles, guides, comparison pages and cultural information are provided for general educational purposes.
            They are not medical advice, diagnosis or treatment and should not replace product-specific instructions or advice from an appropriately qualified professional.
          </p>
        </section>

        <section>
          <h2>6. Acceptable use</h2>
          <p>
            You may use the site for lawful personal, informational and business-enquiry purposes. You must not attempt to disrupt the site,
            bypass security controls, submit malicious code, abuse forms, scrape the site in a way that materially interferes with service,
            or use the site for unlawful or fraudulent activity.
          </p>
        </section>

        <section>
          <h2>7. Intellectual property</h2>
          <p>
            Unless otherwise stated, original site text, design, graphics, data presentation and branding are owned by or licensed for SaunaWhisks.com.
            You may link to public pages and quote limited excerpts with appropriate attribution, but you may not republish substantial parts of the site
            or use the Sauna Whisks brand in a way that suggests endorsement or affiliation without permission.
          </p>
        </section>

        <section>
          <h2>8. Third-party links and sources</h2>
          <p>
            The site links to external sources, regulators and third-party websites for reference. We do not control those external sites and are not
            responsible for their availability, security, content or privacy practices.
          </p>
        </section>

        <section>
          <h2>9. Site availability and liability</h2>
          <p>
            We aim to keep the site accurate and available, but we do not guarantee uninterrupted access or that every page will always be error-free.
            To the extent permitted by law, SaunaWhisks.com is not liable for indirect or consequential loss arising solely from use of this pre-launch
            informational website. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limits mandatory consumer rights.
          </p>
        </section>

        <section>
          <h2>10. Governing rules</h2>
          <p>
            SaunaWhisks.com is operated from Latvia. These website terms are intended to be interpreted under applicable Latvian and European Union law,
            while any mandatory rights available to a user or consumer remain unaffected.
          </p>
        </section>

        <section>
          <h2>11. Changes</h2>
          <p>
            We may update these terms when the site, legal operator details or commercial model changes. Material sales, payment, delivery, cancellation
            and returns terms will be published before checkout opens.
          </p>
        </section>

        <section>
          <h2>12. Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.
          </p>
        </section>
      </article>
    </>
  );
}
