import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";
import { saunaWhisks } from "@/lib/products";

export const metadata = {
  title: "Shop Sauna Whisks",
  description: "Explore birch, oak and eucalyptus sauna whisks selected for traditional sauna ritual."
};

export default function ShopPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">THE COLLECTION</p>
        <h1>Choose your whisk.</h1>
        <p>
          A focused collection built around material, origin and ritual character —
          not an anonymous wall of products.
        </p>
      </section>

      <section className="catalog-grid">
        {saunaWhisks.map((whisk, index) => (
          <article className="catalog-card" key={whisk.slug}>
            <div className={"catalog-art product-art-" + (index % 3)}>
              <LeafMark />
              <LeafMark />
              <LeafMark />
            </div>
            <p className="product-latin">{whisk.latin.toUpperCase()} · {whisk.character.toUpperCase()}</p>
            <h2>{whisk.name}</h2>
            <p>{whisk.description}</p>
            <div className="catalog-bottom">
              <strong>{whisk.plannedPrice}</strong>
              <Link href={"/shop/" + whisk.slug}>View whisk →</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="editorial-band">
        <p className="section-kicker light">NOT SURE WHERE TO START?</p>
        <h2>Birch is the classic first whisk.</h2>
        <p>
          Oak feels firmer and fuller. Eucalyptus is the most aromatic.
          The eventual Discovery Trio is designed to let customers compare all three.
        </p>
        <div className="editorial-actions">
          <Link href="/compare" className="button button-light">Compare materials</Link>
          <Link href="/contact" className="text-link">Ask a question →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
