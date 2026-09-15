import { FocusList } from "@/components/motion/focus-list"
import { SplitReveal } from "@/components/motion/split-reveal"
import { Section, typeRole } from "@/components/site/primitives"
import { audience } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Audience() {
  return (
    <Section id="who-its-for" tone="deep" aria-labelledby="audience-title">
      <div className="shell grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <SplitReveal as="h2" id="audience-title" className={typeRole.headline}>
              {audience.title}
            </SplitReveal>
            <p className="mt-5 type-lead text-graphite">{audience.intro}</p>
          </div>
        </header>

        <div className="lg:col-span-8">
          <FocusList>
            <ul className="border-b border-border">
              {audience.pains.map((pain) => (
                <li
                  key={pain.title}
                  data-focus-item
                  className="group/row grid gap-x-10 gap-y-2 border-t border-border py-7 transition-colors duration-500 md:grid-cols-2 md:py-9 in-data-reading:text-graphite in-data-reading:data-active:text-foreground"
                >
                  <h3 className="font-heading text-[clamp(1.4rem,1.1rem+0.95vw,2.125rem)] leading-[1.06] font-semibold tracking-[-0.02em] stretch-112">
                    {pain.title}
                  </h3>
                  <p className="text-graphite md:pt-1.5">{pain.text}</p>
                </li>
              ))}
            </ul>
          </FocusList>

          <p role="note" className="mt-16 flex flex-col gap-3 md:mt-20">
            <span className="flex items-center gap-3 font-heading font-semibold text-stop">
              <span aria-hidden className="h-0.5 w-8 bg-stop" />
              {audience.warning.title}
            </span>
            <span className={cn(typeRole.statement, "max-w-[24ch]")}>{audience.warning.text}</span>
          </p>
        </div>
      </div>
    </Section>
  )
}
