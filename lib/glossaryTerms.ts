export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  context: string;
  related: Array<{ label: string; href: string }>;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "sauna-whisk",
    term: "Sauna whisk",
    definition: "An English umbrella term for a tied bundle of leafy branches used during sauna bathing.",
    context: "The term is useful internationally because it describes the tool without replacing regional words such as vihta, vasta or venik.",
    related: [{ label: "What is a sauna whisk?", href: "/journal/what-is-a-sauna-whisk" }, { label: "Shop", href: "/shop" }]
  },
  {
    slug: "sauna-broom",
    term: "Sauna broom",
    definition: "A secondary English term used for the same broad product category as a sauna whisk.",
    context: "The term appears in English-language listings and searches. SaunaWhisks.com uses sauna whisk as the primary category name while treating sauna broom as a useful search synonym.",
    related: [{ label: "Sauna whisk definition", href: "/glossary/sauna-whisk" }, { label: "Whisk vs sauna broom", href: "/journal/sauna-whisk-vs-sauna-broom" }]
  },
  {
    slug: "pirts",
    term: "Pirts",
    definition: "The Latvian bathhouse tradition and practice involving heat, steam, water, touch and extensive use of plants.",
    context: "Pirts is broader than a single product. Whisks belong inside a wider botanical and ritual practice.",
    related: [{ label: "Latvian pirts guide", href: "/journal/latvian-pirts-tradition" }, { label: "Traditions", href: "/traditions" }]
  },
  {
    slug: "pirtnieks",
    term: "Pirtnieks",
    definition: "A Latvian pirts practitioner who guides or performs pirts ritual work.",
    context: "The role may involve heat management, whisking, plant knowledge and other elements of the pirts experience.",
    related: [{ label: "Latvian pirts guide", href: "/journal/latvian-pirts-tradition" }]
  },
  {
    slug: "vihta",
    term: "Vihta",
    definition: "One Finnish word for the traditional sauna whisk, commonly associated with birch.",
    context: "Vihta and vasta refer to the same broad sauna object; regional language usage differs within Finland.",
    related: [{ label: "Venik, vihta or vasta?", href: "/journal/venik-vihta-vasta" }]
  },
  {
    slug: "vasta",
    term: "Vasta",
    definition: "Another Finnish word for the traditional sauna whisk.",
    context: "The distinction between vihta and vasta is linguistic and regional rather than a completely different product category.",
    related: [{ label: "Venik, vihta or vasta?", href: "/journal/venik-vihta-vasta" }]
  },
  {
    slug: "venik",
    term: "Venik",
    definition: "The widely recognized term in banya culture for a leafy bath whisk.",
    context: "Birch and oak are among the best-known venik materials. Technique and ritual context can differ from Finnish or Latvian traditions.",
    related: [{ label: "Venik, vihta or vasta?", href: "/journal/venik-vihta-vasta" }, { label: "Traditions", href: "/traditions" }]
  },
  {
    slug: "loyly",
    term: "Löyly",
    definition: "A Finnish word associated with the heat and steam experience created in the sauna when water meets hot stones.",
    context: "The concept matters to whisking because the whisk can move heated, humid air toward the body.",
    related: [{ label: "How to use a sauna whisk", href: "/journal/how-to-use-a-sauna-whisk" }]
  },
  {
    slug: "birch",
    term: "Birch",
    definition: "The classic reference material for many Northern European sauna-whisk traditions.",
    context: "Birch is generally soft and aromatic, making it a useful first material for comparing other whisk types.",
    related: [{ label: "Birch Sauna Whisk", href: "/shop/baltic-birch" }, { label: "Birch vs oak", href: "/journal/birch-vs-oak-sauna-whisk" }]
  },
  {
    slug: "oak",
    term: "Oak",
    definition: "A broad-leafed whisk material that generally creates a denser, firmer tool than birch.",
    context: "Oak is commonly associated with banya use and is also found across Baltic sauna-whisk assortments.",
    related: [{ label: "Oak Sauna Whisk", href: "/shop/baltic-oak" }, { label: "Compare materials", href: "/compare" }]
  },
  {
    slug: "eucalyptus",
    term: "Eucalyptus",
    definition: "An aromatic plant material used for sauna whisks and mixed botanical bundles.",
    context: "Eucalyptus is best understood as an aroma-led option rather than the traditional birch benchmark.",
    related: [{ label: "Eucalyptus Sauna Whisk", href: "/shop/eucalyptus" }, { label: "Compare materials", href: "/compare" }]
  },
  {
    slug: "dried-whisk",
    term: "Dried whisk",
    definition: "A sauna whisk preserved by drying so it can be stored and used outside the fresh harvest season.",
    context: "Dried whisks need gradual rehydration before use. Correct storage and preparation strongly affect leaf retention.",
    related: [{ label: "Prepare a dried whisk", href: "/journal/how-to-prepare-dried-sauna-whisk" }, { label: "Fresh vs dried", href: "/journal/fresh-vs-dried-sauna-whisks" }]
  },
  {
    slug: "fresh-whisk",
    term: "Fresh whisk",
    definition: "A newly harvested sauna whisk used close to the production season without drying.",
    context: "Fresh whisks are the traditional seasonal reference but are much harder to distribute internationally.",
    related: [{ label: "Fresh vs dried", href: "/journal/fresh-vs-dried-sauna-whisks" }, { label: "Harvest & season", href: "/operations/harvest-season" }]
  }
];

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find((item) => item.slug === slug);
}
