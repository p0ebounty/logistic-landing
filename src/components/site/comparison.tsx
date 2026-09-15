import { Section, typeRole } from "@/components/site/primitives"
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

const headMarker = {
  route: <span aria-hidden className="mr-2 inline-block size-2.5 rounded-[2px] bg-route" />,
  stop: <span aria-hidden className="mr-2 inline-block size-2.5 rotate-45 bg-stop" />,
}

/** Metric tables: the first column names the row; "versus" colors the AI column green and the human column red. */
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
      <Table className="mt-5 text-[0.975rem]">
        <TableCaption className="sr-only">{caption ?? title}</TableCaption>
        <TableHeader>
          <TableRow className="border-b-2 border-ink hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead
                key={column}
                scope="col"
                className="h-auto px-3 py-3 align-bottom font-semibold whitespace-normal first:pl-0"
              >
                {versus && index === 1 ? headMarker.route : null}
                {versus && index === 2 ? headMarker.stop : null}
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([label, ...values]) => (
            <TableRow key={label} className="hover:bg-muted/60">
              <TableHead scope="row" className="h-auto py-3.5 pr-3 pl-0 font-medium whitespace-normal">
                {label}
              </TableHead>
              {values.map((value, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    "px-3 py-3.5 whitespace-normal tabular-nums",
                    versus && index === 0 && "font-semibold text-route",
                    versus && index === 1 && "text-stop"
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
  return (
    <Section id="ai-vs-human" tone="warm" aria-labelledby="ai-vs-human-title">
      <div className="shell">
        <h2 id="ai-vs-human-title" className={cn(typeRole.headline, "max-w-[24ch]")}>
          {aiVsHuman.title}
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <DataTable {...performance} versus className="lg:col-span-7" />
          <DataTable {...labor} className="lg:col-span-5" />
          <DataTable {...keyMetrics} versus className="lg:col-span-12 xl:col-span-9" />
        </div>
      </div>
    </Section>
  )
}

export function Pricing() {
  const { agent, human } = pricing
  return (
    <Section id="pricing" aria-labelledby="pricing-title">
      <div className="shell">
        <h2 id="pricing-title" className={typeRole.headline}>
          {pricing.title}
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className={typeRole.title}>{agent.title}</h3>
            <Table className="mt-5 text-[0.975rem]">
              <TableCaption className="sr-only">{agent.title}</TableCaption>
              <TableHeader>
                <TableRow className="border-b-2 border-ink hover:bg-transparent">
                  {agent.columns.map((column, index) => (
                    <TableHead
                      key={column}
                      scope="col"
                      className={cn("h-auto px-3 py-3 font-semibold whitespace-normal first:pl-0", index === 2 && "text-right")}
                    >
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {agent.rows.map((row) => (
                  <TableRow key={row.period} className="align-top hover:bg-background/60">
                    <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 align-top font-semibold whitespace-normal">
                      {row.period}
                    </TableHead>
                    <TableCell className="px-3 py-4 align-top whitespace-normal">
                      {row.included}
                      {row.note ? <span className="mt-1 block text-sm text-muted-foreground">{row.note}</span> : null}
                    </TableCell>
                    <TableCell className="px-3 py-4 text-right align-top font-heading text-lg font-bold sm:whitespace-nowrap tabular-nums">
                      {row.cost}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="lg:col-span-5">
            <h3 className={typeRole.title}>{human.title}</h3>
            <Table className="mt-5 text-[0.975rem]">
              <TableCaption className="sr-only">{human.title}</TableCaption>
              <TableHeader>
                <TableRow className="border-b-2 border-ink hover:bg-transparent">
                  {human.columns.map((column, index) => (
                    <TableHead
                      key={column}
                      scope="col"
                      className={cn("h-auto px-3 py-3 font-semibold whitespace-normal first:pl-0", index === 1 && "text-right")}
                    >
                      {column}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {human.rows.map(([label, amount]) => (
                  <TableRow key={label} className="hover:bg-background/60">
                    <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 font-medium whitespace-normal">
                      {label}
                    </TableHead>
                    <TableCell className="px-3 py-4 text-right sm:whitespace-nowrap tabular-nums">{amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="border-t-2 border-ink bg-transparent">
                {[human.total, human.average].map(([label, amount], index) => (
                  <TableRow key={label} className="hover:bg-transparent">
                    <TableHead scope="row" className="h-auto py-4 pr-3 pl-0 font-semibold whitespace-normal">
                      {label}
                    </TableHead>
                    <TableCell
                      className={cn(
                        "px-3 py-4 text-right font-heading font-bold sm:whitespace-nowrap tabular-nums",
                        index === 1 ? "text-xl text-stop" : "text-lg"
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
    </Section>
  )
}
