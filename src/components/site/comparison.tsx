import * as React from "react"

import { SplitReveal } from "@/components/motion/split-reveal"
import { Section, typeRole } from "@/components/site/primitives"
import { RaceScene } from "@/components/site/race-scene"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { aiVsHuman, pricing } from "@/content/landing"
import { cn } from "@/lib/utils"

const CONTACTS = 2000

const swatch = {
  ai: "bg-chart-ai in-[.surface-ink]:bg-chart-ai-night",
  human: "bg-chart-human in-[.surface-ink]:bg-chart-human-night",
}

/** Series swatch for a flex row; its top margin centers it on the first line of text beside it. */
function Swatch({ series, className }: { series: keyof typeof swatch; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("mt-[calc(0.5lh-0.375rem)] inline-block size-3 shrink-0 rounded-[3px]", swatch[series], className)}
    />
  )
}

/** Lets labels like "Software/CRM/Licenses" wrap after a slash on a narrow card. */
function BreakAfterSlashes({ text }: { text: string }) {
  const parts = text.split("/")
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < parts.length - 1 ? (
        <>
          /<wbr />
        </>
      ) : null}
    </React.Fragment>
  ))
}

/** "$24,500 / month": the figure never breaks, and the smaller period drops to the next line whole on a narrow card. */
function PerPeriod({ amount }: { amount: string }) {
  const [figure, period] = amount.split(" / ")
  if (!period) return amount
  return (
    <>
      <span className="whitespace-nowrap">{figure}</span>{" "}
      <span className="text-[0.6em] whitespace-nowrap">/ {period}</span>
    </>
  )
}

/**
 * Metric tables: the first column names the row; in "versus" tables the header swatches match the race chart.
 * Phones: a row's name takes the full width and its values sit below it, in two columns under the column headers.
 */
function DataTable({
  title,
  caption,
  columns,
  rows,
  versus = false,
  className,
}: {
  title: string
  caption?: string
  columns: string[]
  rows: string[][]
  versus?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <h3 className={typeRole.title}>{title}</h3>
      <Table className="mt-6 text-[0.975rem]">
        <TableCaption className="sr-only">{caption ?? title}</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-asphalt hover:bg-transparent max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-5">
            {columns.map((column, index) => (
              <TableHead
                key={column}
                scope="col"
                className={cn(
                  "h-auto px-3 py-3 align-bottom font-medium whitespace-normal text-graphite first:pl-0 max-sm:px-0",
                  index === 0 && "max-sm:sr-only"
                )}
              >
                <span className="flex gap-2">
                  {versus && index > 0 ? <Swatch series={index === 1 ? "ai" : "human"} /> : null}
                  <span>{column}</span>
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([label, ...values]) => (
            <TableRow
              key={label}
              className="hover:bg-paper-deep/70 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-1 max-sm:py-3.5"
            >
              <TableHead
                scope="row"
                className="h-auto py-4 pr-3 pl-0 font-medium whitespace-normal text-foreground max-sm:col-span-2 max-sm:p-0 max-sm:text-[0.9rem] max-sm:text-graphite"
              >
                {label}
              </TableHead>
              {values.map((value, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    "px-3 py-4 whitespace-normal max-sm:p-0",
                    versus && index === 0 && "font-semibold",
                    versus && index === 1 && "text-graphite"
                  )}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function AiVsHuman() {
  const { performance, labor, keyMetrics } = aiVsHuman
  const [processingLabel, aiHours, humanHours] = performance.rows[1]
  const racers = [
    { series: "ai" as const, label: performance.columns[1], hours: aiHours },
    { series: "human" as const, label: performance.columns[2], hours: humanHours },
  ]

  return (
    <section id="ai-vs-human" aria-labelledby="ai-vs-human-title">
      <RaceScene>
        <div
          data-race-panel
          className="surface-ink pin-scene flex min-h-lvh flex-col justify-center pt-16 pb-[calc(3rem+var(--bleed))] motion-reduce:min-h-svh sm:pt-24 sm:pb-[calc(6rem+var(--bleed))] md:pt-28 md:pb-[calc(7rem+var(--bleed))]"
        >
          <div className="shell">
            <SplitReveal as="h2" id="ai-vs-human-title" className={cn(typeRole.headline, "max-w-[21ch]")}>
              {aiVsHuman.title}
            </SplitReveal>

            <figure className="mt-8 sm:mt-14 md:mt-20">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-b border-border pb-4 sm:pb-5">
                <span className={typeRole.title}>{processingLabel}</span>
                {/* Phones name the series next to each bar instead. */}
                <span className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-muted-foreground max-sm:hidden">
                  {racers.map((racer) => (
                    <span key={racer.series} className="flex gap-2">
                      <Swatch series={racer.series} />
                      {racer.label}
                    </span>
                  ))}
                </span>
              </figcaption>

              <dl className="mt-6 flex flex-col gap-7 sm:mt-10 sm:gap-12 md:mt-14">
                {racers.map((racer) => (
                  <div
                    key={racer.series}
                    data-race-row
                    data-hours={parseFloat(racer.hours.replace(/,/g, ""))}
                    data-contacts={CONTACTS}
                    className="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10"
                  >
                    <dt className="flex gap-2.5 font-heading text-lg leading-snug font-semibold stretch-112">
                      <Swatch series={racer.series} className="sm:hidden" />
                      {racer.label}
                    </dt>
                    <dd className="flex min-w-0 flex-col gap-3 sm:gap-4">
                      <div className="h-4 overflow-hidden rounded-r-[4px] bg-paper/10 sm:h-6">
                        <div data-race-bar className={cn("h-full w-full rounded-r-[4px]", swatch[racer.series])} />
                      </div>
                      <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <span
                          data-race-hours
                          className="font-heading text-[clamp(2.5rem,1.6rem+3.2vw,5rem)] leading-[0.9] font-[760] tabular-nums stretch-75"
                        >
                          {racer.hours}
                        </span>
                        <span data-race-contacts className="text-[0.95rem] text-muted-foreground tabular-nums sm:text-base">
                          {CONTACTS.toLocaleString("en-US")} of {CONTACTS.toLocaleString("en-US")} contacts
                        </span>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </div>
        <div data-race-runway data-scene-runway aria-hidden className="hidden h-[150svh] motion-safe:block" />
      </RaceScene>

      <div className="py-24 md:py-32">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-20">
          <DataTable {...performance} versus className="lg:col-span-7" />
          <DataTable {...labor} className="lg:col-span-5" />
          <DataTable {...keyMetrics} versus className="lg:col-span-12 xl:col-span-9" />
        </div>
      </div>
    </section>
  )
}

export function Pricing() {
  const { agent, human } = pricing
  return (
    <Section id="pricing" tone="deep" aria-labelledby="pricing-title">
      <div className="shell">
        <SplitReveal as="h2" id="pricing-title" className={typeRole.display}>
          {pricing.title}
        </SplitReveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:mt-24 lg:grid-cols-12 lg:gap-x-20">
          <div className="lg:col-span-7">
            <h3 className={typeRole.title}>{agent.title}</h3>
            <table className="mt-6 w-full border-collapse">
              <caption className="sr-only">{agent.title}</caption>
              <thead>
                <tr className="border-b border-asphalt text-left text-[0.95rem] text-graphite max-sm:sr-only">
                  {agent.columns.map((column, index) => (
                    <th key={column} scope="col" className={cn("pb-3 font-medium", index === 2 && "text-right")}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {agent.rows.map((row) => (
                  <tr
                    key={row.period}
                    className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 border-b border-border py-6 sm:table-row sm:py-0"
                  >
                    <th
                      scope="row"
                      className="text-left align-top font-heading text-lg leading-snug font-semibold stretch-112 sm:w-44 sm:py-7 sm:pr-6"
                    >
                      {row.period}
                    </th>
                    <td className="col-span-2 row-start-2 align-top sm:py-7 sm:pr-6">
                      {row.included}
                      {row.note ? <span className="mt-1.5 block text-[0.95rem] text-graphite">{row.note}</span> : null}
                    </td>
                    <td className="col-start-2 row-start-1 text-right align-top font-heading text-[clamp(1.75rem,1.35rem+1.1vw,2.5rem)] leading-none font-[760] whitespace-nowrap stretch-75 sm:py-7">
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lg:col-span-5">
            <div className="surface-ink rounded-[1.75rem] p-6 sm:p-7 md:p-10">
              <h3 className={typeRole.title}>{human.title}</h3>
              <Table className="mt-6 text-[0.975rem]">
                <TableCaption className="sr-only">{human.title}</TableCaption>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    {human.columns.map((column, index) => (
                      <TableHead
                        key={column}
                        scope="col"
                        className={cn(
                          "h-auto px-3 py-3 font-medium whitespace-normal text-muted-foreground first:pl-0",
                          index === 1 && "pr-0 text-right whitespace-nowrap"
                        )}
                      >
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {human.rows.map(([label, amount]) => (
                    <TableRow key={label} className="hover:bg-transparent">
                      <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 font-medium whitespace-normal text-foreground">
                        <BreakAfterSlashes text={label} />
                      </TableHead>
                      <TableCell className="py-4 pr-0 pl-3 text-right whitespace-normal sm:whitespace-nowrap">{amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="border-t border-paper/40 bg-transparent">
                  {[human.total, human.average].map(([label, amount], index) => (
                    <TableRow key={label} className="hover:bg-transparent">
                      <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 font-semibold whitespace-normal text-foreground">
                        {label}
                      </TableHead>
                      <TableCell
                        className={cn(
                          "py-4 pr-0 pl-3 text-right font-heading font-bold whitespace-normal sm:whitespace-nowrap",
                          index === 1 ? "text-[1.6rem] leading-tight text-sodium stretch-88" : "text-lg"
                        )}
                      >
                        <PerPeriod amount={amount} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
