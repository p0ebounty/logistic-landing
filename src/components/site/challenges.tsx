import { SplitReveal } from "@/components/motion/split-reveal"
import { AnalyticsChapter, CrmChapter } from "@/components/site/chapters-data"
import { CallsChapter, LeadsChapter, TendersChapter } from "@/components/site/chapters-operations"
import { typeRole } from "@/components/site/primitives"
import { challengesIntro, outline } from "@/content/landing"
import { cn } from "@/lib/utils"

const chapters = outline.find((item) => item.id === "challenges")?.children ?? []

export function Challenges() {
  return (
    <div id="challenges">
      <section aria-labelledby="challenges-title" className="py-24 md:py-32 xl:py-40">
        <div className="shell">
          <SplitReveal as="h2" id="challenges-title" className={cn(typeRole.display, "max-w-[15ch]")}>
            {challengesIntro.title}
          </SplitReveal>
          <nav aria-label="Challenges" className="mt-12 md:mt-16">
            <ul className="flex flex-wrap gap-2.5">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    className="inline-flex items-center rounded-full border border-asphalt/20 px-5 py-2.5 font-medium transition-colors outline-none hover:border-asphalt hover:bg-asphalt hover:text-paper focus-visible:ring-3 focus-visible:ring-ring"
                  >
                    {chapter.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <LeadsChapter />
      <CallsChapter />
      <TendersChapter />
      <CrmChapter />
      <AnalyticsChapter />
    </div>
  )
}
