import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sauna Whisks",
    short_name: "Sauna Whisks",
    description: "Traditional sauna whisks and Baltic sauna knowledge from Latvia.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1eee5",
    theme_color: "#203629",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
