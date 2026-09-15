import { MarkerList, Section, typeRole } from "@/components/site/primitives"
import { whyMagnaQore } from "@/content/landing"
import { cn } from "@/lib/utils"

export function WhyMagnaQore() {
  return (
    <Section id="why-magnaqore" tone="warm" aria-labelledby="why-title">
      <div className="shell">
        <h2 id="why-title" className={typeRole.headline}>
          {whyMagnaQore.title}
        </h2>

        <div className="mt-14 grid gap-x-12 md:grid-cols-2 xl:grid-cols-3">
          {whyMagnaQore.reasons.map((reason) => (
            <article key={reason.title} className="flex flex-col gap-3 border-t border-border py-8">
              <h3 className={typeRole.title}>{reason.title}</h3>
              {reason.text ? <p>{reason.text}</p> : null}
              {reason.example ? (
                <div className="mt-2 rounded-lg bg-background p-5 ring-1 ring-border">
                  <p className="text-sm font-semibold text-muted-foreground">{reason.exampleTitle}</p>
                  <dl className="mt-3 flex flex-col gap-2">
                    {reason.example.map(([label, value], index) => (
                      <div
                        key={label}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-border pb-2 last:border-0 last:pb-0"
                      >
                        <dt>{label}</dt>
                        <dd
                          className={cn(
                            "text-right font-heading font-bold tabular-nums",
                            index === reason.example.length - 1 && "text-route"
                          )}
                        >
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
              {reason.outro ? <p className="text-muted-foreground">{reason.outro}</p> : null}
              {reason.list ? <MarkerList tone="route" items={reason.list} /> : null}
            </article>
          ))}
        </div>

        <div className="surface-ink mt-10 rounded-xl p-6 md:p-10">
          <p className="font-heading text-base font-semibold text-brass-bright">{whyMagnaQore.resultTitle}</p>
          <p className={cn(typeRole.statement, "mt-3 max-w-[40ch]")}>{whyMagnaQore.result}</p>
        </div>
      </div>
    </Section>
  )
}
