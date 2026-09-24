import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { articleTopics } from "@/lib/articleTopics";

export const metadata = pageMetadata({
  title: "Journal Topics",
  description: "Browse SaunaWhisks.com guides by foundations, materials, care, traditions and terminology.",
  canonical: "/journal/topics",
});

export default function JournalTopicsPage() {
  return (
    <>
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
    </>
  );
}
