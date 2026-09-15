import type * as React from "react"
import { CalendarDaysIcon, CheckIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_LABEL, BOOKING_URL, type Cell, type Mark } from "@/content/landing"
import { cn } from "@/lib/utils"

/** Type roles from docs/landing-plan.md. Archivo carries the product voice, Newsreader the few editorial lines. */
export const typeRole = {
  display: "font-heading type-display font-extrabold font-wide",
  headline: "font-heading type-headline font-extrabold font-wide",
  title: "font-heading type-title font-semibold",
  lead: "type-lead",
  statement: "font-serif type-statement font-normal",
  figure: "font-heading type-figure font-extrabold font-wide tabular-nums",
} as const

type Tone = "paper" | "warm" | "band" | "ink"

const toneClass: Record<Tone, string> = {
  paper: "bg-background",
  warm: "bg-paper-warm",
  band: "bg-paper-band",
  ink: "surface-ink",
}

export function Section({
  tone = "paper",
  className,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone }) {
  return <section className={cn("py-20 md:py-28", toneClass[tone], className)} {...props} />
}

export function BookingLink({
  label = BOOKING_LABEL,
  size = "xl",
  className,
}: {
  label?: string
  size?: React.ComponentProps<typeof Button>["size"]
  className?: string
}) {
  return (
    <Button asChild size={size} className={className}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <CalendarDaysIcon data-icon="inline-start" aria-hidden />
        {label}
        <span className="sr-only"> (opens cal.com in a new tab)</span>
      </a>
    </Button>
  )
}

const markerClass = {
  route: "rounded-[2px] bg-route in-[.surface-ink]:bg-route-bright",
  stop: "rotate-45 bg-stop in-[.surface-ink]:bg-stop-bright",
  neutral: "rounded-full bg-current opacity-45",
} as const

/** Road-sign semantics: diamond = problem, square = what the system does or delivers. */
export function MarkerList({
  items,
  tone,
  className,
}: {
  items: React.ReactNode[]
  tone: keyof typeof markerClass
  className?: string
}) {
  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-3.5">
          <span aria-hidden className={cn("mt-[0.6em] size-2 shrink-0", markerClass[tone])} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function MarkValue({ mark, className }: { mark: Mark; className?: string }) {
  const included = typeof mark === "boolean" ? mark : mark.included
  const note = typeof mark === "boolean" ? null : mark.note
  const Icon = included ? CheckIcon : XIcon

  return (
    <span className={cn("inline-flex items-start gap-2 text-left", className)}>
      <span
        aria-hidden
        className={cn(
          "mt-[0.15em] grid size-5 shrink-0 place-items-center rounded-full",
          included ? "bg-route text-white" : "bg-stop-wash text-stop"
        )}
      >
        <Icon className="size-3" strokeWidth={3} />
      </span>
      {note ? <span>{note}</span> : <span className="sr-only">{included ? "Included" : "Not included"}</span>}
    </span>
  )
}

export function CellValue({ cell }: { cell: Cell }) {
  return typeof cell === "string" ? <span>{cell}</span> : <MarkValue mark={cell} />
}
