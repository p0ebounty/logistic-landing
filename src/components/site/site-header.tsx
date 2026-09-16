"use client"

import * as React from "react"
import Image from "next/image"
import { useLenis } from "lenis/react"
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
import { MOTION } from "@/lib/motion-queries"
import { useMediaQuery } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"

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

/** Hides while reading down, returns on the first scroll up; stays put for reduced motion. */
function useHeaderState() {
  const motion = useMediaQuery(MOTION)
  const [state, setState] = React.useState({ hidden: false, scrolled: false })

  React.useEffect(() => {
    let lastY = window.scrollY
    // Distance moved in the current direction, so slow steady scrolling (autoplay) counts like a flick.
    let travel = 0
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY
      lastY = y
      if (delta !== 0) travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
      setState((current) => {
        const scrolled = y > 8
        let hidden = current.hidden
        if (!motion || y < 160) hidden = false
        else if (travel > 6) hidden = true
        else if (travel < -6) hidden = false
        return current.hidden === hidden && current.scrolled === scrolled ? current : { hidden, scrolled }
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [motion])

  // Sticky table headers and similar elements sit under the header only while it is shown.
  React.useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", state.hidden ? "0px" : "var(--header-height)")
  }, [state.hidden])

  const reveal = React.useCallback(() => setState((current) => (current.hidden ? { ...current, hidden: false } : current)), [])
  return { ...state, reveal }
}

export function SiteHeader() {
  const active = useActiveSection(NAV_IDS)
  const { hidden, scrolled, reveal } = useHeaderState()
  const lenis = useLenis()
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
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (!target) return
      if (lenis) lenis.scrollTo(target, { offset: -96 })
      else target.scrollIntoView()
      history.replaceState(null, "", `#${id}`)
    })
  }

  return (
    <header
      data-hidden={hidden || undefined}
      onFocusCapture={reveal}
      className="fixed inset-x-0 top-0 z-40 transition-transform duration-700 ease-expo data-hidden:-translate-y-[calc(100%+2px)]"
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 border-b transition-colors duration-300",
          scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent"
        )}
      />
      <div className="shell flex h-(--header-height) items-center gap-3">
        <a
          href="#top"
          className="mr-auto flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring"
        >
          <Image src={mqMark} alt="" className="h-7 w-auto" preload />
          <span className="flex items-baseline gap-1.5 font-heading whitespace-nowrap">
            <span className="text-[1.15rem] leading-none font-bold stretch-112">MagnaQore</span>
            <span className="text-[0.95rem] leading-none font-medium text-muted-foreground">Logistic</span>
          </span>
        </a>

        <nav aria-label="Page sections" className="hidden xl:block">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className="relative block rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-muted-foreground transition-colors outline-none after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sodium after:transition-transform hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring aria-[current=true]:text-foreground aria-[current=true]:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <BookingLink label={SHORT_BOOKING_LABEL} size="lg" className="ml-3 hidden sm:inline-flex" />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="rounded-full xl:hidden" aria-label="Open page sections">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            data-lenis-prevent
            className="w-[min(24rem,90vw)] gap-0 bg-background p-0 text-foreground"
            onCloseAutoFocus={jumpAfterClose}
          >
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="text-lg font-bold stretch-112">MagnaQore Logistic</SheetTitle>
              <SheetDescription>Jump to any part of the page</SheetDescription>
            </SheetHeader>
            <nav aria-label="Page sections" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col">
                {outline.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => queueJump(event, item.id)}
                      className="block rounded-lg px-3 py-2.5 font-heading text-lg font-semibold stretch-112 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring"
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
                              className="block rounded-lg px-3 py-2 text-[0.95rem] text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring"
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
      <div
        aria-hidden
        className={cn(
          "scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-sodium transition-opacity",
          !scrolled && "opacity-0"
        )}
      />
    </header>
  )
}
