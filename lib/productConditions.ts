export type ProductCondition = {
  slug: string;
  name: string;
  status: "Core ecommerce format" | "Local / seasonal" | "Specialist format" | "Under investigation";
  summary: string;
  advantages: string[];
  constraints: string[];
  preparation: string;
  related: Array<{ label: string; href: string }>;
};

export const productConditions: ProductCondition[] = [
  {
    slug: "dried",
    name: "Dried sauna whisks",
    status: "Core ecommerce format",
    summary: "The most practical working format for year-round inventory and international ecommerce.",
    advantages: ["Shelf-stable compared with fresh", "No cold chain", "Supports seasonal inventory building", "Works well in bundles"],
    constraints: ["Needs rehydration", "Leaf retention depends on drying/storage", "Packaging must prevent crushing"],
    preparation: "Rehydrate gradually using product-specific instructions before warming and use.",
    related: [{ label: "Prepare a dried whisk", href: "/journal/how-to-prepare-dried-sauna-whisk" }, { label: "Dried-whisk glossary", href: "/glossary/dried-whisk" }]
  },
  {
    slug: "fresh",
    name: "Fresh sauna whisks",
    status: "Local / seasonal",
    summary: "The traditional seasonal reference, best suited to local or very short distribution chains.",
    advantages: ["Naturally flexible", "No drying/reconstitution step", "Strong connection to harvest season"],
    constraints: ["Short shelf life", "Seasonal", "Hard international logistics", "Potential plant-import complexity"],
    preparation: "Use promptly and follow producer guidance; protect from heat and poor storage before use.",
    related: [{ label: "Fresh birch guide", href: "/journal/fresh-birch-sauna-whisk-guide" }, { label: "Fresh vs dried", href: "/journal/fresh-vs-dried-sauna-whisks" }]
  },
  {
    slug: "frozen",
    name: "Frozen sauna whisks",
    status: "Specialist format",
    summary: "A preservation route that aims to retain a fresh-style product but requires frozen storage and transport.",
    advantages: ["Preserves a fresh-format whisk", "Extends availability beyond immediate harvest", "Traditional preservation method"],
    constraints: ["Cold-chain logistics", "Freezer storage", "More difficult cross-border fulfilment"],
    preparation: "Thaw fully according to producer guidance before sauna use.",
    related: [{ label: "How to freeze a whisk", href: "/journal/how-to-freeze-sauna-whisk" }, { label: "Storage guide", href: "/journal/how-to-store-sauna-whisks" }]
  },
  {
    slug: "vacuum-packed",
    name: "Vacuum-packed / preserved whisks",
    status: "Under investigation",
    summary: "A potentially useful commercial format that requires supplier-specific validation of preservation, shelf life and import treatment.",
    advantages: ["Potentially compact", "May preserve a fresher condition", "Interesting for premium products"],
    constraints: ["Process varies by supplier", "Shelf life must be verified", "Import treatment may differ from dried products"],
    preparation: "Use only the instructions provided for the exact preservation process and supplier.",
    related: [{ label: "Product standards", href: "/standards" }, { label: "Import compliance", href: "/operations/import-compliance" }]
  }
];

export function getProductCondition(slug: string) {
  return productConditions.find((item) => item.slug === slug);
}
