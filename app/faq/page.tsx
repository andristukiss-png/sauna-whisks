import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import Link from "next/link";
import { faqTopics } from "@/lib/faqTopics";

const faqs = [
  ["What is a sauna whisk?", "A tied bundle of leafy branches used to move warm air, release plant aroma and work with the body during sauna bathing."],
  ["Is a sauna whisk the same as a venik?", "They are closely related objects, but 'venik' belongs specifically to banya terminology and tradition. We use sauna whisk as the broad English category term."],
  ["What is the difference between vihta and vasta?", "Both are Finnish words for the sauna whisk. Which word is used depends largely on regional language and dialect."],
  ["Should I start with birch or oak?", "Birch is the classic first reference point and generally feels softer. Oak is broader, denser and usually firmer."],
  ["Can a dried whisk be reused?", "Sometimes, depending on product quality, preparation and how heavily it is used. We will publish product-specific guidance rather than promise a fixed number of sessions."],
  ["Why do leaves fall off?", "Some shedding is normal. Heavy shedding can be influenced by harvest quality, drying, storage, transport, soaking temperature and aggressive use."],
  ["Do you ship to the United States?", "US sales are planned, but plant-product admissibility and documentation will be confirmed before commercial launch."],
  ["Are your products made in Latvia?", "The brand is Latvia-based. Final product pages will state the verified harvest and production origin of each individual whisk."]
];

export const metadata = {
  title: "Sauna Whisk FAQ",
  description: "Answers to common questions about sauna whisks, venik, vihta, vasta, birch, oak, preparation and shipping.",
  alternates: { canonical: "/faq" }
};

export default function FAQPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
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
        {faqs.map(([question, answer], index) => (
          <details key={question}>
            <summary><span>0{index + 1}</span><b>{question}</b><i>+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
