import { getWhisk } from "@/lib/products";

export const discoveryTrio = {
  slug: "discovery-trio",
  name: "Discovery Trio",
  productSlugs: ["baltic-birch", "baltic-oak", "eucalyptus"] as const,
  plannedPrice: "US$69",
  status: "Pre-launch" as const,
  availableForPurchase: false as const,
};

export function getDiscoveryTrioProducts() {
  return discoveryTrio.productSlugs.map((slug) => {
    const product = getWhisk(slug);
    if (!product) {
      throw new Error("Discovery Trio references missing product: " + slug);
    }
    return product;
  });
}

export function getDiscoveryTrioNames() {
  return getDiscoveryTrioProducts().map((product) => product.name);
}
