import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Sauna Whisks",
    short_name: "Sauna Whisks",
    description: "Sauna whisk knowledge, terminology, care and traditions from a Latvia-based specialist brand.",
    start_url: "/",
    scope: "/",
    lang: "en",
    display: "standalone",
    background_color: "#f1eee5",
    theme_color: "#203629",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
