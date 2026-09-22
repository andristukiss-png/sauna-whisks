import { articles } from "@/lib/articles";

export const articleTopics = [
  {
    slug: "foundations",
    title: "Foundations",
    description: "Start with what a sauna whisk is and how to use one.",
    slugs: ["what-is-a-sauna-whisk", "how-to-use-a-sauna-whisk"]
  },
  {
    slug: "materials",
    title: "Materials",
    description: "Birch, oak, eucalyptus and condition comparisons.",
    slugs: ["birch-vs-oak-sauna-whisk", "fresh-birch-sauna-whisk-guide", "fresh-vs-dried-sauna-whisks"]
  },
  {
    slug: "care",
    title: "Care & preparation",
    description: "Preparation, storage, reuse and troubleshooting.",
    slugs: [
      "how-to-prepare-dried-sauna-whisk",
      "how-to-store-sauna-whisks",
      "how-long-does-a-sauna-whisk-last",
      "why-sauna-whisk-leaves-fall-off",
      "common-dried-sauna-whisk-mistakes",
      "can-sauna-whisk-go-on-hot-stones"
    ]
  },
  {
    slug: "quality",
    title: "Quality & construction",
    description: "Dimensions, tying, handles, inspection and performance checks.",
    slugs: [
      "sauna-whisk-size-and-weight",
      "how-a-sauna-whisk-is-tied",
      "sauna-whisk-handle-quality",
      "sauna-whisk-quality-checklist",
      "inspect-sauna-whisk-before-use"
    ]
  },
  {
    slug: "preservation",
    title: "Preservation",
    description: "Drying, freezing, storage and product condition.",
    slugs: [
      "fresh-vs-dried-sauna-whisks",
      "how-to-freeze-sauna-whisk",
      "how-to-store-sauna-whisks",
      "how-to-prepare-dried-sauna-whisk"
    ]
  },
  {
    slug: "harvest",
    title: "Harvest & season",
    description: "Why growing season and harvest timing shape a natural sauna product.",
    slugs: ["sauna-whisk-seasonality", "fresh-birch-sauna-whisk-guide"]
  },
  {
    slug: "traditions",
    title: "Traditions",
    description: "Latvian pirts and wider sauna/banya context.",
    slugs: ["latvian-pirts-tradition", "venik-vihta-vasta"]
  },
  {
    slug: "terminology",
    title: "Terminology",
    description: "Whisk, broom, venik, vihta and vasta language.",
    slugs: ["sauna-whisk-vs-sauna-broom", "venik-vihta-vasta"]
  }
];

export function getArticleTopic(slug: string) {
  return articleTopics.find((topic) => topic.slug === slug);
}

export function getTopicArticles(slug: string) {
  const topic = getArticleTopic(slug);
  if (!topic) return [];
  return topic.slugs.map((articleSlug) => articles.find((article) => article.slug === articleSlug)).filter(Boolean);
}
