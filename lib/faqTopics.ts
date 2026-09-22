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
  },
  {
    slug: "quality",
    title: "Quality & verification",
    description: "Questions about provenance, sample testing and what makes a commercial whisk trustworthy.",
    items: [
      ["What does verified origin mean?", "It means the harvest or production location is supported by supplier or batch information rather than inferred from the seller's address."],
      ["Why test leaf retention?", "A dry product photo cannot show how well leaves stay attached after correct preparation and normal use."],
      ["Do natural whisks have to be identical?", "No. Natural variation is expected, but dimensions, construction and prepared performance should still fall within a useful commercial range."],
      ["Why publish unknown fields?", "Leaving a field pending is more trustworthy than filling it with an unsupported heritage or origin claim."]
    ]
  },
  {
    slug: "suppliers",
    title: "Suppliers & producers",
    description: "Questions from producers interested in supplying SaunaWhisks.com.",
    items: [
      ["What supplier information do you need?", "Origin, material, preservation condition, typical dimensions, preparation, capacity, packaging and available export documentation."],
      ["Do you require samples?", "Yes. Commercial evaluation should include representative prepared samples rather than photos alone."],
      ["Can small producers contact you?", "Yes. Capacity and MOQ should simply be stated clearly so the right commercial format can be assessed."],
      ["Will producer names be public?", "Where commercial agreements and verification allow it, named producer information is preferred over anonymous sourcing."]
    ]
  },
  {
    slug: "launch",
    title: "Launch & pre-launch status",
    description: "Questions about why checkout is disabled and what has to happen before commercial sales open.",
    items: [
      ["Why is checkout disabled?", "Supplier, product, import, fulfilment, legal and payment gates are still being verified."],
      ["Can I reserve a product?", "An enquiry does not create a reservation or order. Commercial ordering will open only when the relevant market and SKU are ready."],
      ["Are the displayed prices final?", "No. Displayed prices are planned pre-launch prices in USD and may change after landed-cost validation."],
      ["How will I know when a market opens?", "Market and shipping pages will be updated when a product can actually be sold and fulfilled there."]
    ]
  }
];

export function getFAQTopic(slug: string) {
  return faqTopics.find((topic) => topic.slug === slug);
}
