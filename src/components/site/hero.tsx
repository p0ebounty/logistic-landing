import { getImageProps } from "next/image"
import { PlayIcon } from "lucide-react"

import heroPortrait from "@/assets/images/hero-interchange-portrait.webp"
import heroWide from "@/assets/images/hero-interchange.webp"
import { HeroScene } from "@/components/site/hero-scene"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { hero } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Hero() {
  const common = { alt: "", fill: true, sizes: "100vw" }
  const {
    props: { srcSet: wideSrcSet },
  } = getImageProps({ ...common, src: heroWide })
  const {
    props: { srcSet: portraitSrcSet, ...imageProps },
  } = getImageProps({ ...common, src: heroPortrait })

  return (
    <HeroScene>
      {/* Paper and copy are two layers on one subgrid: the paper layer knocks the "30" out of itself
          (lighten blend over the photo) and lines up with the copy at every width without measuring. */}
      <div
        data-hero-stage
        className="sticky top-0 isolate grid min-h-svh grid-cols-1 grid-rows-[auto_auto_auto_minmax(12rem,1fr)] overflow-hidden bg-night motion-reduce:relative lg:h-svh lg:min-h-[44rem] lg:grid-rows-[auto_minmax(2rem,1fr)_auto_auto]"
      >
        <picture>
          <source media="(min-width: 48rem)" srcSet={wideSrcSet} />
          <source srcSet={portraitSrcSet} />
          <img
            {...imageProps}
            alt=""
            fetchPriority="high"
            loading="eager"
            data-hero-photo
            className="object-cover object-bottom md:object-right"
          />
        </picture>
        {/* Keeps the brightest light trails under the paper tone, so the blend leaves clean paper. */}
        <div aria-hidden className="absolute inset-0 bg-black/15" />

        <div
          aria-hidden
          data-hero-paper
          className="relative col-start-1 row-span-full grid grid-rows-subgrid bg-paper mix-blend-lighten"
        >
          <span
            data-hero-number
            className="row-start-4 self-end justify-self-center pb-[3svh] font-heading text-[min(62vw,42svh)] leading-[0.8] font-black tracking-[-0.03em] text-black stretch-125 lg:row-span-4 lg:row-start-1 lg:self-center lg:justify-self-end lg:pr-[3vw] lg:pb-0 lg:text-[min(37vw,76svh)]"
          >
            3<span data-hero-zero>0</span>
          </span>
        </div>

        <div data-hero-copy className="shell relative col-start-1 row-span-full grid grid-rows-subgrid">
          <h1
            id="hero-title"
            className={cn(
              typeRole.hero,
              "row-start-1 max-w-[15ch] pt-[calc(var(--header-height)+1.75rem)] lg:max-w-[12.5ch] lg:pt-[calc(var(--header-height)+3.5rem)]"
            )}
          >
            {hero.title}
          </h1>
          <p className="row-start-2 mt-5 max-w-[31rem] type-lead text-graphite lg:row-start-3 lg:mt-0">
            {hero.standfirst}
          </p>
          <div className="row-start-3 mt-7 flex flex-wrap items-center gap-3 pb-6 lg:row-start-4 lg:mt-8 lg:pb-12">
            <BookingLink />
            <Button asChild size="xl" variant="outline">
              <a href="#overview">
                <PlayIcon data-icon="inline-start" aria-hidden />
                {hero.secondaryAction}
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div data-hero-runway data-scene-runway aria-hidden className="hidden h-[100svh] motion-safe:block lg:h-[125svh]" />

      <div data-hero-stats data-scene-cover className="surface-ink relative motion-safe:bg-transparent">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-night)_8%,rgb(10_17_25/0.72)_50%,transparent)]"
        />
        <div className="shell relative flex min-h-svh flex-col justify-end pt-32 pb-14 md:pb-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {hero.stats.map((stat) => (
              <div key={stat.label} data-hero-stat className="flex flex-col border-t border-border pt-6">
                <dt className="order-2 mt-5 font-heading text-lg leading-tight font-semibold stretch-112">
                  {stat.label}
                </dt>
                <dd className="order-1 font-heading text-[clamp(3rem,1.7rem+4.2vw,6.5rem)] leading-[0.84] font-[780] whitespace-nowrap text-sodium stretch-75">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-1.5 text-[0.95rem] leading-snug text-muted-foreground">{stat.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </HeroScene>
  )
}
