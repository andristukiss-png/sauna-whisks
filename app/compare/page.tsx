import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { comparisons } from "@/lib/comparisons";

export const metadata = pageMetadata({
  title: "Birch vs Oak vs Eucalyptus Sauna Whisks",
  description: "Compare birch, oak and eucalyptus sauna whisks by feel, aroma, ritual character and who each material suits.",
  canonical: "/compare",
});

const rows = [
  ["Feel", "Soft / leafy", "Firm / dense", "Light / aromatic"],
  ["Aroma", "Classic forest", "Earthy / woody", "Strong / cooling"],
  ["Best for", "First whisk", "Stronger ritual", "Aroma-focused use"],
  ["Leaf shape", "Small / flexible", "Broad / substantial", "Long / narrow"],
  ["Ritual style", "Traditional benchmark", "Fuller body work", "Fragrance-driven"],
];

export default function ComparePage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <section className="page-hero">
        <p className="section-kicker">COMPARE MATERIALS</p>
        <h1>Birch, oak or eucalyptus?</h1>
        <p>
          The right choice is less about “best” and more about the kind of sauna ritual you want.
        </p>
      </section>

      <section className="compare-wrap">
        <div className="compare-table-scroll">
          <table className="compare-table">
            <caption className="sr-only">Sauna whisk material comparison</caption>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Attribute</span></th>
                <th scope="col">Birch</th>
                <th scope="col">Oak</th>
                <th scope="col">Eucalyptus</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, birch, oak, eucalyptus]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{birch}</td>
                  <td>{oak}</td>
                  <td>{eucalyptus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="compare-summary">
          <article>
            <span>01</span>
            <h2>Choose birch first</h2>
            <p>Birch is the easiest reference point for understanding what a traditional sauna whisk feels like.</p>
            <Link className="text-link" href="/shop/baltic-birch">View Baltic Birch →</Link>
          </article>
          <article>
            <span>02</span>
            <h2>Choose oak for body</h2>
            <p>Oak is broader, denser and usually better suited to people who want a firmer tool.</p>
            <Link className="text-link" href="/shop/baltic-oak">View Baltic Oak →</Link>
          </article>
          <article>
            <span>03</span>
            <h2>Choose eucalyptus for aroma</h2>
            <p>Eucalyptus is the most fragrance-led option in the launch collection.</p>
            <Link className="text-link" href="/shop/eucalyptus">View Eucalyptus →</Link>
          </article>
        </div>
      </section>

      <section className="comparison-index">
        <p className="section-kicker">MORE COMPARISONS</p>
        <div>
          {comparisons.map((item) => (
            <Link href={"/compare/" + item.slug} key={item.slug}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <b>Compare →</b>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
