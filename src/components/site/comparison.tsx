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

function Swatch({ series }: { series: keyof typeof swatch }) {
  return <span aria-hidden className={cn("mr-2 inline-block size-3 rounded-[3px] align-[-0.05em]", swatch[series])} />
}

/** Metric tables: the first column names the row; in "versus" tables the header swatches match the race chart. */
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
          <TableRow className="border-b border-asphalt hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead
                key={column}
                scope="col"
                className="h-auto px-3 py-3 align-bottom font-medium whitespace-normal text-graphite first:pl-0"
              >
                {versus && index === 1 ? <Swatch series="ai" /> : null}
                {versus && index === 2 ? <Swatch series="human" /> : null}
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([label, ...values]) => (
            <TableRow key={label} className="hover:bg-paper-deep/70">
              <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 font-medium whitespace-normal text-foreground">
                {label}
              </TableHead>
              {values.map((value, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    "px-3 py-4 whitespace-normal",
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
        <div className="surface-ink sticky top-0 flex min-h-svh flex-col justify-center py-24 motion-reduce:relative md:py-28">
          <div className="shell">
            <SplitReveal as="h2" id="ai-vs-human-title" className={cn(typeRole.headline, "max-w-[21ch]")}>
              {aiVsHuman.title}
            </SplitReveal>

            <figure className="mt-14 md:mt-20">
              <figcaption className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-b border-border pb-5">
                <span className={typeRole.title}>{processingLabel}</span>
                <span className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-muted-foreground">
                  {racers.map((racer) => (
                    <span key={racer.series}>
                      <Swatch series={racer.series} />
                      {racer.label}
                    </span>
                  ))}
                </span>
              </figcaption>

              <dl className="mt-10 flex flex-col gap-12 md:mt-14">
                {racers.map((racer) => (
                  <div
                    key={racer.series}
                    data-race-row
                    data-hours={parseFloat(racer.hours.replace(/,/g, ""))}
                    data-contacts={CONTACTS}
                    className="grid gap-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10"
                  >
                    <dt className="font-heading text-lg leading-snug font-semibold stretch-112">{racer.label}</dt>
                    <dd className="flex min-w-0 flex-col gap-4">
                      <div className="h-6 overflow-hidden rounded-r-[4px] bg-paper/10">
                        <div data-race-bar className={cn("h-full w-full rounded-r-[4px]", swatch[racer.series])} />
                      </div>
                      <p className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <span
                          data-race-hours
                          className="font-heading text-[clamp(2.75rem,1.8rem+3.2vw,5rem)] leading-[0.9] font-[760] tabular-nums stretch-75"
                        >
                          {racer.hours}
                        </span>
                        <span data-race-contacts className="text-muted-foreground tabular-nums">
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
            <div className="surface-ink rounded-[1.75rem] p-7 md:p-10">
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
                          index === 1 && "pr-0 text-right"
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
                        {label}
                      </TableHead>
                      <TableCell className="py-4 pr-0 pl-3 text-right sm:whitespace-nowrap">{amount}</TableCell>
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
                          "py-4 pr-0 pl-3 text-right font-heading font-bold sm:whitespace-nowrap",
                          index === 1 ? "text-[1.6rem] leading-tight text-sodium stretch-88" : "text-lg"
                        )}
                      >
                        {amount}
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
