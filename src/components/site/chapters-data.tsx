import Link from "next/link"
import { ArrowRightIcon, FileChartColumnIcon } from "lucide-react"

import challengeCrm from "@/assets/images/challenge-crm.webp"
import productContactCard from "@/assets/images/product-contact-card.webp"
import productDashboard from "@/assets/images/product-dashboard.webp"
import productProgress from "@/assets/images/product-progress.webp"
import { Chapter, ChapterStep, ProblemBlock, ResultsBlock, SystemBlock, type Screen } from "@/components/site/chapter"
import { MarkerList, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { EXAMPLE_REPORT_PATH } from "@/content/example-report"
import { analytics, crm } from "@/content/landing"

const contactCardScreen: Screen = {
  image: productContactCard,
  alt: "A client card in MagnaQore Logistic with next steps, calls, contact details and what the system knows about the client",
  caption: crm.screenshotCaption,
}

const dashboardScreen: Screen = {
  image: productDashboard,
  alt: "The MagnaQore Logistic dashboard summary with calls, conversations, hot leads and a feed of important events",
  caption: "Summary: calls, conversations, hot leads and what happened today",
}

const progressScreen: Screen = {
  image: productProgress,
  alt: "Progress by segment in MagnaQore Logistic with processed, in-progress and handed-over leads and their ratings",
  caption: "Progress: how far each lead base is worked, with its rating mix",
}

export function CrmChapter() {
  return (
    <Chapter id={crm.id} title={crm.title} photo={challengeCrm} screens={[contactCardScreen]}>
      <ProblemBlock>
        {crm.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProblemBlock>
      <ChapterStep screen={contactCardScreen}>
        <div className="flex flex-col gap-8">
          <ol aria-label="One connected architecture" className="flex flex-wrap items-center gap-2.5">
            {crm.flow.map((step, index) => (
              <li key={step} className="flex items-center gap-2.5">
                <span className="rounded-full border border-asphalt px-5 py-2.5 font-heading text-base font-semibold stretch-112">
                  {step}
                </span>
                {index < crm.flow.length - 1 ? <ArrowRightIcon aria-hidden className="size-5 text-sodium-deep" /> : null}
              </li>
            ))}
          </ol>
          <SystemBlock title={crm.systemTitle} items={crm.system} />
        </div>
      </ChapterStep>
      <ResultsBlock title={crm.resultsTitle} items={crm.results} />
    </Chapter>
  )
}

function ProvidesBlock({ block }: { block: (typeof analytics.provides)[number] }) {
  return (
    <div className="rounded-[1.5rem] bg-paper-deep p-6 md:p-9">
      <h4 className={typeRole.title}>{block.title}</h4>
      {block.text ? <p className="mt-2">{block.text}</p> : null}
      <p className="mt-5 text-graphite">{block.listIntro}</p>
      <MarkerList tone="go" items={block.items} className="mt-3" />
      {block.outro ? <p className="mt-6 font-semibold text-go">{block.outro}</p> : null}
    </div>
  )
}

export function AnalyticsChapter() {
  const [strategic, savings] = analytics.provides
  return (
    <Chapter id={analytics.id} title={analytics.title} lead={analytics.lead} screens={[dashboardScreen, progressScreen]}>
      <ProblemBlock>
        {analytics.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="font-semibold">{analytics.consequencesTitle}</p>
        <MarkerList tone="stop" items={analytics.consequences} />
      </ProblemBlock>

      <ChapterStep screen={dashboardScreen}>
        <div>
          <h3 className="flex gap-3 font-heading text-base font-semibold text-go">
            <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-6 shrink-0 bg-go" />
            {analytics.providesTitle}
          </h3>
          <div className="mt-6">
            <ProvidesBlock block={strategic} />
          </div>
        </div>
      </ChapterStep>
      <ChapterStep screen={progressScreen}>
        <ProvidesBlock block={savings} />
      </ChapterStep>

      <ResultsBlock title={analytics.outcomeTitle} items={analytics.outcome} />

      <div className="flex flex-col items-start gap-5 rounded-[1.5rem] border border-border p-6 md:p-9">
        <p className="max-w-[40ch] font-heading text-lg leading-snug font-semibold">{analytics.reportLabel}</p>
        <Button asChild variant="outline" size="lg">
          <Link href={EXAMPLE_REPORT_PATH}>
            <FileChartColumnIcon data-icon="inline-start" aria-hidden />
            {analytics.reportAction}
          </Link>
        </Button>
      </div>
    </Chapter>
  )
}
