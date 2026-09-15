import type { Metadata } from "next"

import { ReportHeader } from "@/components/report/report-header"
import { ReportAiVsHuman, ReportResources, ReportSegments, ReportSummary } from "@/components/report/report-sections"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { SiteFooter } from "@/components/site/site-footer"
import { EXAMPLE_REPORT_PATH } from "@/content/example-report"
import { reportJsonLd, serializeJsonLd } from "@/lib/structured-data"
import { cn } from "@/lib/utils"

const title = "AI Lead Generation Report: $156K Saved, 744% ROI | MagnaQore"
const description =
  "Results of a 5-week AI lead generation campaign: 20,000 leads parsed, 383 qualified, $156,228 saved against a traditional team with paid ads."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: EXAMPLE_REPORT_PATH },
  openGraph: {
    type: "article",
    url: EXAMPLE_REPORT_PATH,
    siteName: "MagnaQore Logistic",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
}

export default function ExampleReportPage() {
  return (
    <>
      <ReportHeader />
      <main id="main">
        <ReportSummary />
        <ReportSegments />
        <ReportResources />
        <ReportAiVsHuman />
        <section aria-labelledby="report-cta-title" className="surface-ink">
          <div className="shell flex flex-col gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-24">
            <h2 id="report-cta-title" className={cn(typeRole.headline, "max-w-[20ch]")}>
              See what the system does with your leads
            </h2>
            <BookingLink />
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(reportJsonLd()) }} />
    </>
  )
}
