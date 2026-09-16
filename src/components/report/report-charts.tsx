"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const count = new Intl.NumberFormat("en-US")

/** Share of the bar track a full-length bar may use on wide tracks. */
const TRACK = 0.72

/**
 * Room kept after the longest bar for the longest end label of its chart, so a label never runs out of the card.
 * Sized from the label length, since the track itself can be only a few labels wide on a phone.
 */
const labelRoom = (texts: string[]) => `calc(${Math.max(...texts.map((text) => text.length)) * 1.1}ch + 0.75rem)`

function Bar({
  value,
  max,
  text,
  room,
  tooltip,
  series,
}: {
  value: number
  max: number
  text: string
  room: string
  tooltip: string
  series: "ai" | "human"
}) {
  const share = max > 0 ? value / max : 0
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* The track is an inline-size container: bars scale against what is left of it after the label room. */}
        <div
          tabIndex={0}
          aria-label={tooltip}
          className="flex h-8 min-w-0 items-center rounded-sm border-l border-border outline-none [container-type:inline-size] focus-visible:ring-3 focus-visible:ring-ring"
        >
          {value > 0 ? (
            <span
              aria-hidden
              className={cn("h-5 shrink-0 rounded-r-[4px]", series === "ai" ? "bg-chart-ai" : "bg-chart-human")}
              style={{ width: `max(2px, calc(min(${TRACK * 100}cqw, 100cqw - ${room}) * ${share}))` }}
            />
          ) : null}
          <span className="ml-2 font-semibold whitespace-nowrap">{text}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">{tooltip}</TooltipContent>
    </Tooltip>
  )
}

export function FunnelChart({ steps, caption }: { steps: { label: string; value: number }[]; caption: string }) {
  const max = Math.max(...steps.map((step) => step.value))
  const room = labelRoom(steps.map((step) => count.format(step.value)))
  return (
    <TooltipProvider delayDuration={120}>
      <figure>
        <ol className="flex flex-col gap-2">
          {steps.map((step) => (
            <li key={step.label} className="grid grid-cols-[minmax(6.5rem,10rem)_minmax(0,1fr)] items-center gap-4">
              <span className="text-[0.95rem] leading-snug">{step.label}</span>
              <Bar
                value={step.value}
                max={max}
                room={room}
                text={count.format(step.value)}
                tooltip={`${step.label}: ${count.format(step.value)} contacts, ${((step.value / max) * 100).toFixed(1)}% of total`}
                series="ai"
              />
            </li>
          ))}
        </ol>
        <figcaption className="sr-only">{caption}</figcaption>
      </figure>
    </TooltipProvider>
  )
}

type VersusRow = {
  label: string
  human: number
  ai: number
  humanText?: string
  aiText?: string
  unit?: string
}

export function ChartLegend({ human, ai }: { human: string; ai: string }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Legend">
      <li className="flex items-center gap-2">
        <span aria-hidden className="size-3 rounded-[3px] bg-chart-human" />
        {human}
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="size-3 rounded-[3px] bg-chart-ai" />
        {ai}
      </li>
    </ul>
  )
}

/** Small multiples: every metric gets its own scale, so different units never share an axis. */
export function VersusChart({
  rows,
  humanLabel,
  aiLabel,
  className,
}: {
  rows: VersusRow[]
  humanLabel: string
  aiLabel: string
  className?: string
}) {
  return (
    <TooltipProvider delayDuration={120}>
      <div className={cn("flex flex-col gap-6", className)}>
        <ChartLegend human={humanLabel} ai={aiLabel} />
        <div className={cn("grid grid-cols-1 gap-5", rows.length > 1 && "md:grid-cols-3")}>
          {rows.map((row) => {
            const max = Math.max(row.human, row.ai)
            const humanText = row.humanText ?? `${count.format(row.human)}${row.unit ?? ""}`
            const aiText = row.aiText ?? `${count.format(row.ai)}${row.unit ?? ""}`
            const room = labelRoom([humanText, aiText])
            return (
              <figure key={row.label} className="rounded-[1.25rem] bg-background p-5 ring-1 ring-border">
                <figcaption className="font-semibold">{row.label}</figcaption>
                <dl className="mt-4 flex flex-col gap-2">
                  {(
                    [
                      ["human", humanLabel, row.human, humanText],
                      ["ai", aiLabel, row.ai, aiText],
                    ] as const
                  ).map(([series, seriesLabel, value, text]) => (
                    // Phones put the series name above its bar, so the bar gets the card's full width.
                    <div key={series} className="grid items-center gap-x-3 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
                      <dt className="text-sm leading-tight text-muted-foreground">{seriesLabel}</dt>
                      <dd className="min-w-0">
                        <Bar
                          value={value}
                          max={max}
                          room={room}
                          text={text}
                          tooltip={`${seriesLabel}, ${row.label.toLowerCase()}: ${text}`}
                          series={series}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </figure>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}

/** Inline data bar for table cells (one hue, magnitude only). */
export function CellBar({ value, max, text }: { value: number; max: number; text: string }) {
  return (
    <span className="flex items-center justify-end gap-2">
      <span aria-hidden className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-paper-deep sm:block">
        <span className="block h-full rounded-full bg-chart-ai" style={{ width: `${(value / max) * 100}%` }} />
      </span>
      <span className="w-12 text-right">{text}</span>
    </span>
  )
}
