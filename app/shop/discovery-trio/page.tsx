import { StructuredData } from "@/components/StructuredData";
import site from "@/config/site.json";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { discoveryTrio, getDiscoveryTrioProducts } from "@/lib/bundles";

export const metadata = pageMetadata({
  title: "Sauna Whisk Discovery Trio",
  description: "Planned three-whisk bundle with birch, oak and eucalyptus for comparing the main sauna whisk materials.",
  canonical: "/shop/discovery-trio",
});

const items = getDiscoveryTrioProducts().map((product) => [product.name, product.character] as const);

export default function DiscoveryTrioPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Sauna Whisk ${discoveryTrio.name}`,
    description: "Planned three-whisk bundle with birch, oak and eucalyptus.",
    brand: { "@type": "Brand", name: site.name },
    category: "Sauna whisk bundle",
    url: `${site.origin}/shop/${discoveryTrio.slug}`
  };

  return (
    <main>
      <StructuredData data={productSchema} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Discovery Trio" }
      ]} />

      <section className="bundle-detail">
        <div className="bundle-detail-art">
          <div><LeafMark /><LeafMark /><LeafMark /></div>
          <div><LeafMark /><LeafMark /><LeafMark /></div>
          <div><LeafMark /><LeafMark /><LeafMark /></div>
        </div>

        <div className="bundle-detail-copy">
          <p className="section-kicker">DISCOVERY / 3 WHISKS</p>
          <h1>Three forests.<br />One ritual.</h1>
          <p className="detail-character">Birch · Oak · Eucalyptus</p>
          <p className="detail-description">
            The planned first-order bundle for people who want to understand the difference
            between the classic soft whisk, the denser oak feel and an aroma-led eucalyptus experience.
          </p>

          <div className="detail-meta">
            <div><span>Includes</span><b>{discoveryTrio.productSlugs.length} sauna whisks</b></div>
            <div><span>Planned launch price</span><b>{discoveryTrio.plannedPrice}</b></div>
            <div><span>Status</span><b>{discoveryTrio.status}</b></div>
          </div>

          <a className="button button-dark" href="#trio-enquiry">Ask about the Discovery Trio</a>
          <p className="fineprint">
            Exact origin, harvest, dimensions and final price will be confirmed before orders open.
          </p>
        </div>
      </section>

      <section className="trio-breakdown">
        <p className="section-kicker">WHAT YOU COMPARE</p>
        <h2>Feel the material difference.</h2>
        <div>
          {items.map(([name, copy], index) => (
            <article key={name}>
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <Link href="/compare" className="text-link">Compare all materials →</Link>
      </section>

      <section className="product-enquiry" id="trio-enquiry">
        <p className="section-kicker">BUNDLE ENQUIRY</p>
        <h2>Interested in the first release?</h2>
        <p>Ask about launch timing, shipping plans or trade quantities.</p>
        <EnquiryForm
          subject="SaunaWhisks.com enquiry — Discovery Trio"
          topics={["Availability / launch timing", "Shipping / country", "Gift / personal use", "Wholesale / trade", "Product specification", "Other"]}
          messagePlaceholder="Tell us what you would like to know about the Discovery Trio..."
        />
      </section>

      <SiteFooter />
    </main>
  );
}
