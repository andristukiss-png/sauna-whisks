import { saunaWhisks } from "@/lib/products";

export function GET() {
  return Response.json({
    status: "pre-launch",
    currency: "USD",
    products: saunaWhisks.map((whisk) => ({
      slug: whisk.slug,
      name: whisk.name,
      material: whisk.material,
      botanicalGroup: whisk.latin,
      origin: whisk.origin,
      character: whisk.character,
      description: whisk.description,
      plannedPrice: whisk.plannedPrice,
      status: whisk.status,
      plannedCondition: whisk.plannedCondition,
      verification: whisk.verification,
      availableForPurchase: whisk.availableForPurchase,
      url: `https://saunawhisks.com/shop/${whisk.slug}`,
    })),
    bundle: {
      slug: "discovery-trio",
      name: "Discovery Trio",
      includes: ["Baltic Birch", "Baltic Oak", "Eucalyptus"],
      plannedPrice: "$69",
      availableForPurchase: false,
      url: "https://saunawhisks.com/shop/discovery-trio",
    },
  });
}
