import productLeadgen from "@/assets/images/product-leadgen.webp"
import { HorizontalScene } from "@/components/motion/horizontal-scene"
import { SplitReveal } from "@/components/motion/split-reveal"
import { typeRole } from "@/components/site/primitives"
import { ProductShot } from "@/components/site/product-shot"
import { services } from "@/content/landing"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="surface-ink overflow-x-clip">
      <HorizontalScene>
        {/* Horizontal track only with motion on wide screens; otherwise a plain grid that never hides content. */}
        <div
          data-h-viewport
          className="flex flex-col justify-center py-24 md:py-32 lg:motion-safe:h-svh lg:motion-safe:min-h-[40rem] lg:motion-safe:py-0"
        >
          <div className="shell">
            <SplitReveal as="h2" id="services-title" className={cn(typeRole.headline, "max-w-[24ch]")}>
              {services.title}
            </SplitReveal>
          </div>

          <div
            data-h-track
            className="mx-auto mt-12 grid max-w-[96rem] px-5 md:mt-16 md:grid-cols-2 md:gap-x-12 md:px-10 xl:grid-cols-3 xl:motion-reduce:px-16 lg:motion-safe:mx-0 lg:motion-safe:flex lg:motion-safe:w-max lg:motion-safe:max-w-none lg:motion-safe:gap-x-0 lg:motion-safe:pr-16 lg:motion-safe:pl-[max(4rem,calc((100vw-96rem)/2+4rem))]"
          >
            {services.items.map((service) => (
              <article
                key={service.title}
                className="border-t border-border py-9 lg:motion-safe:w-[26rem] lg:motion-safe:shrink-0 lg:motion-safe:border-t-0 lg:motion-safe:border-l lg:motion-safe:px-10 lg:motion-safe:py-1 lg:motion-safe:first:border-l-0 lg:motion-safe:first:pl-0"
              >
                <h3 className={cn(typeRole.title, "stretch-112")}>{service.title}</h3>
                <p className="mt-4 text-lg leading-relaxed font-medium">{service.lead}</p>
                <div className="mt-4 flex flex-col gap-3 text-muted-foreground">
                  {service.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
            <div className="border-t border-border pt-9 md:col-span-2 xl:col-span-3 lg:motion-safe:w-[44rem] lg:motion-safe:shrink-0 lg:motion-safe:border-t-0 lg:motion-safe:border-l lg:motion-safe:py-1 lg:motion-safe:pl-10">
              <div data-h-parallax className="origin-left">
                <ProductShot
                  image={productLeadgen}
                  alt="Lead gen in MagnaQore Logistic: organizations found on maps, filtered and handed to contacts"
                  caption="Lead gen: organizations found on maps, filtered against your base and handed to contacts"
                  sizes="(min-width: 64rem) 44rem, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </HorizontalScene>
    </section>
  )
}
