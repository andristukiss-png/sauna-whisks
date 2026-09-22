export type BuyerGuide = {
  slug: string;
  title: string;
  description: string;
  recommendation: string;
  reasons: string[];
  links: Array<{ label: string; href: string }>;
};

export const buyerGuides: BuyerGuide[] = [
  {
    slug: "first-sauna-whisk",
    title: "Your first sauna whisk",
    description: "A simple buying path for someone who has never used a whisk before.",
    recommendation: "Start with birch, or choose the Discovery Trio if you want to compare three materials immediately.",
    reasons: ["Birch is the easiest traditional reference point", "Soft leaves make the material easy to understand", "Preparation guidance is straightforward", "You can compare oak/eucalyptus later"],
    links: [{ label: "Baltic Birch", href: "/shop/baltic-birch" }, { label: "Beginner guide", href: "/beginners" }]
  },
  {
    slug: "home-sauna",
    title: "Sauna whisks for a home sauna",
    description: "How to choose a practical first assortment for personal use at home.",
    recommendation: "Prioritize dried products, clear preparation instructions and two- or three-whisk bundles rather than single-item international orders.",
    reasons: ["Dried whisks support year-round storage", "Bundles make shipping more efficient", "Birch and oak give a useful material contrast", "Care guidance matters for occasional users"],
    links: [{ label: "Discovery Trio", href: "/shop/discovery-trio" }, { label: "Care hub", href: "/care" }]
  },
  {
    slug: "sauna-gift",
    title: "Sauna whisks as a gift",
    description: "A gift-oriented approach for sauna owners who may not know whisking yet.",
    recommendation: "Use a comparison bundle with a short preparation guide instead of gifting one unexplained bundle of branches.",
    reasons: ["The recipient can compare materials", "Education reduces confusion", "A bundle feels intentional", "Preparation instructions make the product usable"],
    links: [{ label: "Discovery Trio", href: "/shop/discovery-trio" }, { label: "How to use a whisk", href: "/journal/how-to-use-a-sauna-whisk" }]
  },
  {
    slug: "traditional-birch",
    title: "Choosing a traditional birch whisk",
    description: "What to look for when your priority is the classic birch experience.",
    recommendation: "Focus on origin, condition, branch selection, tying and preparation rather than only price.",
    reasons: ["Birch quality varies by harvest and preservation", "Leaf retention matters in actual use", "The handle should be usable", "Origin should be documented when possible"],
    links: [{ label: "Baltic Birch", href: "/shop/baltic-birch" }, { label: "Birch material guide", href: "/materials/birch" }]
  },
  {
    slug: "oak-whisk",
    title: "Choosing an oak sauna whisk",
    description: "For sauna users who want a broader, denser and firmer whisk.",
    recommendation: "Choose oak when you specifically want more body and broader leaf contact than birch.",
    reasons: ["Broad leaves create a different feel", "Oak is a useful contrast to birch", "Species/origin should be disclosed", "Preparation still matters for dried products"],
    links: [{ label: "Baltic Oak", href: "/shop/baltic-oak" }, { label: "Birch vs oak", href: "/journal/birch-vs-oak-sauna-whisk" }]
  },
  {
    slug: "aromatic-whisk",
    title: "Choosing an aromatic sauna whisk",
    description: "For buyers who care most about botanical scent and aroma.",
    recommendation: "Eucalyptus is the clearest aroma-led option in the planned launch assortment.",
    reasons: ["Distinctive aroma profile", "Easy contrast with birch/oak", "Useful in discovery bundles", "Ingredients and origin still need clear labeling"],
    links: [{ label: "Eucalyptus", href: "/shop/eucalyptus" }, { label: "Eucalyptus material guide", href: "/materials/eucalyptus" }]
  },
  {
    slug: "pirts-inspired",
    title: "A pirts-inspired whisk selection",
    description: "A Latvia-rooted approach centered on plants, seasonality and wider ritual context.",
    recommendation: "Treat the whisk as part of a plant-centered pirts practice rather than a standalone novelty product.",
    reasons: ["Latvian pirts uses a wider botanical vocabulary", "Seasonality matters", "Technique is part of a larger ritual", "Producer knowledge adds value"],
    links: [{ label: "Latvian pirts tradition", href: "/traditions/latvian-pirts" }, { label: "Materials", href: "/materials" }]
  },
  {
    slug: "trade-trial",
    title: "Planning a first trade trial",
    description: "A low-risk way for a sauna business or retailer to evaluate sauna whisks before recurring supply.",
    recommendation: "Test a small mixed case, document preparation, leaf retention and guest/customer response, then decide on recurring quantities.",
    reasons: ["Reduces product-risk before volume orders", "Makes material preferences visible", "Creates staff familiarity", "Produces real reorder data"],
    links: [{ label: "Trade hub", href: "/trade" }, { label: "Wholesale enquiry", href: "/wholesale" }]
  }
];

export function getBuyerGuide(slug: string) {
  return buyerGuides.find((guide) => guide.slug === slug);
}
