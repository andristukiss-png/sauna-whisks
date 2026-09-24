import { StructuredData } from "@/components/StructuredData";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { faqTopics, featuredFaqs } from "@/lib/faqTopics";


export const metadata = pageMetadata({
  title: "Sauna Whisk FAQ",
  description: "Answers to common questions about sauna whisks, venik, vihta, vasta, birch, oak, preparation and shipping.",
  canonical: "/faq",
});

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: featuredFaqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <StructuredData data={schema} />
      <section className="page-hero">
        <p className="section-kicker">FAQ</p>
        <h1>Start with the questions.</h1>
        <p>Short answers to the things people usually need to know before choosing or using a sauna whisk.</p>
      </section>
      <section className="faq-topic-grid">
        {faqTopics.map((topic) => (
          <Link prefetch={false} href={"/faq/topic/" + topic.slug} key={topic.slug}>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <b>Browse topic →</b>
          </Link>
        ))}
      </section>
      <section className="faq-list">
        {featuredFaqs.map(([question, answer], index) => (
          <details key={question}>
            <summary><span aria-hidden="true">0{index + 1}</span><b>{question}</b><i aria-hidden="true">+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
