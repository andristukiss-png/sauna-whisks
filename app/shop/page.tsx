import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";
import { saunaWhisks } from "@/lib/products";

export const metadata = {
  title: "Shop Sauna Whisks",
  description: "Explore birch, oak and eucalyptus sauna whisks selected for traditional sauna ritual.",
  alternates: { canonical: "/shop" }
};

export default function ShopPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sauna Whisks collection",
    itemListElement: saunaWhisks.map((whisk, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: whisk.name,
      url: `https://saunawhisks.com/shop/${whisk.slug}`
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <section className="page-hero">
        <p className="section-kicker">THE COLLECTION</p>
        <h1>Choose your whisk.</h1>
        <p>
          A focused collection built around material, origin and ritual character —
          not an anonymous wall of products.
        </p>
      </section>

      <section className="shop-tools">
        <Link href="/finder"><span>Not sure?</span><b>Use the whisk finder →</b></Link>
        <Link href="/checklist"><span>Comparing samples?</span><b>Open quality checklist →</b></Link>
      </section>
      <p className="shop-price-note">All displayed prices are planned pre-launch prices in USD. Shipping, taxes and duties are not included.</p>
      <section className="catalog-grid">
        {saunaWhisks.map((whisk, index) => (
          <article className="catalog-card" key={whisk.slug}>
            <div className={"catalog-art product-art-" + (index % 3)}>
              <LeafMark />
              <LeafMark />
              <LeafMark />
            </div>
            <div className="catalog-status-row">
              <p className="product-latin">{whisk.latin.toUpperCase()} · {whisk.character.toUpperCase()}</p>
              <span>{whisk.status}</span>
            </div>
            <h2>{whisk.name}</h2>
            <p>{whisk.description}</p>
            <div className="catalog-bottom">
              <strong>{whisk.plannedPrice}</strong>
              <Link href={"/shop/" + whisk.slug}>View whisk →</Link>
            </div>
          </article>
        ))}
      </section>

      <section className="shop-bundle-feature">
        <div>
          <p className="section-kicker">DISCOVERY TRIO</p>
          <h2>Try the three core materials.</h2>
          <p>
            Birch + oak + eucalyptus in one planned bundle, built for first-time comparison
            and more efficient shipping.
          </p>
        </div>
        <div className="shop-bundle-price">
          <strong>US$69</strong>
          <span>planned launch price</span>
          <Link href="/shop/discovery-trio" className="button button-dark">View Discovery Trio</Link>
        </div>
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
