import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articleTopics, getArticleTopic, getTopicArticles } from "@/lib/articleTopics";

export function generateStaticParams() {
  return articleTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getArticleTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — Sauna Whisk Journal`,
    description: topic.description,
    alternates: { canonical: `/journal/topic/${topic.slug}` }
  };
}

export default async function JournalTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getArticleTopic(slug);
  if (!topic) notFound();
  const topicArticles = getTopicArticles(slug);

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Journal", href: "/journal" },
        { label: "Topics", href: "/journal/topics" },
        { label: topic.title }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">JOURNAL TOPIC</p>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
      </section>
      <section className="topic-article-list">
        {topicArticles.map((article, index) => article ? (
          <Link href={"/journal/" + article.slug} key={article.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p>{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <em>{article.description}</em>
            </div>
            <b>{article.readTime} →</b>
          </Link>
        ) : null)}
      </section>
      <SiteFooter />
    </main>
  );
}
