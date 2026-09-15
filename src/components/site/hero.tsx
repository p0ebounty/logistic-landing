import { getImageProps } from "next/image"
import { PlayIcon } from "lucide-react"

import heroPortrait from "@/assets/images/hero-interchange-portrait.webp"
import heroWide from "@/assets/images/hero-interchange.webp"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { hero } from "@/content/landing"
import { cn } from "@/lib/utils"

// Inner white rules of the guide sign: 2×2 on phones, one row of four from lg.
const statRules = [
  "border-r-2 border-b-2 lg:border-b-0",
  "border-b-2 lg:border-b-0 lg:border-r-2",
  "border-r-2",
  "",
]

export function Hero() {
  const common = { alt: "", fill: true, sizes: "100vw" }
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, src: heroWide })
  const {
    props: { srcSet: portraitSrcSet, ...imageProps },
  } = getImageProps({ ...common, src: heroPortrait })

  return (
    <section id="top" aria-labelledby="hero-title" className="surface-ink relative isolate overflow-hidden">
      <picture>
        <source media="(min-width: 48rem)" srcSet={wideSrcSet} />
        <source srcSet={portraitSrcSet} />
        <img {...imageProps} alt="" fetchPriority="high" loading="eager" className="-z-20 object-cover object-bottom md:object-right" />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-ink)_10%,rgb(10_29_42/0.8)_42%,rgb(10_29_42/0.2)_72%,rgb(10_29_42/0.6)_100%)] md:bg-[linear-gradient(90deg,var(--color-ink)_16%,rgb(10_29_42/0.85)_40%,rgb(10_29_42/0.15)_72%),linear-gradient(0deg,rgb(10_29_42/0.7)_0%,transparent_35%)]"
      />

      <div className="shell flex min-h-[calc(100svh-4rem)] flex-col justify-between gap-14 pt-14 pb-6 md:min-h-[min(calc(100svh-4rem),60rem)] md:pt-24 md:pb-12">
        <div className="max-w-[46rem]">
          <h1 id="hero-title" className={cn(typeRole.display, "animate-rise")}>
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[36rem] animate-rise type-lead text-on-ink-muted [animation-delay:120ms]">
            {hero.standfirst}
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
            <BookingLink />
            <Button asChild size="xl" variant="outline">
              <a href="#overview">
                <PlayIcon data-icon="inline-start" aria-hidden />
                {hero.secondaryAction}
              </a>
            </Button>
          </div>
        </div>

        <div className="animate-rise rounded-[0.95rem] bg-route p-[5px] text-white shadow-[0_30px_80px_-30px_rgb(0_0_0/0.75)] [animation-delay:420ms]">
          <dl className="grid grid-cols-2 rounded-[0.7rem] border-2 border-white/90 lg:grid-cols-4">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn("flex flex-col gap-1.5 border-white/90 px-4 py-5 sm:px-6 md:py-6", statRules[index])}
              >
                <dt className="order-2 font-heading text-base leading-tight font-semibold font-wide sm:text-lg">
                  {stat.label}
                </dt>
                <dd className="order-1 font-heading text-[clamp(1.6rem,1.05rem+2.7vw,3.5rem)] leading-none font-extrabold font-wide whitespace-nowrap tabular-nums">
                  {stat.value}
                </dd>
                <dd className="order-3 text-sm leading-snug text-white/80">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
