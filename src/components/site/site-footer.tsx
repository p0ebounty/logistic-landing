import Image from "next/image"

import mqMark from "@/assets/brand/mq-mark.png"
import { BookingLink } from "@/components/site/primitives"
import { overview } from "@/content/landing"

export function SiteFooter() {
  return (
    <footer className="surface-ink border-t border-border bg-ink-deep">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring"
          >
            <Image src={mqMark} alt="" className="h-8 w-auto" />
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif text-2xl leading-none">MagnaQore</span>
              <span className="font-heading text-base font-semibold font-wide text-muted-foreground">Logistic</span>
            </span>
          </a>
          <p className="mt-4 max-w-[42ch] text-muted-foreground">{overview.thesis}</p>
        </div>
        <div className="flex flex-col items-start gap-5 md:items-end">
          <BookingLink />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a href="https://magnaqore.io" className="underline underline-offset-4 hover:text-foreground">
              MagnaQore
            </a>
            . AI sales department for US and Canadian logistics.
          </p>
        </div>
      </div>
    </footer>
  )
}
