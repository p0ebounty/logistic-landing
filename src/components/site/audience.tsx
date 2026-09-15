import { TriangleAlertIcon } from "lucide-react"

import { Section, typeRole } from "@/components/site/primitives"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { audience } from "@/content/landing"

export function Audience() {
  return (
    <Section id="who-its-for" tone="warm" aria-labelledby="audience-title">
      <div className="shell grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <h2 id="audience-title" className={typeRole.headline}>
            {audience.title}
          </h2>
          <p className="mt-4 type-lead text-muted-foreground">{audience.intro}</p>
        </header>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {audience.pains.map((pain) => (
            <li key={pain.title} className="flex gap-4 border-t border-border py-6">
              <span aria-hidden className="mt-[0.55em] size-2.5 shrink-0 rotate-45 bg-stop" />
              <div>
                <h3 className="font-heading text-lg leading-snug font-semibold">{pain.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{pain.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <Alert variant="warning" role="note" className="lg:col-span-8 lg:col-start-5">
          <TriangleAlertIcon aria-hidden />
          <AlertTitle>{audience.warning.title}</AlertTitle>
          <AlertDescription>{audience.warning.text}</AlertDescription>
        </Alert>
      </div>
    </Section>
  )
}
