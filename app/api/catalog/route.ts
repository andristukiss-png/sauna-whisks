import site from "@/config/site.json";
import { saunaWhisks } from "@/lib/products";
import { discoveryTrio, getDiscoveryTrioNames } from "@/lib/bundles";
import { launchStatus } from "@/lib/status";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({
    status: launchStatus.status,
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
      url: `${site.origin}/shop/${whisk.slug}`,
    })),
    bundle: {
      slug: discoveryTrio.slug,
      name: discoveryTrio.name,
      includes: getDiscoveryTrioNames(),
      plannedPrice: discoveryTrio.plannedPrice,
      status: discoveryTrio.status,
      availableForPurchase: discoveryTrio.availableForPurchase,
      url: `${site.origin}/shop/${discoveryTrio.slug}`,
    },
  });
}
