import { SplitReveal } from "@/components/motion/split-reveal"
import { PlanMatrix } from "@/components/site/plan-matrix"
import { BookingLink, Section, typeRole } from "@/components/site/primitives"
import { bundles, inHouseColumn, plans, versusInHouse } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Packages() {
  return (
    <>
      <Section id="packages" aria-labelledby="packages-title">
        <div className="shell">
          <SplitReveal as="h2" id="packages-title" className={cn(typeRole.display, "max-w-[14ch]")}>
            {bundles.title}
          </SplitReveal>
          <div className="mt-14 md:mt-20">
            <PlanMatrix
              caption={bundles.title}
              rowHeader={bundles.rowHeader}
              columns={plans}
              groups={bundles.groups}
              recommendedLabel={bundles.recommendedLabel}
            />
          </div>
          <div className="mt-14">
            <BookingLink />
          </div>
        </div>
      </Section>

      <Section id="vs-in-house" tone="deep" aria-labelledby="vs-in-house-title">
        <div className="shell">
          <SplitReveal as="h2" id="vs-in-house-title" className={cn(typeRole.headline, "max-w-[20ch]")}>
            {versusInHouse.title}
          </SplitReveal>
          <div className="mt-12 md:mt-16">
            <PlanMatrix
              caption={versusInHouse.title}
              rowHeader={versusInHouse.rowHeader}
              columns={[...plans, { ...inHouseColumn, inHouse: true }]}
              groups={[{ rows: versusInHouse.rows }]}
              recommendedLabel={bundles.recommendedLabel}
              surfaceClassName="bg-paper-deep"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
