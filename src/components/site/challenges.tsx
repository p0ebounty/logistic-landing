import { AnalyticsChapter, CrmChapter } from "@/components/site/chapters-data"
import { CallsChapter, LeadsChapter, TendersChapter } from "@/components/site/chapters-operations"
import { Section, typeRole } from "@/components/site/primitives"
import { challengesIntro, outline } from "@/content/landing"
import { cn } from "@/lib/utils"

const chapters = outline.find((item) => item.id === "challenges")?.children ?? []

export function Challenges() {
  return (
    <div id="challenges">
      <Section tone="ink" aria-labelledby="challenges-title" className="py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <h2 id="challenges-title" className={cn(typeRole.headline, "lg:col-span-6")}>
            {challengesIntro.title}
          </h2>
          <nav aria-label="Challenges" className="lg:col-span-6">
            <ul className="grid gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-2">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="sm:last:col-span-2">
                  <a
                    href={`#${chapter.id}`}
                    className="flex h-full items-center gap-3 bg-ink px-5 py-4 font-heading text-base font-semibold transition-colors outline-none hover:bg-ink-800 focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <span aria-hidden className="size-2.5 rounded-[2px] bg-route-bright" />
                    {chapter.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>
      <LeadsChapter />
      <CallsChapter />
      <TendersChapter />
      <CrmChapter />
      <AnalyticsChapter />
    </div>
  )
}
