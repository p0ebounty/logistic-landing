"use client"

import * as React from "react"
import Image from "next/image"
import { MenuIcon } from "lucide-react"

import mqMark from "@/assets/brand/mq-mark.png"
import { BookingLink } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navigation, outline } from "@/content/landing"

const NAV_IDS = navigation.map((item) => item.id)
const SHORT_BOOKING_LABEL = "Book a strategy call"

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) setActive(id)
          else setActive((current) => (current === id ? null : current))
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function SiteHeader() {
  const active = useActiveSection(NAV_IDS)
  const [open, setOpen] = React.useState(false)
  const pendingTarget = React.useRef<string | null>(null)

  // The sheet locks page scroll while open, so jump only after it has closed.
  function queueJump(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    pendingTarget.current = id
    setOpen(false)
  }

  function jumpAfterClose(event: Event) {
    const id = pendingTarget.current
    if (!id) return
    event.preventDefault()
    pendingTarget.current = null
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
      history.replaceState(null, "", `#${id}`)
    })
  }

  return (
    <header className="surface-ink sticky top-0 z-40 border-b border-border">
      <div className="shell flex h-16 items-center gap-3">
        <a
          href="#top"
          className="mr-auto flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring"
        >
          <Image src={mqMark} alt="" className="h-7 w-auto" preload />
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            <span className="font-serif text-[1.35rem] leading-none">MagnaQore</span>
            <span className="font-heading text-[0.95rem] font-semibold font-wide text-muted-foreground">
              Logistic
            </span>
          </span>
        </a>

        <nav aria-label="Page sections" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="block rounded-md px-3 py-2 text-[0.95rem] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring aria-[current=true]:text-foreground aria-[current=true]:shadow-[inset_0_-2px_0_var(--color-brass-bright)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BookingLink label={SHORT_BOOKING_LABEL} size="lg" className="ml-2 hidden sm:inline-flex" />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="xl:hidden" aria-label="Open page sections">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="surface-ink w-[min(22rem,88vw)] gap-0 border-border p-0"
            onCloseAutoFocus={jumpAfterClose}
          >
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="text-lg font-semibold font-wide">MagnaQore Logistic</SheetTitle>
              <SheetDescription>Jump to any part of the page</SheetDescription>
            </SheetHeader>
            <nav aria-label="Page sections" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col">
                {outline.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => queueJump(event, item.id)}
                      className="block rounded-md px-3 py-2.5 text-base font-medium outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring"
                    >
                      {item.label}
                    </a>
                    {item.children ? (
                      <ul className="mb-2 ml-4 flex flex-col border-l border-border pl-2">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <a
                              href={`#${child.id}`}
                              onClick={(event) => queueJump(event, child.id)}
                              className="block rounded-md px-3 py-2 text-[0.95rem] text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
            <SheetFooter className="border-t border-border p-5">
              <BookingLink label={SHORT_BOOKING_LABEL} className="w-full" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div aria-hidden className="scroll-progress absolute inset-x-0 -bottom-px h-0.5 bg-brass-bright" />
    </header>
  )
}
