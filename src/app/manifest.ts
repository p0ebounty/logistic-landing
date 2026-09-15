import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MagnaQore Logistic",
    short_name: "MagnaQore",
    description: "AI sales department for US and Canadian logistics companies.",
    start_url: "/",
    display: "browser",
    background_color: "#0a1d2a",
    theme_color: "#0a1d2a",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
