import Image from "next/image"

import pilotHighway from "@/assets/images/pilot-highway.webp"
import { SplitReveal } from "@/components/motion/split-reveal"
import { PilotScene } from "@/components/site/pilot-scene"
import { BookingLink, MarkerList, typeRole } from "@/components/site/primitives"
import { pilot } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="surface-ink">
      <PilotScene>
        <div className="sticky top-0 h-svh min-h-[34rem] overflow-hidden motion-reduce:relative">
          <div data-pilot-window className="absolute inset-0 overflow-hidden">
            <Image
              data-pilot-photo
              src={pilotHighway}
              alt=""
              fill
              // A 21:9 photo covering a taller screen renders wider than the viewport.
              sizes="(max-aspect-ratio: 21/9) 234vh, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_62%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_17_25/0.6)_0%,rgb(10_17_25/0.05)_48%,rgb(10_17_25/0.9)_100%)]"
            />
          </div>
          <div className="shell relative pt-[calc(var(--header-height)+3.5rem)]">
            <SplitReveal as="h2" id="pilot-title" className={cn(typeRole.display, "max-w-[14ch]")}>
              {pilot.title}
            </SplitReveal>
          </div>
        </div>
        <div data-pilot-runway data-scene-runway aria-hidden className="hidden h-[90svh] motion-safe:block" />
      </PilotScene>

      <div className="shell pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-heading text-lg font-semibold text-muted-foreground">{pilot.tiredOfTitle}</p>
            <MarkerList tone="stop" items={pilot.tiredOf} className="mt-6 type-lead" />
            <p className="mt-10 type-lead">{pilot.waiting}</p>
          </div>

          <div className="lg:col-span-7">
            <p className="font-heading text-base font-semibold text-sodium">{pilot.offerTitle}</p>
            <p className={cn(typeRole.statement, "mt-4")}>{pilot.offer}</p>
            <p className="mt-12 font-heading text-base font-semibold text-muted-foreground">{pilot.includedTitle}</p>
            <div className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8">
              {pilot.included.map((group) => (
                <div key={group.title} className="border-t border-border pt-5">
                  <h3 className="font-heading text-lg leading-snug font-semibold stretch-112">{group.title}</h3>
                  <MarkerList tone="go" items={group.items} className="mt-4 text-[0.975rem] text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-14 border-t border-border pt-16 md:mt-32 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <h3 className={cn(typeRole.headline, "max-w-[20ch]")}>{pilot.callTitle}</h3>
            <p className="mt-6 max-w-[60ch] type-lead text-muted-foreground">{pilot.call}</p>
            <div className="mt-10">
              <BookingLink />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-2">
            {pilot.closing.map((line) => (
              <p key={line} className="type-lead">
                {line}
              </p>
            ))}
            <p className={cn(typeRole.statement, "mt-8 text-sodium")}>{pilot.signoff}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
