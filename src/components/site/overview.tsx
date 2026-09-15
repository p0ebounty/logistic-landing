import { BookingLink, Section, typeRole } from "@/components/site/primitives"
import { VideoEmbed } from "@/components/site/video-embed"
import { OVERVIEW_VIDEO_ID, overview } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Overview() {
  return (
    <Section id="overview" aria-labelledby="overview-title">
      <div className="shell grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="overview-title" className={cn(typeRole.statement, "max-w-[20ch]")}>
            {overview.thesis}
          </h2>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-border pt-8 sm:grid-cols-3 lg:grid-cols-2">
            {overview.facts.map((fact) => (
              <div key={fact.text} className="flex flex-col gap-1.5">
                <dt className="order-2 text-[0.95rem] leading-snug text-muted-foreground">{fact.text}</dt>
                <dd className="order-1 font-heading text-[2rem] leading-none font-extrabold font-wide">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <figure>
            <div className="overflow-hidden rounded-xl bg-ink shadow-[0_24px_60px_-28px_rgb(10_29_42/0.55)] ring-1 ring-border">
              <VideoEmbed id={OVERVIEW_VIDEO_ID} title={overview.videoTitle} />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">{overview.videoTitle}</figcaption>
          </figure>
          <dl className="grid gap-8 sm:grid-cols-2">
            {overview.principles.map((principle) => (
              <div key={principle.title} className="border-l-2 border-route pl-5">
                <dt className="font-heading type-title font-semibold">{principle.title}</dt>
                <dd className="mt-2 text-muted-foreground">{principle.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-6 border-t border-border pt-10 lg:col-span-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading type-title font-semibold">{overview.result}</p>
            <p className="mt-1 text-muted-foreground">{overview.resultNote}</p>
          </div>
          <BookingLink />
        </div>
      </div>
    </Section>
  )
}
