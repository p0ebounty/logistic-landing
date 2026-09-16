import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import mqMark from "@/assets/brand/mq-mark.png"
import { SplitReveal } from "@/components/motion/split-reveal"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { reportMeta, reportSections } from "@/content/example-report"
import { cn } from "@/lib/utils"

export function ReportHeader() {
  return (
    <>
      <header className="surface-ink border-b border-border">
        <div className="shell flex h-(--header-height) items-center gap-3">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <Image src={mqMark} alt="" className="h-7 w-auto" preload />
            <span className="flex items-baseline gap-1.5 font-heading whitespace-nowrap">
              <span className="text-[1.15rem] leading-none font-bold stretch-112">MagnaQore</span>
              <span className="text-[0.95rem] leading-none font-medium text-muted-foreground">Logistic</span>
            </span>
          </Link>
          <Button asChild variant="ghost" size="lg" className="hidden rounded-full md:inline-flex">
            <Link href="/#analytics">
              <ArrowLeftIcon data-icon="inline-start" aria-hidden />
              Back to the landing
            </Link>
          </Button>
          <BookingLink label="Book a strategy call" size="lg" className="hidden sm:inline-flex" />
        </div>
      </header>

      <section id="top" aria-labelledby="report-title" className="surface-ink">
        <div className="shell pt-16 pb-16 md:pt-24 md:pb-24">
          <p className="font-heading font-semibold text-sodium">Example report</p>
          <SplitReveal as="h1" id="report-title" className={cn(typeRole.display, "mt-5 max-w-[17ch]")}>
            {reportMeta.title}
          </SplitReveal>
          <p className="mt-6 type-lead text-muted-foreground">
            {reportMeta.client}. {reportMeta.period}.
          </p>
          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-20 lg:grid-cols-4 lg:gap-x-10">
            {reportMeta.headline.map((item, index) => (
              <div key={item.label} className="flex flex-col border-t border-border pt-5">
                <dt className="order-2 mt-3 leading-snug text-muted-foreground">{item.label}</dt>
                <dd
                  className={cn(
                    "order-1 font-heading text-[clamp(2.5rem,1.6rem+3vw,4.75rem)] leading-[0.86] font-[780] whitespace-nowrap stretch-75",
                    index === 0 && "text-sodium"
                  )}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav aria-label="Report sections" className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        {/* On narrow screens the links scroll sideways: the fading edge shows there is more, and the end padding
            lets the last link come clear of the fade. */}
        <ul className="shell flex gap-1 overflow-x-auto py-2 max-md:pr-12 max-md:[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]">
          {reportSections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="block rounded-full px-4 py-2 text-[0.95rem] font-medium text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
