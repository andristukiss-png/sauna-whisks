export type SaunaWhisk = {
  slug: string;
  name: string;
  latin: string;
  material: string;
  origin: string;
  character: string;
  description: string;
  preparation: string[];
  plannedPrice: string;
};

export const saunaWhisks: SaunaWhisk[] = [
  {
    slug: "baltic-birch",
    name: "Baltic Birch",
    latin: "Betula",
    material: "Birch",
    origin: "Baltic region",
    character: "Soft, aromatic, traditional",
    description:
      "The classic sauna whisk. Birch leaves create a soft, fragrant ritual and are often the easiest starting point for people new to whisking.",
    preparation: [
      "Rinse gently before soaking.",
      "Soak in cool-to-warm water until the branches become flexible.",
      "Warm gradually in the sauna before use.",
      "Avoid boiling water, which can damage dried leaves."
    ],
    plannedPrice: "$24"
  },
  {
    slug: "latvian-oak",
    name: "Latvian Oak",
    latin: "Quercus",
    material: "Oak",
    origin: "Latvia / Baltic region",
    character: "Firm, broad-leafed, enduring",
    description:
      "Oak offers a fuller, denser feel than birch. Its broad leaves move heat effectively and suit sauna users who prefer a stronger ritual.",
    preparation: [
      "Rinse gently before soaking.",
      "Give oak slightly more soaking time than birch.",
      "Warm in the sauna before use.",
      "Use controlled, rhythmic movements rather than striking hard."
    ],
    plannedPrice: "$28"
  },
  {
    slug: "eucalyptus",
    name: "Eucalyptus",
    latin: "Eucalyptus",
    material: "Eucalyptus",
    origin: "Selected producer",
    character: "Aromatic, cooling, vivid",
    description:
      "A highly aromatic whisk for sauna users who want a strong botanical scent and a more contemporary ritual experience.",
    preparation: [
      "Rinse before soaking.",
      "Soak gently to protect the leaves.",
      "Let the sauna heat release the aroma gradually.",
      "Use lightly around the face and upper body."
    ],
    plannedPrice: "$29"
  }
];

export function getWhisk(slug: string) {
  return saunaWhisks.find((whisk) => whisk.slug === slug);
}
