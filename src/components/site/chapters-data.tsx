import Link from "next/link"
import { ArrowRightIcon, FileChartColumnIcon } from "lucide-react"

import challengeCrm from "@/assets/images/challenge-crm.webp"
import productContactCard from "@/assets/images/product-contact-card.webp"
import productDashboard from "@/assets/images/product-dashboard.webp"
import productProgress from "@/assets/images/product-progress.webp"
import { Chapter, ProblemBlock, ResultsBlock, SystemBlock } from "@/components/site/chapter"
import { MarkerList } from "@/components/site/primitives"
import { ProductShot } from "@/components/site/product-shot"
import { Button } from "@/components/ui/button"
import { EXAMPLE_REPORT_PATH } from "@/content/example-report"
import { analytics, crm } from "@/content/landing"

export function CrmChapter() {
  return (
    <Chapter id={crm.id} title={crm.title} image={challengeCrm} imageSide="left" tone="warm">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ProblemBlock className="lg:col-span-5">
          {crm.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ProblemBlock>
        <div className="flex flex-col gap-8 lg:col-span-7">
          <ol aria-label="One connected architecture" className="flex items-center gap-2 sm:gap-3">
            {crm.flow.map((step, index) => (
              <li key={step} className="flex flex-1 items-center gap-2 sm:gap-3">
                <span className="flex h-14 flex-1 items-center justify-center rounded-lg bg-ink px-2 font-heading text-base font-semibold font-wide text-white sm:text-lg">
                  {step}
                </span>
                {index < crm.flow.length - 1 ? (
                  <ArrowRightIcon aria-hidden className="size-5 shrink-0 text-route" />
                ) : null}
              </li>
            ))}
          </ol>
          <SystemBlock title={crm.systemTitle} items={crm.system} />
        </div>
      </div>
      <ProductShot
        image={productContactCard}
        alt="A client card in MagnaQore Logistic with next steps, calls, contact details and what the system knows about the client"
        caption={crm.screenshotCaption}
      />
      <ResultsBlock title={crm.resultsTitle} items={crm.results} />
    </Chapter>
  )
}

export function AnalyticsChapter() {
  return (
    <Chapter id={analytics.id} title={analytics.title} lead={analytics.lead}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ProblemBlock className="lg:col-span-5">
          {analytics.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-semibold">{analytics.consequencesTitle}</p>
          <MarkerList tone="stop" items={analytics.consequences} />
        </ProblemBlock>

        <div className="lg:col-span-7">
          <h3 className="flex items-center gap-3 font-heading text-base font-semibold text-route">
            <span aria-hidden className="size-3 rounded-[2px] bg-route" />
            {analytics.providesTitle}
          </h3>
          <div className="mt-6 grid gap-5">
            {analytics.provides.map((block) => (
              <div key={block.title} className="rounded-xl bg-route-wash p-6 md:p-8">
                <h4 className="font-heading type-title font-semibold">{block.title}</h4>
                {block.text ? <p className="mt-2">{block.text}</p> : null}
                <p className="mt-4 text-muted-foreground">{block.listIntro}</p>
                <MarkerList tone="route" items={block.items} className="mt-3" />
                {block.outro ? <p className="mt-5 font-semibold text-route">{block.outro}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductShot
          image={productDashboard}
          alt="The MagnaQore Logistic dashboard summary with calls, conversations, hot leads and a feed of important events"
          caption="Summary: calls, conversations, hot leads and what happened today"
          sizes="(min-width: 64rem) 45vw, 100vw"
        />
        <ProductShot
          image={productProgress}
          alt="Progress by segment in MagnaQore Logistic with processed, in-progress and handed-over leads and their ratings"
          caption="Progress: how far each lead base is worked, with its rating mix"
          sizes="(min-width: 64rem) 45vw, 100vw"
        />
      </div>

      <div className="flex flex-col gap-8">
        <ResultsBlock title={analytics.outcomeTitle} items={analytics.outcome} />
        <div className="flex flex-col items-start gap-5 rounded-xl bg-paper-warm p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="max-w-[48ch] font-heading text-lg leading-snug font-semibold">{analytics.reportLabel}</p>
          <Button asChild variant="outline" size="xl">
            <Link href={EXAMPLE_REPORT_PATH}>
              <FileChartColumnIcon data-icon="inline-start" aria-hidden />
              {analytics.reportAction}
            </Link>
          </Button>
        </div>
      </div>
    </Chapter>
  )
}
