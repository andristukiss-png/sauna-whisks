export type MaterialKnowledge = {
  slug: string;
  name: string;
  latin: string;
  status: "Core launch material" | "Future assortment";
  summary: string;
  feel: string;
  aroma: string;
  notes: string[];
  relatedProduct?: string;
};

export const materialKnowledge: MaterialKnowledge[] = [
  { slug: "birch", name: "Birch", latin: "Betula", status: "Core launch material", summary: "The classic soft, leafy reference point for traditional sauna whisking.", feel: "Soft and flexible", aroma: "Fresh forest / birch", notes: ["Best first comparison material", "Strong Finnish and Baltic tradition", "Quality depends heavily on harvest and drying"], relatedProduct: "/shop/baltic-birch" },
  { slug: "oak", name: "Oak", latin: "Quercus", status: "Core launch material", summary: "A broader-leafed, denser material for a firmer ritual feel.", feel: "Firm and substantial", aroma: "Earthy / woody", notes: ["Broad leaves move air effectively", "Common in banya and Baltic assortments", "Species should be disclosed when verified"], relatedProduct: "/shop/latvian-oak" },
  { slug: "eucalyptus", name: "Eucalyptus", latin: "Eucalyptus", status: "Core launch material", summary: "An aroma-led whisk material with a distinctive contemporary sauna profile.", feel: "Light to medium", aroma: "Strong and cooling", notes: ["Aroma-first option", "Origin matters", "Useful in mixed botanical products"], relatedProduct: "/shop/eucalyptus" },
  { slug: "linden", name: "Linden", latin: "Tilia", status: "Future assortment", summary: "A softer traditional leaf material seen in Baltic and sauna-specialist assortments.", feel: "Soft", aroma: "Mild botanical", notes: ["Future catalog candidate", "Needs supplier testing", "Origin and species should be documented"] },
  { slug: "juniper", name: "Juniper", latin: "Juniperus", status: "Future assortment", summary: "A more textured aromatic material that needs clear preparation and use guidance.", feel: "Textured", aroma: "Resinous / conifer", notes: ["Not the same experience as leafy birch", "Preparation matters", "Future specialist product"] },
  { slug: "maple", name: "Maple", latin: "Acer", status: "Future assortment", summary: "A broad-leaf material appearing in specialist whisk assortments.", feel: "Medium", aroma: "Mild", notes: ["Future assortment candidate", "Requires supplier comparison", "Natural variation should be expected"] },
  { slug: "herbal", name: "Herbal mixes", latin: "Mixed botanicals", status: "Future assortment", summary: "Mixed leafy and aromatic plant bundles built around scent and ritual variety.", feel: "Varies", aroma: "Varies by recipe", notes: ["Ingredients must be listed clearly", "No vague medicinal claims", "Batch consistency needs testing"] },
  { slug: "mixed-whisks", name: "Mixed whisks", latin: "Mixed species", status: "Future assortment", summary: "Whisks combining two or more woody or leafy materials for a blended ritual character.", feel: "Varies by mix", aroma: "Layered", notes: ["Every species should be disclosed", "Useful for discovery products", "Preparation must suit the most delicate material"] }
];

export function getMaterialKnowledge(slug: string) {
  return materialKnowledge.find((item) => item.slug === slug);
}
