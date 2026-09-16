import type * as React from "react"
import Image, { type StaticImageData } from "next/image"
import { CheckIcon } from "lucide-react"

import { ScrubMedia } from "@/components/motion/scrub-media"
import { SplitReveal } from "@/components/motion/split-reveal"
import { ChapterScene } from "@/components/site/chapter-scene"
import { MarkerList, typeRole } from "@/components/site/primitives"
import { ProductShot } from "@/components/site/product-shot"
import type { TitledText } from "@/content/landing"
import { cn } from "@/lib/utils"

export type Screen = { image: StaticImageData; alt: string; caption: string }

/**
 * One challenge. Wide screens with motion: text on the left, a sticky frame on the right where the photo gives way
 * to each product screen as its step scrolls by. Phones and reduced motion: the screens sit inline at their steps.
 */
export function Chapter({
  id,
  title,
  lead,
  photo,
  screens,
  children,
}: {
  id: string
  title: string
  lead?: string
  photo?: StaticImageData
  screens: Screen[]
  children: React.ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border">
      <ChapterScene className="shell grid gap-x-16 lg:grid-cols-12">
        <div className="flex flex-col gap-14 py-20 md:gap-16 md:py-28 lg:col-span-8 lg:py-36 lg:motion-safe:col-span-6">
          <header>
            <SplitReveal as="h2" id={`${id}-title`} className={cn(typeRole.headline, "max-w-[17ch]")}>
              {title}
            </SplitReveal>
            {lead ? <p className="mt-6 max-w-[34rem] type-lead text-graphite">{lead}</p> : null}
          </header>
          {photo ? (
            <ScrubMedia className="relative aspect-[3/2] lg:motion-safe:hidden">
              <div data-scrub-inner className="absolute inset-0">
                <Image src={photo} alt="" fill sizes="(min-width: 64rem) 45vw, 100vw" placeholder="blur" className="object-cover" />
              </div>
            </ScrubMedia>
          ) : null}
          {children}
        </div>

        <div className="relative hidden lg:col-span-6 lg:motion-safe:block">
          <div className="sticky top-[calc(var(--header-height)+1rem)] flex h-[calc(100svh-var(--header-height)-2rem)] flex-col justify-center">
            <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-night shadow-[0_50px_100px_-50px_rgb(10_17_25/0.6)]">
              {photo ? (
                <div data-chapter-layer data-chapter-photo className="absolute inset-0">
                  <Image src={photo} alt="" fill sizes="45vw" placeholder="blur" className="object-cover" />
                </div>
              ) : null}
              {screens.map((screen) => (
                <div key={screen.alt} data-chapter-layer className="absolute inset-0 bg-night">
                  <ProductShot variant="frame" image={screen.image} alt={screen.alt} sizes="45vw" />
                </div>
              ))}
              {/* The sodium line that rides the edge of the wipe. */}
              <div data-chapter-edge aria-hidden className="pointer-events-none invisible absolute inset-0 z-10">
                <div className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-sodium" />
              </div>
            </div>
            <div className="relative mt-4 min-h-[3.2em] text-[0.95rem] text-graphite">
              {screens.map((screen) => (
                <p key={screen.alt} data-chapter-caption className="absolute inset-x-0 top-0">
                  {screen.caption}
                </p>
              ))}
            </div>
          </div>
        </div>
      </ChapterScene>
    </section>
  )
}

/** Marks where a product screen belongs: it triggers the frame on wide screens and shows inline otherwise. */
export function ChapterStep({ screen, children }: { screen: Screen; children?: React.ReactNode }) {
  return (
    <div data-chapter-step className="flex flex-col gap-14 md:gap-16">
      {children}
      <ProductShot image={screen.image} alt={screen.alt} caption={screen.caption} className="lg:motion-safe:hidden" />
    </div>
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
      <h3 className="flex gap-3 font-heading text-base font-semibold text-stop">
        <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-6 shrink-0 bg-stop" />
        {title}
      </h3>
      <div className="flex max-w-[36rem] flex-col gap-4">{children}</div>
    </div>
  )
}

export function SystemBlock({ title, items, className }: { title: string; items: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("rounded-[1.5rem] bg-paper-deep p-6 md:p-9", className)}>
      <h3 className="flex gap-3 font-heading text-base font-semibold text-go">
        <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-6 shrink-0 bg-go" />
        {title}
      </h3>
      <MarkerList tone="go" items={items} className="mt-5" />
    </div>
  )
}

export function ResultsBlock({ title, items }: { title: string; items: (TitledText | string)[] }) {
  return (
    <div>
      <h3 className={typeRole.title}>{title}</h3>
      <ul className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {items.map((item) => {
          const heading = typeof item === "string" ? item : item.title
          const text = typeof item === "string" ? null : item.text
          return (
            <li key={heading} className="flex flex-col gap-2.5 border-t border-border pt-5">
              <span aria-hidden className="grid size-7 place-items-center rounded-full bg-go text-white">
                <CheckIcon className="size-4" strokeWidth={3} />
              </span>
              <p className="font-heading text-lg leading-snug font-semibold">{heading}</p>
              {text ? <p className="text-graphite">{text}</p> : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
