import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import mqMark from "@/assets/brand/mq-mark.png"
import { BookingLink, typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import { reportMeta, reportSections } from "@/content/example-report"

export function ReportHeader() {
  return (
    <>
      <header className="surface-ink border-b border-border">
        <div className="shell flex h-16 items-center gap-3">
          <Link
            href="/"
            className="mr-auto flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <Image src={mqMark} alt="" className="h-7 w-auto" preload />
            <span className="flex items-baseline gap-1.5 whitespace-nowrap">
              <span className="font-serif text-[1.35rem] leading-none">MagnaQore</span>
              <span className="font-heading text-[0.95rem] font-semibold font-wide text-muted-foreground">Logistic</span>
            </span>
          </Link>
          <Button asChild variant="ghost" size="lg" className="hidden md:inline-flex">
            <Link href="/#analytics">
              <ArrowLeftIcon data-icon="inline-start" aria-hidden />
              Back to the landing
            </Link>
          </Button>
          <BookingLink label="Book a strategy call" size="lg" className="hidden sm:inline-flex" />
        </div>
      </header>

      <section id="top" aria-labelledby="report-title" className="surface-ink">
        <div className="shell pt-14 pb-16 md:pt-20 md:pb-24">
          <p className="text-on-ink-muted">Example report</p>
          <h1 id="report-title" className={typeRole.display}>
            {reportMeta.title}
          </h1>
          <p className="mt-5 type-lead text-on-ink-muted">
            {reportMeta.client}. {reportMeta.period}.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border lg:grid-cols-4">
            {reportMeta.headline.map((item, index) => (
              <div key={item.label} className="flex flex-col gap-2 bg-ink-800 p-5 md:p-7">
                <dt className="order-2 text-sm text-on-ink-muted md:text-base">{item.label}</dt>
                <dd
                  className={
                    index === 0
                      ? "order-1 font-heading text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-none font-extrabold font-wide text-brass-bright"
                      : "order-1 font-heading text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] leading-none font-extrabold font-wide"
                  }
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav aria-label="Report sections" className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <ul className="shell flex gap-1 overflow-x-auto py-2">
          {reportSections.map((section) => (
            <li key={section.id} className="shrink-0">
              <a
                href={`#${section.id}`}
                className="block rounded-md px-3 py-2 text-[0.95rem] font-medium text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
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
