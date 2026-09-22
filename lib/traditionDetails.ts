export type TraditionDetail = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  principles: string[];
  terminology: string[];
  related: Array<{ label: string; href: string }>;
};

export const traditionDetails: TraditionDetail[] = [
  {
    slug: "latvian-pirts",
    name: "Latvian pirts",
    region: "Latvia",
    summary: "A plant-centered bathhouse tradition in which heat, steam, water, touch and seasonal botanicals form a wider ritual practice.",
    principles: ["Plants are part of a larger ritual, not decoration", "Heat and steam are managed deliberately", "A pirtnieks may guide the experience", "Local and seasonal material knowledge matters"],
    terminology: ["pirts", "pirtnieks", "whisking", "botanicals"],
    related: [{ label: "Latvian pirts guide", href: "/journal/latvian-pirts-tradition" }, { label: "Pirts glossary", href: "/glossary/pirts" }]
  },
  {
    slug: "finnish-vihta-vasta",
    name: "Finnish vihta / vasta",
    region: "Finland",
    summary: "The Finnish birch-whisk tradition, with vihta and vasta used as regional words for the same broad sauna tool.",
    principles: ["Birch is the classic reference material", "Freshness and branch quality matter", "Dried and frozen preservation can extend availability", "Preparation should protect flexibility and leaves"],
    terminology: ["vihta", "vasta", "löyly", "birch"],
    related: [{ label: "Venik, vihta or vasta?", href: "/journal/venik-vihta-vasta" }, { label: "Birch material", href: "/materials/birch" }]
  },
  {
    slug: "banya-venik",
    name: "Banya venik",
    region: "Eastern European / banya traditions",
    summary: "A bathhouse whisk tradition widely associated with the term venik and commonly using birch, oak and other leafy materials.",
    principles: ["Whisking may be more vigorous", "Birch and oak are well-known materials", "The tool works with heat and steam, not against them", "Technique belongs to a wider bathhouse context"],
    terminology: ["venik", "birch", "oak", "banya"],
    related: [{ label: "Venik glossary", href: "/glossary/venik" }, { label: "Birch vs oak", href: "/journal/birch-vs-oak-sauna-whisk" }]
  },
  {
    slug: "baltic-sauna-whisks",
    name: "Baltic sauna whisks",
    region: "Latvia / Lithuania / Estonia",
    summary: "A broad commercial and cultural category connecting local woody plants, herbs, seasonal production and sauna/bathhouse use across the Baltic region.",
    principles: ["Material variety is wider than birch alone", "Seasonality shapes production", "Dried whisks support year-round use", "Origin and producer transparency can differentiate premium supply"],
    terminology: ["sauna whisk", "birch", "oak", "linden"],
    related: [{ label: "Materials hub", href: "/materials" }, { label: "Product standards", href: "/standards" }]
  }
];

export function getTraditionDetail(slug: string) {
  return traditionDetails.find((item) => item.slug === slug);
}
