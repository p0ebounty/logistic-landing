// JSON-LD for search engines. Every node describes content that is actually on the page.
import { EXAMPLE_REPORT_PATH, reportMeta } from "@/content/example-report"
import { OVERVIEW_VIDEO_ID, SITE_URL, overview, pricing } from "@/content/landing"

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const SERVICE_ID = `${SITE_URL}/#service`

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "MagnaQore",
  url: "https://magnaqore.io",
  logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
  sameAs: ["https://magnaqore.io"],
}

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "MagnaQore Logistic",
  publisher: { "@id": ORGANIZATION_ID },
  inLanguage: "en-US",
}

const usd = (value: string) => value.replace(/[^0-9.]/g, "")

export function landingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "AI sales department for logistics companies",
        description: overview.thesis,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": SERVICE_ID },
        primaryImageOfPage: `${SITE_URL}/opengraph-image`,
        inLanguage: "en-US",
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "MagnaQore Logistic",
        serviceType: "AI sales department for logistics companies",
        description:
          "AI calling, automatic lead rating, 24-hour follow-ups, tender deadline tracking, a unified CRM and analytics dashboards for US and Canadian logistics companies.",
        provider: { "@id": ORGANIZATION_ID },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
        ],
        audience: { "@type": "BusinessAudience", audienceType: "Logistics companies, freight brokers and carriers" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: pricing.agent.title,
          itemListElement: pricing.agent.rows.map((row) => ({
            "@type": "Offer",
            name: `${row.period}: ${row.included}`,
            price: usd(row.cost),
            priceCurrency: "USD",
          })),
        },
      },
      {
        "@type": "VideoObject",
        name: "MagnaQore Logistic overview",
        description: overview.thesis,
        thumbnailUrl: [`https://i.ytimg.com/vi/${OVERVIEW_VIDEO_ID}/hqdefault.jpg`],
        uploadDate: "2026-01-03T13:00:40-08:00",
        duration: "PT22M28S",
        embedUrl: `https://www.youtube.com/embed/${OVERVIEW_VIDEO_ID}`,
        contentUrl: `https://www.youtube.com/watch?v=${OVERVIEW_VIDEO_ID}`,
      },
    ],
  }
}

export function reportJsonLd() {
  const url = `${SITE_URL}${EXAMPLE_REPORT_PATH}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MagnaQore Logistic", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Example report", item: url },
        ],
      },
      {
        "@type": "Report",
        "@id": `${url}#report`,
        url,
        name: `${reportMeta.title}: ${reportMeta.client.toLowerCase()}`,
        description:
          "Results of a 5-week AI lead generation campaign: 20,000 leads parsed, 383 qualified leads, $156,228 saved against a traditional team with paid ads.",
        temporalCoverage: "2024-09-10/2024-10-13",
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@id": WEBSITE_ID },
        image: `${url}/opengraph-image`,
        inLanguage: "en-US",
      },
    ],
  }
}

/** Safe for dangerouslySetInnerHTML: escapes "<" so the payload cannot close the script tag. */
export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, "\\u003c")
