import type * as React from "react"
import { CalendarDaysIcon, CheckIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BOOKING_LABEL, BOOKING_URL, type Cell, type Mark } from "@/content/landing"
import { cn } from "@/lib/utils"

/** Type roles. One family: expanded widths speak like trailer lettering, condensed numerals like mile markers. */
export const typeRole = {
  hero: "font-heading type-hero font-[650] stretch-125",
  display: "font-heading type-display font-[630] stretch-125",
  manifesto: "font-heading type-manifesto font-[560] stretch-112",
  headline: "font-heading type-headline font-[630] stretch-112",
  title: "font-heading type-title font-semibold",
  lead: "type-lead",
  statement: "font-heading type-statement font-[500] stretch-112",
  figure: "font-heading type-figure font-[780] stretch-75",
} as const

type Tone = "paper" | "deep" | "night"

const toneClass: Record<Tone, string> = {
  paper: "bg-background",
  deep: "bg-paper-deep",
  night: "surface-ink",
}

export function Section({
  tone = "paper",
  className,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone }) {
  return <section className={cn("py-24 md:py-32 xl:py-40", toneClass[tone], className)} {...props} />
}

export function BookingLink({
  label = BOOKING_LABEL,
  size = "xl",
  variant = "default",
  className,
}: {
  label?: string
  size?: React.ComponentProps<typeof Button>["size"]
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: string
}) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
        <CalendarDaysIcon data-icon="inline-start" aria-hidden />
        {label}
        <span className="sr-only"> (opens cal.com in a new tab)</span>
      </a>
    </Button>
  )
}

const markerClass = {
  go: "mt-[0.6em] size-2 rounded-full bg-go in-[.surface-ink]:bg-go-bright",
  stop: "mt-[0.78em] h-0.5 w-3 bg-stop in-[.surface-ink]:bg-stop-bright",
  neutral: "mt-[0.68em] size-1.5 rounded-full bg-current opacity-50",
} as const

/** go = what the system does or delivers, stop = a problem or a loss. */
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
          <span aria-hidden className={cn("shrink-0", markerClass[tone])} />
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
          "mt-[0.2em] grid size-5 shrink-0 place-items-center rounded-full",
          included
            ? "bg-go text-white in-[.surface-ink]:bg-go-bright in-[.surface-ink]:text-night"
            : "bg-stop/10 text-stop in-[.surface-ink]:bg-stop-bright/15 in-[.surface-ink]:text-stop-bright"
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
