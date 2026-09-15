import { ScrubMedia } from "@/components/motion/scrub-media"
import { SplitReveal } from "@/components/motion/split-reveal"
import { BookingLink, Section, typeRole } from "@/components/site/primitives"
import { VideoEmbed } from "@/components/site/video-embed"
import { OVERVIEW_VIDEO_ID, overview } from "@/content/landing"
import { cn } from "@/lib/utils"

/** "≤30 days" → the figure in condensed numerals, the unit set smaller beside it. */
function FactValue({ value }: { value: string }) {
  const [figure, ...unit] = value.split(" ")
  return (
    <>
      <span className="font-heading text-[clamp(3.25rem,2.2rem+3.2vw,5.5rem)] leading-[0.85] font-[780] tracking-[-0.02em] stretch-75">
        {figure}
      </span>
      {unit.length ? (
        <span className="font-heading text-[clamp(1.25rem,1.05rem+0.6vw,1.75rem)] leading-none font-semibold stretch-88">
          {" "}
          {unit.join(" ")}
        </span>
      ) : null}
    </>
  )
}

export function Overview() {
  return (
    <Section id="overview" aria-labelledby="overview-title" className="xl:pt-44">
      <div className="shell">
        <SplitReveal as="h2" id="overview-title" className={cn(typeRole.manifesto, "max-w-[23ch]")}>
          {overview.thesis}
        </SplitReveal>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
          <figure className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
            <ScrubMedia className="bg-night">
              <div data-scrub-inner>
                <VideoEmbed id={OVERVIEW_VIDEO_ID} title={overview.videoTitle} />
              </div>
            </ScrubMedia>
            <figcaption className="mt-4 text-[0.95rem] text-graphite">{overview.videoTitle}</figcaption>
          </figure>

          <dl className="flex flex-col gap-10 lg:col-span-4 lg:row-start-1 lg:justify-end lg:pb-12">
            {overview.principles.map((principle) => (
              <div key={principle.title} className="border-t border-border pt-6">
                <dt className={typeRole.title}>{principle.title}</dt>
                <dd className="mt-3 text-graphite">{principle.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-32 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {overview.facts.map((fact) => (
            <div key={fact.text} className="flex flex-col border-t border-asphalt pt-6">
              <dt className="order-2 mt-4 leading-snug text-graphite">{fact.text}</dt>
              <dd className="order-1 whitespace-nowrap">
                <FactValue value={fact.value} />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 flex flex-col gap-8 rounded-[1.75rem] bg-paper-deep p-7 md:mt-28 md:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-[40rem]">
            <p className="font-heading text-[clamp(1.6rem,1.2rem+1.3vw,2.5rem)] leading-[1.05] font-[630] tracking-[-0.025em] stretch-112">
              {overview.result}
            </p>
            <p className="mt-4 text-graphite">{overview.resultNote}</p>
          </div>
          <BookingLink className="self-start lg:self-center" />
        </div>
      </div>
    </Section>
  )
}
