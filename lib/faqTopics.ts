export type FAQTopic = {
  slug: string;
  title: string;
  description: string;
  items: Array<[string, string]>;
};

export const faqTopics: FAQTopic[] = [
  {
    slug: "choosing",
    title: "Choosing a sauna whisk",
    description: "Questions about materials, first purchases and bundles.",
    items: [
      ["What should a beginner buy first?", "Birch is the simplest traditional reference point. A mixed discovery bundle is useful if you want to compare materials immediately."],
      ["Birch or oak?", "Birch is generally softer; oak is broader and firmer. Choose by the feel you want rather than assuming one is universally better."],
      ["Why choose eucalyptus?", "Eucalyptus is primarily an aroma-led choice in the planned assortment."],
      ["Single whisk or bundle?", "A single whisk makes sense when you know your preference; a bundle is better for learning the category."]
    ]
  },
  {
    slug: "care",
    title: "Preparation & care",
    description: "Questions about soaking, storage, reuse and leaf loss.",
    items: [
      ["How do I prepare a dried whisk?", "Rehydrate it gradually in warm water according to the product-specific instructions rather than shocking brittle leaves with extreme heat."],
      ["Why are leaves falling off?", "Some shedding is natural. Heavy shedding can be affected by drying, storage, transport, preparation and use."],
      ["Can I reuse a whisk?", "Sometimes. Product condition and use intensity matter, so a fixed universal session count would be misleading."],
      ["How should I store it?", "Keep dried products protected from moisture, excess heat and crushing. Product-specific storage guidance will accompany commercial SKUs."]
    ]
  },
  {
    slug: "terminology",
    title: "Terminology",
    description: "Whisk, broom, venik, vihta, vasta and pirts explained.",
    items: [
      ["What is a sauna whisk?", "An English umbrella term for a leafy branch bundle used during sauna bathing."],
      ["Is a venik the same thing?", "Venik is the banya-context term for the related leafy bath whisk."],
      ["Vihta or vasta?", "Both are Finnish words for the sauna whisk; regional language usage differs."],
      ["What is pirts?", "Pirts is the Latvian bathhouse tradition and practice, broader than the whisk itself."]
    ]
  },
  {
    slug: "shipping",
    title: "Shipping & availability",
    description: "Questions about launch timing, countries and plant-product logistics.",
    items: [
      ["Are orders open?", "No. SaunaWhisks.com is still pre-launch and does not currently accept payment."],
      ["Will you ship to the US?", "The US is a priority market, but every commercial plant-product SKU must be checked before sales open."],
      ["Why not ship everywhere immediately?", "Plant-product rules, shipping cost, tax and fulfilment differ by country and product condition."],
      ["Can I ask about my country?", "Yes. Use the shipping enquiry form and tell us your country and product interest."]
    ]
  },
  {
    slug: "trade",
    title: "Trade & wholesale",
    description: "Questions for venues, retailers, builders and distributors.",
    items: [
      ["Do you have trade pricing?", "Not yet. Pricing will be finalized after supplier and landed-cost validation."],
      ["Can venues get recurring supply?", "Recurring venue supply is a core planned trade model."],
      ["Will there be retail packs?", "Consumer-ready retail packs are planned for specialist stockists."],
      ["Can distributors contact you?", "Yes. Distributor discussions are welcome, but volume programs will follow stable product specifications and compliance."]
    ]
  }
];

export function getFAQTopic(slug: string) {
  return faqTopics.find((topic) => topic.slug === slug);
}
