import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { articleTopics } from "@/lib/articleTopics";

export const metadata = {
  title: "Journal Topics",
  description: "Browse SaunaWhisks.com guides by foundations, materials, care, traditions and terminology.",
  alternates: { canonical: "/journal/topics" }
};

export default function JournalTopicsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">JOURNAL TOPICS</p>
        <h1>Learn by subject.</h1>
        <p>Use topic collections when you want a path through the library rather than a keyword search.</p>
      </section>
      <section className="topic-grid">
        {articleTopics.map((topic, index) => (
          <Link href={"/journal/topic/" + topic.slug} key={topic.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <b>{topic.slugs.length} guides →</b>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
