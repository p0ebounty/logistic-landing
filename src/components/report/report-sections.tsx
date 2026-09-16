import { CellBar, FunnelChart, VersusChart } from "@/components/report/report-charts"
import { FigureList, Note, ReportSection, ReportTable, StatTiles, SubHeading } from "@/components/report/report-parts"
import { typeRole } from "@/components/site/primitives"
import { aiVsHumanReport, resources, segments, summary } from "@/content/example-report"
import { cn } from "@/lib/utils"

const count = new Intl.NumberFormat("en-US")
const pairs = (rows: string[][]) => rows as [string, string][]

export function ReportSummary() {
  const { kpis, budget, funnel, channels, outreach, efficiency } = summary
  return (
    <ReportSection id="summary" title="Summary">
      <StatTiles items={kpis} />

      <div className="surface-ink rounded-[1.25rem] p-6 md:p-10">
        <SubHeading>{budget.title}</SubHeading>
        <p className="mt-2 text-muted-foreground">{budget.basis}</p>
        <dl className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-1">
            <dt className="order-1 text-muted-foreground">{budget.ai.label}</dt>
            <dd className="order-2 font-heading text-4xl font-bold text-go-bright">{budget.ai.value}</dd>
            <dd className="order-3 text-sm text-muted-foreground">{budget.ai.formula}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-1 text-muted-foreground">{budget.traditional.label}</dt>
            <dd className="order-2 font-heading text-4xl font-bold text-stop-bright line-through decoration-2">
              {budget.traditional.value}
            </dd>
            <dd className="order-3 text-sm text-muted-foreground">{budget.traditional.formula}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="order-1 text-muted-foreground">{budget.saved.label}</dt>
            <dd className="order-2 font-heading text-4xl font-bold text-sodium">{budget.saved.value}</dd>
            <dd className="order-3 flex gap-6">
              {budget.ratios.map((ratio) => (
                <span key={ratio.label}>
                  <span className="font-heading text-2xl font-bold">{ratio.value}</span>{" "}
                  <span className="text-sm text-muted-foreground">{ratio.label}</span>
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <p className="mt-8 rounded-lg bg-night-raised px-5 py-4 text-sm text-muted-foreground">
          <span className="font-semibold text-white">Note:</span> {budget.note}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-7">
          <SubHeading>{funnel.title}</SubHeading>
          <div className="mt-6">
            <FunnelChart steps={funnel.steps} caption="Conversion funnel from total contacts to hot leads" />
          </div>
        </div>
        <dl className="flex flex-col gap-px overflow-hidden rounded-[1.25rem] bg-border ring-1 ring-border lg:col-span-5">
          {funnel.categories.map((category) => (
            <div key={category.label} className="flex items-baseline justify-between gap-4 bg-background px-6 py-5">
              <dt>
                <span className="font-semibold">{category.label}</span>{" "}
                <span className="text-muted-foreground">({category.note})</span>
              </dt>
              <dd className="font-heading text-3xl font-bold">{category.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <SubHeading>{channels.title}</SubHeading>
        <StatTiles items={channels.items} className="mt-6" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
          <SubHeading>{outreach.title}</SubHeading>
          <FigureList rows={outreach.items} className="mt-4" />
        </div>
        <div className="surface-ink rounded-[1.25rem] p-6 md:p-8">
          <SubHeading>{efficiency.title}</SubHeading>
          <dl className="mt-5 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <dt className="order-1 text-sm text-muted-foreground">{efficiency.ai.label}</dt>
              <dd className="order-2 font-heading text-3xl font-bold text-go-bright">{efficiency.ai.value}</dd>
              <dd className="order-3 text-sm text-muted-foreground">{efficiency.ai.note}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="order-1 text-sm text-muted-foreground">{efficiency.traditional.label}</dt>
              <dd className="order-2 font-heading text-3xl font-bold text-stop-bright line-through decoration-2">
                {efficiency.traditional.value}
              </dd>
              <dd className="order-3 text-sm text-muted-foreground">{efficiency.traditional.note}</dd>
            </div>
          </dl>
          <ul className="mt-6 flex flex-col gap-3">
            {efficiency.outcomes.map((outcome) => (
              <li key={outcome.value} className="rounded-lg bg-night-raised px-4 py-3">
                <p className="font-semibold">{outcome.value}</p>
                <p className="text-sm text-muted-foreground">{outcome.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ReportSection>
  )
}

export function ReportSegments() {
  const maxInterest = Math.max(...segments.rows.map((row) => parseFloat(row[3])))
  return (
    <ReportSection id="segments" tone="deep" title={segments.title} lead={segments.lead}>
      <div className="overflow-x-auto rounded-[1.25rem] ring-1 ring-border">
        <table className="w-full min-w-[60rem] border-collapse bg-background text-[0.95rem]">
          <caption className="sr-only">{segments.title}</caption>
          <thead>
            <tr className="border-b-2 border-asphalt">
              {segments.columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={cn(
                    "px-4 py-3 font-semibold whitespace-nowrap",
                    index === 0 ? "sticky left-0 z-10 bg-background text-left" : "text-right"
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {segments.rows.map((row) => {
              const [name, contacts, interested, interest, ...categories] = row
              return (
                <tr key={name} className="border-b border-border last:border-0">
                  <th scope="row" className="sticky left-0 z-10 bg-background px-4 py-3 text-left font-medium whitespace-nowrap">
                    {name}
                  </th>
                  <td className="px-4 py-3 text-right">{count.format(contacts)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{count.format(interested)}</td>
                  <td className="px-4 py-3">
                    <CellBar value={parseFloat(interest)} max={maxInterest} text={interest} />
                  </td>
                  {categories.map((value, index) => (
                    <td
                      key={index}
                      className={cn(
                        "px-4 py-3 text-right",
                        typeof value === "string" ? "text-muted-foreground" : "font-semibold"
                      )}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
          <h3 className="flex gap-3 font-heading type-title font-semibold">
            <span aria-hidden className="mt-[calc(0.5lh-0.3125rem)] size-2.5 shrink-0 rounded-full bg-go" />
            {segments.top.title}
          </h3>
          <FigureList rows={pairs(segments.top.items)} className="mt-4" />
        </div>
        <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
          <h3 className="flex gap-3 font-heading type-title font-semibold">
            <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-5 shrink-0 bg-stop" />
            {segments.low.title}
          </h3>
          <FigureList rows={pairs(segments.low.items)} className="mt-4" />
          <div className="mt-5">
            <Note tone="stop">
              <span className="font-semibold">Note:</span> {segments.low.note}
            </Note>
          </div>
        </div>
      </div>

      <div>
        <SubHeading>{segments.inProgress.title}</SubHeading>
        <p className="mt-2 text-muted-foreground">{segments.inProgress.lead}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {segments.inProgress.items.map((item) => (
            <li key={item} className="rounded-lg bg-background px-4 py-3 ring-1 ring-border">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </ReportSection>
  )
}

export function ReportResources() {
  const { hours, speed, execution, advertising, comparison } = resources
  return (
    <ReportSection id="resources" title={resources.title} lead={resources.basis}>
      <StatTiles items={hours} />

      <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-10">
        <SubHeading>{speed.title}</SubHeading>
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <VersusChart
              humanLabel={speed.manual.label}
              aiLabel={speed.ai.label}
              rows={[
                {
                  label: "Weeks to work through the database",
                  human: speed.manual.weeks,
                  ai: speed.ai.weeks,
                  humanText: speed.manual.value,
                  aiText: speed.ai.value,
                },
              ]}
            />
            <p className="mt-5 font-heading text-2xl font-bold text-go">{speed.factor}</p>
            <ul className="mt-3 flex flex-col gap-1.5 text-[0.95rem] text-muted-foreground">
              <li>
                {speed.manual.label}: {speed.manual.note}
              </li>
              <li>
                {speed.ai.label}: {speed.ai.note}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <h4 className="font-heading text-lg font-semibold">{speed.tasksTitle}</h4>
            <FigureList rows={pairs(speed.tasks)} className="mt-2" />
          </div>
        </div>
        <div className="mt-8">
          <Note>{speed.note}</Note>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <SubHeading>{execution.title}</SubHeading>
        <ReportTable caption={execution.title} columns={execution.columns} rows={execution.rows} total={execution.total} minWidth="54rem" />
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <SubHeading>{advertising.title}</SubHeading>
          <p className="mt-2 text-muted-foreground">{advertising.lead}</p>
        </div>
        <ReportTable caption={advertising.title} columns={advertising.columns} rows={advertising.rows} total={advertising.total} minWidth="54rem" />
        <Note tone="stop">
          <span className="font-semibold">Traditional advertising total cost:</span> {advertising.note}
        </Note>
      </div>

      <div className="flex flex-col gap-6">
        <SubHeading>{comparison.title}</SubHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
            <h4 className="flex gap-2.5 font-heading text-lg font-semibold">
              <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-4 shrink-0 bg-stop" />
              {comparison.traditional.title}
            </h4>
            <FigureList
              rows={pairs(comparison.traditional.rows)}
              total={comparison.traditional.total as [string, string]}
              className="mt-4"
            />
          </div>
          <div className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
            <h4 className="flex gap-2.5 font-heading text-lg font-semibold">
              <span aria-hidden className="mt-[calc(0.5lh-0.25rem)] size-2 shrink-0 rounded-full bg-go" />
              {comparison.ai.title}
            </h4>
            <FigureList rows={pairs(comparison.ai.rows)} total={comparison.ai.total as [string, string]} className="mt-4" />
          </div>
        </div>
        <div className="surface-ink flex flex-col gap-4 rounded-[1.25rem] p-6 sm:flex-row sm:items-center sm:justify-between md:p-10">
          <div>
            <p className="font-heading text-2xl font-bold text-sodium">{comparison.savings.label}</p>
            <p className="text-muted-foreground">{comparison.savings.note}</p>
          </div>
          <div className="sm:text-right">
            <p className="font-heading text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-none font-extrabold stretch-112 text-sodium">
              {comparison.savings.value}
            </p>
            <p className="mt-2 font-semibold">{comparison.savings.roi}</p>
          </div>
        </div>
      </div>
    </ReportSection>
  )
}

export function ReportAiVsHuman() {
  const report = aiVsHumanReport
  const sides = [
    { side: report.human, marker: "bg-chart-human" },
    { side: report.ai, marker: "bg-chart-ai" },
  ]
  return (
    <ReportSection id="ai-vs-human" tone="deep" title={report.title} lead={report.lead}>
      <div className="grid gap-6 lg:grid-cols-2">
        {sides.map(({ side, marker }) => (
          <div key={side.title} className="rounded-[1.25rem] bg-background p-6 ring-1 ring-border md:p-8">
            <h3 className="flex gap-3 font-heading type-title font-semibold">
              <span aria-hidden className={cn("mt-[calc(0.5lh-0.375rem)] size-3 shrink-0 rounded-[3px]", marker)} />
              {side.title}
            </h3>
            <p className="mt-1 text-muted-foreground">{side.subtitle}</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
              {side.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="order-1 font-heading text-3xl font-bold">{stat.value}</dd>
                  {stat.note ? <dd className="order-3 text-sm">{stat.note}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div>
        <SubHeading>{report.metrics.title}</SubHeading>
        <VersusChart
          className="mt-6"
          humanLabel="Human team"
          aiLabel="AI system"
          rows={report.metrics.rows.map((metric) => ({
            label: metric.label,
            human: metric.human,
            ai: metric.ai,
            unit: metric.format === "percent" ? "%" : "",
          }))}
        />
      </div>

      <div>
        <SubHeading>{report.differences.title}</SubHeading>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {report.differences.items.map((item) => (
            <div key={item.title} className="border-t-2 border-go pt-5">
              <h4 className="font-heading text-lg font-semibold">{item.title}</h4>
              <p className="mt-2 text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-ink rounded-[1.25rem] p-6 md:p-10">
        <p className="font-heading text-base font-semibold text-sodium">{report.takeaway.title}</p>
        <p className={cn(typeRole.lead, "mt-3 max-w-[62ch] font-heading text-2xl leading-snug")}>{report.takeaway.text}</p>
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {report.takeaway.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 rounded-lg bg-night-raised p-5">
              <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 font-heading text-3xl font-bold text-sodium">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </ReportSection>
  )
}
