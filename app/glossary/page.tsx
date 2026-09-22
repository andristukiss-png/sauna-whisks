import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

const terms = [
  ["Sauna whisk", "English umbrella term for a tied bundle of leafy branches used during sauna bathing."],
  ["Pirts", "The Latvian bathhouse tradition and practice, involving heat, steam, water, touch and extensive use of plants."],
  ["Pirtnieks", "A Latvian pirts practitioner or professional who guides the ritual."],
  ["Vihta", "One Finnish word for a traditional sauna whisk, typically associated with birch."],
  ["Vasta", "Another Finnish word for the sauna whisk; usage varies by dialect and region."],
  ["Venik", "Widely used term in banya culture for a leafy bath whisk, commonly made from birch or oak."],
  ["Löyly", "Finnish word associated with the steam/heat experience created when water meets hot sauna stones."],
  ["Birch", "The classic reference material for many Northern European whisk traditions."],
  ["Oak", "A broad-leafed material that generally creates a firmer, denser whisk."],
  ["Dried whisk", "A whisk preserved by drying for storage and year-round use; it must be rehydrated before use."]
];

export const metadata = {
  title: "Sauna Whisk Glossary",
  description: "Definitions of sauna whisk, pirts, pirtnieks, venik, vihta, vasta and other sauna terms."
};

export default function GlossaryPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">GLOSSARY</p>
        <h1>The language of whisking.</h1>
        <p>
          A practical vocabulary for navigating Latvian pirts, Finnish sauna and banya terminology without mixing everything together.
        </p>
      </section>
      <section className="glossary">
        {terms.map(([term, definition], index) => (
          <div className="glossary-row" key={term}>
            <span>0{index + 1}</span>
            <h2>{term}</h2>
            <p>{definition}</p>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
