import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhiskFinder } from "@/components/WhiskFinder";

export const metadata = pageMetadata({
  title: "Sauna Whisk Finder",
  description: "A simple three-question tool to choose between birch, oak, eucalyptus and the Discovery Trio.",
  canonical: "/finder",
});

export default function FinderPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Whisk finder" }]} />
      <section className="page-hero compact-hero">
        <p className="section-kicker">WHISK FINDER</p>
        <h1>Choose by feel, not jargon.</h1>
        <p>This is a simple product-navigation tool, not a medical or therapeutic recommendation.</p>
      </section>
      <WhiskFinder />
    </>
  );
}
