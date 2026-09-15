import type * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { CheckIcon } from "lucide-react"

import { MarkerList, Section, typeRole } from "@/components/site/primitives"
import type { TitledText } from "@/content/landing"
import { cn } from "@/lib/utils"

/** One challenge: a headline with its photograph, then problem → system → results. */
export function Chapter({
  id,
  title,
  lead,
  image,
  imageSide = "right",
  tone = "paper",
  children,
}: {
  id: string
  title: string
  lead?: string
  image?: StaticImageData
  imageSide?: "left" | "right"
  tone?: "paper" | "warm"
  children: React.ReactNode
}) {
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <div className="shell">
        <header className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className={cn("lg:col-span-7", imageSide === "left" && "lg:order-2")}>
            <h2 id={`${id}-title`} className={cn(typeRole.headline, "max-w-[18ch]")}>
              {title}
            </h2>
            {lead ? <p className="mt-5 max-w-[46ch] type-lead text-muted-foreground">{lead}</p> : null}
          </div>
          {image ? (
            <div
              className={cn(
                "relative aspect-[3/2] overflow-hidden rounded-xl bg-ink lg:col-span-5",
                imageSide === "left" && "lg:order-1"
              )}
            >
              <Image src={image} alt="" fill sizes="(min-width: 64rem) 40vw, 100vw" placeholder="blur" className="object-cover" />
            </div>
          ) : null}
        </header>
        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-20">{children}</div>
      </div>
    </Section>
  )
}

export function ProblemBlock({
  title = "Problem",
  children,
  className,
}: {
  title?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h3 className="flex items-center gap-3 font-heading text-base font-semibold text-stop">
        <span aria-hidden className="size-3 rotate-45 border-2 border-stop" />
        {title}
      </h3>
      <div className="flex max-w-[62ch] flex-col gap-4">{children}</div>
    </div>
  )
}

export function SystemBlock({
  title,
  items,
  className,
}: {
  title: string
  items: React.ReactNode[]
  className?: string
}) {
  return (
    <div className={cn("rounded-xl bg-route-wash p-6 md:p-8", className)}>
      <h3 className="flex items-center gap-3 font-heading text-base font-semibold text-route">
        <span aria-hidden className="size-3 rounded-[2px] bg-route" />
        {title}
      </h3>
      <MarkerList tone="route" items={items} className="mt-5" />
    </div>
  )
}

export function ResultsBlock({ title, items }: { title: string; items: (TitledText | string)[] }) {
  return (
    <div>
      <h3 className={typeRole.title}>{title}</h3>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const heading = typeof item === "string" ? item : item.title
          const text = typeof item === "string" ? null : item.text
          return (
            <li key={heading} className="flex flex-col gap-3 bg-background p-6">
              <span aria-hidden className="grid size-7 place-items-center rounded-full bg-route text-white">
                <CheckIcon className="size-4" strokeWidth={3} />
              </span>
              <p className="font-heading text-lg leading-snug font-semibold">{heading}</p>
              {text ? <p className="text-muted-foreground">{text}</p> : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
