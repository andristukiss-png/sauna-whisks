import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sauna Whisk Care",
  description: "Preparation, storage, reuse and troubleshooting guides for sauna whisks.",
  alternates: { canonical: "/care" }
};

const guides = [
  ["/journal/how-to-prepare-dried-sauna-whisk", "Prepare a dried whisk", "Rehydrate slowly before the sauna."],
  ["/journal/how-to-store-sauna-whisks", "Store it correctly", "Protect leaves from heat, moisture and crushing."],
  ["/journal/how-long-does-a-sauna-whisk-last", "Understand reuse", "There is no honest fixed session count."],
  ["/journal/why-sauna-whisk-leaves-fall-off", "Troubleshoot leaf loss", "Some shedding is normal; heavy shedding deserves investigation."]
];

export default function CarePage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Care" }]} />
      <section className="page-hero">
        <p className="section-kicker">CARE</p>
        <h1>Keep the leaves on the branch.</h1>
        <p>
          Preparation and storage have a large effect on how a natural whisk performs.
        </p>
      </section>

      <section className="path-grid">
        {guides.map(([href, title, copy], index) => (
          <Link href={href} key={href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Read guide →</b>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
