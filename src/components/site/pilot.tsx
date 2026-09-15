import Image from "next/image"

import pilotHighway from "@/assets/images/pilot-highway.webp"
import { BookingLink, MarkerList, typeRole } from "@/components/site/primitives"
import { pilot } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="surface-ink relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[min(85vh,52rem)]">
        <Image src={pilotHighway} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-bottom" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_29_42/0.35)_0%,rgb(10_29_42/0.7)_45%,var(--color-ink)_100%)]" />
      </div>

      <div className="shell py-24 md:py-32">
        <h2 id="pilot-title" className={cn(typeRole.display, "max-w-[18ch]")}>
          {pilot.title}
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-heading text-lg font-semibold text-on-ink-muted">{pilot.tiredOfTitle}</p>
            <MarkerList tone="stop" items={pilot.tiredOf} className="mt-5 text-lg" />
            <p className="mt-8 type-lead">{pilot.waiting}</p>
          </div>

          <div className="rounded-xl bg-ink-800/85 p-6 ring-1 ring-border backdrop-blur-sm md:p-10 lg:col-span-7">
            <p className="font-heading text-base font-semibold text-brass-bright">{pilot.offerTitle}</p>
            <p className={cn(typeRole.statement, "mt-3")}>{pilot.offer}</p>
            <p className="mt-10 font-heading text-base font-semibold text-on-ink-muted">{pilot.includedTitle}</p>
            <div className="mt-5 grid gap-8 md:grid-cols-3">
              {pilot.included.map((group) => (
                <div key={group.title}>
                  <h3 className="font-heading text-lg leading-snug font-semibold">{group.title}</h3>
                  <MarkerList tone="route" items={group.items} className="mt-3 text-[0.975rem] text-on-ink-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-border pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h3 className={typeRole.title}>{pilot.callTitle}</h3>
            <p className="mt-4 max-w-[60ch] type-lead text-on-ink-muted">{pilot.call}</p>
            <div className="mt-8">
              <BookingLink />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5">
            {pilot.closing.map((line) => (
              <p key={line} className="text-lg">
                {line}
              </p>
            ))}
            <p className={cn(typeRole.statement, "mt-6 text-brass-bright")}>{pilot.signoff}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
