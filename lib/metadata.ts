import site from "@/config/site.json";
import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  canonical,
  robots,
}: {
  title: string;
  description: string;
  canonical: string;
  robots?: Metadata["robots"];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(robots ? { robots } : {}),
  };
}
