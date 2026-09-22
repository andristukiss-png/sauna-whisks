import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sauna Whisks for Beginners",
  description: "A beginner path through choosing, preparing and using a sauna whisk.",
  alternates: { canonical: "/beginners" }
};

const steps = [
  ["/journal/what-is-a-sauna-whisk", "Understand the tool", "Start with what a sauna whisk is and why it is used."],
  ["/compare", "Choose a material", "Compare birch, oak and eucalyptus by feel and aroma."],
  ["/journal/how-to-prepare-dried-sauna-whisk", "Prepare it properly", "Learn the conservative rehydration process for a dried whisk."],
  ["/journal/how-to-use-a-sauna-whisk", "Use it gently", "Begin with moving heat, brushing and controlled contact."]
];

export default function BeginnersPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">BEGIN HERE</p>
        <h1>Your first sauna whisk.</h1>
        <p>
          You do not need to learn every regional term before using one. Start with material,
          preparation and a simple technique.
        </p>
      </section>

      <section className="path-grid">
        {steps.map(([href, title, copy], index) => (
          <Link href={href} key={href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Read guide →</b>
          </Link>
        ))}
      </section>

      <section className="editorial-band">
        <p className="section-kicker light">FIRST PRODUCT</p>
        <h2>Birch is the easiest benchmark.</h2>
        <p>
          If you want to compare materials immediately, the planned Discovery Trio combines birch, oak and eucalyptus.
        </p>
        <div className="editorial-actions">
          <Link className="button button-light" href="/shop/baltic-birch">View birch</Link>
          <Link className="text-link" href="/shop/discovery-trio">View Discovery Trio →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
