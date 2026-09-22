import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: "Accessibility statement for SaunaWhisks.com.",
  canonical: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility" }]} />
      <article className="legal-page">
        <p className="section-kicker">ACCESSIBILITY</p>
        <h1>Designed to be usable</h1>

        <section>
          <h2>Our approach</h2>
          <p>
            We aim to make SaunaWhisks.com usable with keyboard navigation, screen readers, zoom and reduced-motion preferences.
            The site is still being developed, so accessibility testing will continue as commerce features are added.
          </p>
        </section>

        <section>
          <h2>Current measures</h2>
          <p>
            The site uses semantic headings and landmarks, visible keyboard focus, descriptive link text, responsive layouts,
            accessible form labels and a skip-to-content link.
          </p>
        </section>

        <section>
          <h2>Report a problem</h2>
          <p>
            If something is difficult to use, email <a href="mailto:info@SaunaWhisks.com">info@SaunaWhisks.com</a> and describe the page and issue.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
