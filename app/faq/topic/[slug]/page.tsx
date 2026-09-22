import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { faqTopics, getFAQTopic } from "@/lib/faqTopics";

export function generateStaticParams() {
  return faqTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getFAQTopic(slug);
  if (!topic) return {};
  return pageMetadata({
    title: `${topic.title} FAQ`,
    description: topic.description,
    canonical: `/faq/topic/${topic.slug}`,
  });
}

export default async function FAQTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getFAQTopic(slug);
  if (!topic) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: topic.items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "FAQ", href: "/faq" },
        { label: topic.title }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">FAQ TOPIC</p>
        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
      </section>
      <section className="faq-list">
        {topic.items.map(([question, answer], index) => (
          <details key={question}>
            <summary><span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><i>+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
