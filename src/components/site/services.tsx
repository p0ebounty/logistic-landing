import productLeadgen from "@/assets/images/product-leadgen.webp"
import { Section, typeRole } from "@/components/site/primitives"
import { ProductShot } from "@/components/site/product-shot"
import { services } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <Section id="services" tone="band" aria-labelledby="services-title">
      <div className="shell">
        <h2 id="services-title" className={cn(typeRole.headline, "max-w-[26ch]")}>
          {services.title}
        </h2>

        <div className="mt-14 grid gap-x-16 lg:grid-cols-2">
          {services.items.map((service) => (
            <article key={service.title} className="border-t border-border py-9">
              <h3 className={typeRole.title}>{service.title}</h3>
              <p className="mt-3 text-[1.125rem] leading-relaxed font-medium">{service.lead}</p>
              <div className="mt-4 flex flex-col gap-3 text-muted-foreground">
                {service.details.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <ProductShot
          image={productLeadgen}
          alt="Lead gen in MagnaQore Logistic: organizations found on maps, filtered and handed to contacts"
          caption="Lead gen: organizations found on maps, filtered against your base and handed to contacts"
          className="mt-10"
        />
      </div>
    </Section>
  )
}
