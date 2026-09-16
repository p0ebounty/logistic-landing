import { getImageProps } from "next/image"
import { PlayIcon } from "lucide-react"

import heroPortrait from "@/assets/images/hero-interchange-portrait.webp"
import heroWide from "@/assets/images/hero-interchange.webp"
import { HeroScene } from "@/components/site/hero-scene"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { hero } from "@/content/landing"
import { cn } from "@/lib/utils"

/** Slimmer hero buttons on phones leave more of the first screen to the "30". */
const COMPACT_ON_PHONES = "max-sm:min-h-12 max-sm:py-2.5 max-sm:text-[0.95rem]"

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
        className="pin-scene isolate grid min-h-lvh grid-cols-1 grid-rows-[auto_auto_auto_minmax(0,1fr)_var(--bleed)] overflow-hidden bg-night motion-reduce:min-h-svh lg:h-lvh lg:min-h-[calc(44rem+var(--bleed))] lg:grid-rows-[auto_minmax(2rem,1fr)_auto_auto_var(--bleed)] motion-reduce:lg:h-svh"
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
          {/* On phones the number takes whatever height the copy leaves on the first screen: its box is a size
              container, so the "30" scales to fit instead of running off the bottom. */}
          <div className="row-start-4 grid pb-[3svh] [container-type:size] lg:row-span-4 lg:row-start-1 lg:pb-0">
            <span
              data-hero-number
              className="self-end justify-self-center font-heading text-[length:min(62cqw,125cqh)] leading-[0.8] font-black tracking-[-0.03em] text-black stretch-125 lg:self-center lg:justify-self-end lg:pr-[3vw] lg:text-[length:min(37vw,76svh)]"
            >
              3<span data-hero-zero>0</span>
            </span>
          </div>
        </div>

        <div data-hero-copy className="shell relative col-start-1 row-span-full grid grid-rows-subgrid">
          <h1
            id="hero-title"
            className={cn(
              typeRole.hero,
              "row-start-1 max-w-[15ch] pt-[calc(var(--header-height)+1rem)] sm:pt-[calc(var(--header-height)+1.75rem)] lg:max-w-[12.5ch] lg:pt-[calc(var(--header-height)+3.5rem)]"
            )}
          >
            {hero.title}
          </h1>
          <p className="row-start-2 mt-4 max-w-[31rem] type-lead text-graphite sm:mt-5 lg:row-start-3 lg:mt-0">
            {hero.standfirst}
          </p>
          <div className="row-start-3 mt-6 flex flex-wrap items-center gap-2.5 pb-5 sm:mt-7 sm:gap-3 sm:pb-6 lg:row-start-4 lg:mt-8 lg:pb-12">
            <BookingLink className={COMPACT_ON_PHONES} />
            <Button asChild size="xl" variant="outline" className={COMPACT_ON_PHONES}>
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
