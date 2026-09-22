export type LaunchStatusItem = {
  area: string;
  status: "In development" | "Open" | "Researching" | "Disabled";
  description: string;
};

export const launchStatus = {
  status: "pre-launch" as const,
  checkoutEnabled: false,
  enquiriesOpen: true,
  sourceOfTruth: "GitHub main",
  contact: "info@SaunaWhisks.com",
  items: [
    {
      area: "Brand & website",
      status: "In development",
      description: "Core website, education, enquiry and product architecture are built.",
    },
    {
      area: "Supplier verification",
      status: "Open",
      description: "Producer, product and batch documentation still needs commercial verification.",
    },
    {
      area: "Import compliance",
      status: "Researching",
      description: "Destination-market checks are required before plant products are offered for sale.",
    },
    {
      area: "Fulfilment",
      status: "Open",
      description: "Warehouse, packaging and shipping processes are not final.",
    },
    {
      area: "Payments",
      status: "Disabled",
      description: "Checkout remains intentionally off until product and fulfilment gates are complete.",
    },
    {
      area: "Customer enquiries",
      status: "Open",
      description: "Pre-launch product, supplier, trade and market enquiries are accepted.",
    },
  ] satisfies LaunchStatusItem[],
};
