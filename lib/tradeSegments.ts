export type TradeSegment = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  needs: string[];
  offer: string[];
  topic: string;
};

export const tradeSegments: TradeSegment[] = [
  {
    slug: "public-saunas",
    name: "Public Saunas & Bathhouses",
    headline: "Recurring whisks for venues that actually use them.",
    summary: "Public saunas and bathhouses need consistent stock, straightforward preparation and predictable replenishment rather than novelty retail packs.",
    needs: ["Reliable recurring supply", "Clear preparation instructions", "Venue-friendly pack sizes", "Consistent product condition"],
    offer: ["Case quantities", "Core birch/oak assortment", "Staff preparation guidance", "Future recurring-order programs"],
    topic: "Public sauna trade enquiry"
  },
  {
    slug: "hotels-spas",
    name: "Hotels & Spas",
    headline: "Traditional ritual without operational confusion.",
    summary: "Hotels and spas need a product that staff can explain, prepare and use consistently while still feeling authentic.",
    needs: ["Simple staff instructions", "Guest-friendly storytelling", "Reliable quality", "Clean presentation"],
    offer: ["Ritual bundles", "Staff guides", "Trade cartons", "Future gifting formats"],
    topic: "Hotel and spa trade enquiry"
  },
  {
    slug: "retailers",
    name: "Sauna & Wellness Retailers",
    headline: "A category customers can understand on the shelf.",
    summary: "Specialist retailers need clear differentiation between birch, oak and aromatic materials plus product pages that support customer education.",
    needs: ["Consumer-ready packaging", "Material comparison", "Retail margin", "Educational assets"],
    offer: ["Retail packs", "Discovery bundles", "Product education", "Future wholesale portal"],
    topic: "Retailer trade enquiry"
  },
  {
    slug: "sauna-builders",
    name: "Sauna Builders",
    headline: "Add ritual to the sauna handover.",
    summary: "Builders can introduce whisking at the moment a customer receives a new sauna, when education and accessory selection are most relevant.",
    needs: ["Easy add-on bundle", "Simple explanation", "Gift-ready presentation", "Reliable fulfilment"],
    offer: ["Starter bundles", "Builder packs", "Educational inserts", "Future co-marketing options"],
    topic: "Sauna builder trade enquiry"
  },
  {
    slug: "wellness-clubs",
    name: "Wellness & Recovery Clubs",
    headline: "Bring traditional sauna ritual into modern recovery spaces.",
    summary: "Contrast-therapy and recovery clubs can use whisks as a guided ritual product rather than a passive accessory.",
    needs: ["Staff education", "Operational cleanliness", "Reliable replenishment", "Guest-safe instructions"],
    offer: ["Venue packs", "Beginner ritual guides", "Core dried products", "Future demonstration content"],
    topic: "Wellness club trade enquiry"
  },
  {
    slug: "distributors",
    name: "Distributors",
    headline: "Build regional supply with documented products.",
    summary: "Distribution only makes sense once origin, SKU consistency, packaging, landed cost and market compliance are stable.",
    needs: ["Volume pricing", "Stable specifications", "Documentation", "Forecastable production"],
    offer: ["Future pallet/case programs", "Product data", "Market-specific documentation", "Regional partnership discussions"],
    topic: "Distributor trade enquiry"
  }
];

export function getTradeSegment(slug: string) {
  return tradeSegments.find((segment) => segment.slug === slug);
}
