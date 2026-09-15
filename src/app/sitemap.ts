import type { MetadataRoute } from "next"

import { EXAMPLE_REPORT_PATH } from "@/content/example-report"
import { SITE_URL } from "@/content/landing"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}${EXAMPLE_REPORT_PATH}`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ]
}
