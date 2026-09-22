import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sourcing & Product Standards",
  description:
    "The sourcing, botanical, harvest and product information SaunaWhisks.com intends to publish for every sauna whisk.",
  alternates: { canonical: "/standards" }
};

const standards = [
  ["Botanical identity", "Species or botanical group wherever the producer can verify it."],
  ["Country of origin", "Where the plant material was harvested, not merely where the parcel was shipped from."],
  ["Producer", "Named producer or production partner when commercial agreements allow publication."],
  ["Condition", "Fresh, dried, frozen or otherwise preserved — never left ambiguous."],
  ["Harvest", "Season or harvest date when the supplier can document it."],
  ["Dimensions", "Approximate length, weight and natural variation."],
  ["Preparation", "Product-specific preparation instructions based on condition and supplier testing."],
  ["Import status", "Commercial launch only after required import and plant-product rules are checked for the destination market."]
];

export default function StandardsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">OUR STANDARD</p>
        <h1>Branches need provenance too.</h1>
        <p>
          A premium sauna whisk should tell you more than “natural birch.” Our goal is to make origin, condition and preparation understandable before purchase.
        </p>
      </section>
      <section className="standards-grid">
        {standards.map(([title, copy], index) => (
          <article key={title}>
            <span>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="knowledge-copy">
        <p className="section-kicker">A WORKING STANDARD</p>
        <h2>We will publish what we can verify.</h2>
        <p>
          This standard will evolve as suppliers, import requirements and product testing become more concrete. We would rather leave a field blank than create heritage or harvest claims we cannot support.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
