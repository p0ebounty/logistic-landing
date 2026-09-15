import type * as React from "react"

import { StackScene } from "@/components/motion/stack-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { MarkerList, Section, typeRole } from "@/components/site/primitives"
import { whyMagnaQore } from "@/content/landing"
import { cn } from "@/lib/utils"

export function WhyMagnaQore() {
  return (
    <Section id="why-magnaqore" aria-labelledby="why-title">
      <div className="shell">
        <SplitReveal as="h2" id="why-title" className={cn(typeRole.display, "max-w-[12ch]")}>
          {whyMagnaQore.title}
        </SplitReveal>

        <StackScene className="mt-14 flex flex-col gap-5 md:mt-20 lg:motion-safe:gap-[12svh]">
          {whyMagnaQore.reasons.map((reason, index) => (
            <article
              key={reason.title}
              data-stack-card
              style={{ "--stack-index": index } as React.CSSProperties}
              className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 md:p-12 lg:top-[calc(var(--header-height)+1.25rem+var(--stack-index)*1.25rem)] lg:motion-safe:sticky lg:flex lg:min-h-[min(30rem,60svh)] lg:flex-col lg:justify-center lg:p-16"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
                <h3 className={cn(typeRole.headline, "lg:col-span-5")}>{reason.title}</h3>
                <div className="flex flex-col gap-5 lg:col-span-7 lg:pt-1">
                  {reason.text ? <p className="type-lead">{reason.text}</p> : null}
                  {reason.example ? (
                    <div className="rounded-2xl bg-paper-deep p-5 md:p-6">
                      <p className="text-[0.95rem] font-semibold text-graphite">{reason.exampleTitle}</p>
                      <dl className="mt-2 flex flex-col">
                        {reason.example.map(([label, value], row) => (
                          <div
                            key={label}
                            className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 last:border-0 last:pb-0"
                          >
                            <dt>{label}</dt>
                            <dd
                              className={cn(
                                "text-right font-heading text-lg font-bold",
                                row === reason.example.length - 1 && "text-go"
                              )}
                            >
                              {value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}
                  {reason.outro ? <p className="text-graphite">{reason.outro}</p> : null}
                  {reason.list ? <MarkerList tone="go" items={reason.list} className="type-lead" /> : null}
                </div>
              </div>
              <div aria-hidden data-stack-shade className="pointer-events-none absolute inset-0 bg-asphalt/10 opacity-0" />
            </article>
          ))}
        </StackScene>

        <div className="surface-ink mt-16 rounded-[1.75rem] p-8 md:mt-24 md:p-14">
          <p className="font-heading text-base font-semibold text-sodium">{whyMagnaQore.resultTitle}</p>
          <p className={cn(typeRole.statement, "mt-4 max-w-[32ch]")}>{whyMagnaQore.result}</p>
        </div>
      </div>
    </Section>
  )
}
