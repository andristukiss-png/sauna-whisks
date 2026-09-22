export type OperationGuide = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: Array<{ title: string; copy: string }>;
};

export const operationGuides: OperationGuide[] = [
  {
    slug: "provenance",
    title: "Product provenance",
    eyebrow: "ORIGIN",
    description: "How SaunaWhisks.com intends to document where plant material came from and who produced the finished whisk.",
    sections: [
      { title: "Harvest origin", copy: "Country and, where verifiable, region of harvest should be distinguished from the warehouse or export location." },
      { title: "Producer identity", copy: "The producer or production partner should be recorded internally and published where agreements allow it." },
      { title: "Condition", copy: "Fresh, dried, frozen, vacuum-packed or another preservation method should never be hidden behind a generic 'natural' label." },
      { title: "Evidence first", copy: "If a harvest date, botanical species or origin cannot be supported, the field should remain unclaimed until it can." }
    ]
  },
  {
    slug: "product-testing",
    title: "Product testing",
    eyebrow: "QUALITY",
    description: "The working test framework for comparing real sauna whisks before commercial launch.",
    sections: [
      { title: "Leaf retention", copy: "Observe shedding during correct soaking, warming and normal use rather than judging a dry whisk only by appearance." },
      { title: "Flexibility", copy: "Branches and tying should remain usable after preparation without becoming brittle or uncomfortably rigid." },
      { title: "Aroma", copy: "Record aroma character after preparation without making medical or therapeutic claims." },
      { title: "Preparation repeatability", copy: "Instructions should produce a usable result consistently across several samples from the same supplier batch." }
    ]
  },
  {
    slug: "harvest-season",
    title: "Harvest & season",
    eyebrow: "SEASONALITY",
    description: "Why traditional plant products cannot be treated like an endlessly manufactured accessory.",
    sections: [
      { title: "Season matters", copy: "Leaf maturity and branch condition change through the year, so traditional production is tied to a harvest window." },
      { title: "Batch records", copy: "Commercial products should eventually record harvest season or date where the supplier can document it." },
      { title: "Inventory planning", copy: "A year-round dried-whisk business still depends on purchasing and preserving enough seasonal production." },
      { title: "No invented vintage", copy: "Harvest storytelling should only be used when the date and origin are genuinely known." }
    ]
  },
  {
    slug: "packaging",
    title: "Packaging standard",
    eyebrow: "PACKAGING",
    description: "A working packaging brief for protecting leaves while keeping the product understandable and efficient to ship.",
    sections: [
      { title: "Protect the leaves", copy: "Packaging should reduce crushing and uncontrolled moisture while avoiding unnecessary bulk." },
      { title: "Explain preparation", copy: "Every consumer pack should include concise condition-specific preparation guidance." },
      { title: "Show provenance", copy: "Origin, material, condition and batch information should be visible rather than buried in marketing copy." },
      { title: "Design for bundles", copy: "Packaging dimensions should make two- and three-whisk orders more efficient than shipping each item independently." }
    ]
  },
  {
    slug: "import-compliance",
    title: "Import compliance",
    eyebrow: "MARKET ACCESS",
    description: "The pre-launch rule: never assume a plant product can enter a destination simply because it is dried.",
    sections: [
      { title: "SKU by SKU", copy: "Species, condition, origin and destination can all affect import requirements, so each commercial SKU needs its own check." },
      { title: "Documents", copy: "Supplier documentation, treatment records or phytosanitary requirements may matter depending on the product and destination." },
      { title: "No de minimis assumptions", copy: "Small parcels should not be treated as automatically exempt from agricultural admissibility rules." },
      { title: "Publish only cleared markets", copy: "Shipping availability should be shown only after the relevant import path is understood." }
    ]
  },
  {
    slug: "product-specifications",
    title: "Product specifications",
    eyebrow: "SPECIFICATION",
    description: "The data fields that should turn a natural whisk into a professionally merchandised product.",
    sections: [
      { title: "Material", copy: "Common name and botanical identity where it can be verified." },
      { title: "Physical specification", copy: "Approximate length, weight and natural tolerance rather than a false promise of identical handmade pieces." },
      { title: "Origin & condition", copy: "Harvest origin, production origin and preservation method should be separate fields." },
      { title: "Use & care", copy: "Preparation, storage and expected natural variation should be part of the product specification." }
    ]
  }
];

export function getOperationGuide(slug: string) {
  return operationGuides.find((guide) => guide.slug === slug);
}
