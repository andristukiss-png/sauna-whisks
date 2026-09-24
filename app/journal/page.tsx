import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles } from "@/lib/articles";
import { JournalSearch } from "@/components/JournalSearch";

export const metadata = pageMetadata({
  title: "Sauna Whisk Journal",
  description: "Practical guides to sauna whisks, Latvian pirts, venik, vihta, vasta, materials, preparation and sauna traditions.",
  canonical: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      <section className="page-hero">
        <p className="section-kicker">THE SAUNA LIBRARY</p>
        <h1>Knowledge before commerce.</h1>
        <p>
          Materials, language, preparation and regional traditions — documented so a sauna whisk makes sense before you buy one.
        </p>
      </section>

      <div className="journal-topic-link">
        <Link className="text-link" href="/journal/topics">Browse by topic →</Link>
      </div>
      <JournalSearch items={articles.map(({ slug, title, eyebrow, description, readTime }) => ({
        slug, title, eyebrow, description, readTime
      }))} />
    </>
  );
}
