import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sauna Whisk Materials",
  description: "Explore birch, oak and eucalyptus sauna whisk materials and how they differ.",
  alternates: { canonical: "/materials" }
};

const materials = [
  ["/materials/birch", "Birch", "Soft, leafy and the classic starting point."],
  ["/materials/oak", "Oak", "Broader leaves and a denser, firmer ritual feel."],
  ["/materials/eucalyptus", "Eucalyptus", "Aroma-led and distinctive rather than the traditional Baltic benchmark."],
  ["/materials/linden", "Linden", "A softer future assortment material."],
  ["/materials/juniper", "Juniper", "Textured and resinous; a specialist future material."],
  ["/materials/maple", "Maple", "A broad-leaf future assortment candidate."],
  ["/materials/herbal", "Herbal mixes", "Mixed botanical bundles built around aroma."],
  ["/materials/mixed-whisks", "Mixed whisks", "Multi-species whisks with layered character."]
];

export default function MaterialsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">MATERIALS</p>
        <h1>The branch changes the ritual.</h1>
        <p>
          Species, leaf shape, harvest and preservation all affect how a whisk feels and behaves.
        </p>
      </section>

      <section className="materials-hub">
        {materials.map(([href, title, copy], index) => (
          <Link href={href} key={href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>View material →</b>
          </Link>
        ))}
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">COMPARE</p>
        <h2>Material is only one variable.</h2>
        <p>
          Fresh versus dried condition, branch selection, tying, storage and preparation can matter just as much as species.
        </p>
        <Link className="text-link" href="/compare">Compare birch, oak and eucalyptus →</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
