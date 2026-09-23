import site from "@/config/site.json";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${site.origin}/sitemap.xml`,
    host: site.origin,
  };
}
