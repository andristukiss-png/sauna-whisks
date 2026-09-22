export type Comparison = {
  slug: string;
  title: string;
  description: string;
  left: { name: string; points: string[] };
  right: { name: string; points: string[] };
  conclusion: string;
  related: Array<{ label: string; href: string }>;
};

export const comparisons: Comparison[] = [
  {
    slug: "birch-vs-oak",
    title: "Birch vs oak sauna whisks",
    description: "A direct comparison of the two most familiar leafy whisk materials.",
    left: { name: "Birch", points: ["Softer leaf contact", "Classic first whisk", "Fresh forest aroma", "Traditional Finnish/Baltic reference"] },
    right: { name: "Oak", points: ["Broader leaves", "Firmer, denser feel", "Earthier profile", "Strong banya/Baltic association"] },
    conclusion: "Choose birch for the classic softer benchmark; choose oak when you want a fuller, firmer tool.",
    related: [{ label: "Baltic Birch", href: "/shop/baltic-birch" }, { label: "Baltic Oak", href: "/shop/baltic-oak" }]
  },
  {
    slug: "birch-vs-eucalyptus",
    title: "Birch vs eucalyptus sauna whisks",
    description: "Traditional benchmark versus aroma-led material.",
    left: { name: "Birch", points: ["Traditional reference", "Soft and leafy", "Subtle forest aroma", "Good first whisk"] },
    right: { name: "Eucalyptus", points: ["Aroma-forward", "Distinctive scent", "Different leaf structure", "Contemporary discovery option"] },
    conclusion: "Choose birch to learn traditional whisking; choose eucalyptus when aroma is the primary reason for the product.",
    related: [{ label: "Baltic Birch", href: "/shop/baltic-birch" }, { label: "Eucalyptus", href: "/shop/eucalyptus" }]
  },
  {
    slug: "oak-vs-eucalyptus",
    title: "Oak vs eucalyptus sauna whisks",
    description: "Firm broad-leaf contact versus aroma-led eucalyptus.",
    left: { name: "Oak", points: ["Dense feel", "Broad leaf contact", "Earthy/woody profile", "Stronger physical character"] },
    right: { name: "Eucalyptus", points: ["Aromatic focus", "Lighter feel", "Distinct scent", "Useful in mixed discovery sets"] },
    conclusion: "Oak is the physical-feel choice; eucalyptus is the aroma-first choice.",
    related: [{ label: "Baltic Oak", href: "/shop/baltic-oak" }, { label: "Eucalyptus", href: "/shop/eucalyptus" }]
  },
  {
    slug: "fresh-vs-dried",
    title: "Fresh vs dried sauna whisks",
    description: "Seasonal immediacy versus year-round storage and distribution.",
    left: { name: "Fresh", points: ["Seasonal", "Naturally flexible", "Short storage life", "Best close to source"] },
    right: { name: "Dried", points: ["Year-round inventory", "Needs rehydration", "Easier ecommerce logistics", "Storage conditions still matter"] },
    conclusion: "Fresh is the traditional seasonal reference; dried is the practical format for international ecommerce.",
    related: [{ label: "Full fresh vs dried guide", href: "/journal/fresh-vs-dried-sauna-whisks" }, { label: "Care hub", href: "/care" }]
  },
  {
    slug: "single-vs-bundle",
    title: "Single whisk vs discovery bundle",
    description: "One known material versus a side-by-side learning experience.",
    left: { name: "Single whisk", points: ["Lower initial spend", "Best if material preference is known", "Simple preparation", "Useful refill format"] },
    right: { name: "Discovery bundle", points: ["Compare materials", "Better shipping efficiency", "Gift-friendly", "Useful first purchase"] },
    conclusion: "Buy a single whisk when you already know what you want; use a bundle when learning the category.",
    related: [{ label: "Shop singles", href: "/shop" }, { label: "Discovery Trio", href: "/shop/discovery-trio" }]
  }
];

export function getComparison(slug: string) {
  return comparisons.find((item) => item.slug === slug);
}
