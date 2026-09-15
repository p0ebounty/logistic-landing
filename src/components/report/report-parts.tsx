import type * as React from "react"

import { Section, typeRole } from "@/components/site/primitives"
import { cn } from "@/lib/utils"

export function ReportSection({
  id,
  title,
  lead,
  tone = "paper",
  children,
}: {
  id: string
  title: string
  lead?: string
  tone?: "paper" | "warm"
  children: React.ReactNode
}) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <div className="shell">
        <header className="max-w-[52rem]">
          <h2 id={`${id}-title`} className={typeRole.headline}>
            {title}
          </h2>
          {lead ? <p className="mt-4 type-lead text-muted-foreground">{lead}</p> : null}
        </header>
        <div className="mt-12 flex flex-col gap-14 md:mt-14 md:gap-16">{children}</div>
      </div>
    </Section>
  )
}

export function SubHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn(typeRole.title, className)}>{children}</h3>
}

type Tile = { value: string; label: string; note?: string }

/** Stat tiles joined by hairlines. Big values keep proportional figures. */
export function StatTiles({ items, className }: { items: Tile[]; className?: string }) {
  return (
    <dl
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-2",
        items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5 bg-background p-6">
          <dt className="order-2 font-medium">{item.label}</dt>
          <dd className="order-1 font-heading text-[2.5rem] leading-none font-bold tracking-tight">{item.value}</dd>
          {item.note ? <dd className="order-3 text-sm text-muted-foreground">{item.note}</dd> : null}
        </div>
      ))}
    </dl>
  )
}

/** A labeled figure list: label left, value right, hairlines between rows. */
export function FigureList({
  rows,
  total,
  className,
}: {
  rows: (readonly [string, string])[] | { label: string; value: string }[]
  total?: readonly [string, string]
  className?: string
}) {
  const normalized = rows.map((row) => (Array.isArray(row) ? { label: row[0], value: row[1] } : row)) as {
    label: string
    value: string
  }[]
  return (
    <dl className={cn("flex flex-col", className)}>
      {normalized.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-border py-3">
          <dt>{row.label}</dt>
          <dd className="text-right font-semibold tabular-nums">{row.value}</dd>
        </div>
      ))}
      {total ? (
        <div className="flex items-baseline justify-between gap-6 pt-4">
          <dt className="font-semibold">{total[0]}</dt>
          <dd className="text-right font-heading text-2xl font-bold">{total[1]}</dd>
        </div>
      ) : null}
    </dl>
  )
}

export function Note({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "stop" }) {
  return (
    <p
      className={cn(
        "rounded-lg px-5 py-4 text-[0.95rem]",
        tone === "stop" ? "bg-stop-wash text-ink" : "bg-paper-band text-ink"
      )}
    >
      {children}
    </p>
  )
}

/** Wide tables scroll sideways on phones; the first column stays pinned. */
export function ReportTable({
  caption,
  columns,
  rows,
  total,
  minWidth = "44rem",
}: {
  caption: string
  columns: string[]
  rows: string[][]
  total?: string[]
  minWidth?: string
}) {
  const numeric = (index: number) => index >= 2
  return (
    <div className="relative overflow-x-auto rounded-xl ring-1 ring-border">
      <table className="w-full border-collapse bg-background text-[0.95rem]" style={{ minWidth }}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-ink">
            {columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  "px-4 py-3 text-left align-bottom font-semibold",
                  index === 0 && "sticky left-0 z-10 bg-background",
                  numeric(index) && "text-right"
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-border align-top last:border-0">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="sticky left-0 z-10 bg-background px-4 py-3.5 text-left font-medium">
                    {cell}
                  </th>
                ) : (
                  <td
                    key={index}
                    className={cn(
                      "px-4 py-3.5",
                      numeric(index) ? "text-right whitespace-nowrap tabular-nums" : "text-muted-foreground",
                      index === row.length - 1 && "font-semibold text-foreground"
                    )}
                  >
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
        {total ? (
          <tfoot>
            <tr className="border-t-2 border-ink bg-paper-warm">
              {total.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row" className="sticky left-0 z-10 bg-paper-warm px-4 py-4 text-left font-bold">
                    {cell}
                  </th>
                ) : (
                  <td
                    key={index}
                    className={cn(
                      "px-4 py-4 font-bold",
                      numeric(index) && "text-right whitespace-nowrap tabular-nums",
                      index === total.length - 1 && "font-heading text-lg text-stop"
                    )}
                  >
                    {cell}
                  </td>
                )
              )}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  )
}
