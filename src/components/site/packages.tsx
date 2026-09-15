import { PlanMatrix } from "@/components/site/plan-matrix"
import { BookingLink, Section, typeRole } from "@/components/site/primitives"
import { bundles, inHouseColumn, plans, versusInHouse } from "@/content/landing"

export function Packages() {
  return (
    <>
      <Section id="packages" tone="warm" aria-labelledby="packages-title">
        <div className="shell">
          <h2 id="packages-title" className={typeRole.headline}>
            {bundles.title}
          </h2>
          <div className="mt-12">
            <PlanMatrix
              caption={bundles.title}
              rowHeader={bundles.rowHeader}
              columns={plans}
              groups={bundles.groups}
              recommendedLabel={bundles.recommendedLabel}
            />
          </div>
          <div className="mt-12">
            <BookingLink />
          </div>
        </div>
      </Section>

      <Section id="vs-in-house" aria-labelledby="vs-in-house-title">
        <div className="shell">
          <h2 id="vs-in-house-title" className={typeRole.headline}>
            {versusInHouse.title}
          </h2>
          <div className="mt-12">
            <PlanMatrix
              caption={versusInHouse.title}
              rowHeader={versusInHouse.rowHeader}
              columns={[...plans, { ...inHouseColumn, inHouse: true }]}
              groups={[{ rows: versusInHouse.rows }]}
              recommendedLabel={bundles.recommendedLabel}
              surfaceClassName="bg-background"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
