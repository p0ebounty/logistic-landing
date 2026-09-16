"use client"

import * as React from "react"

import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/** Where the reader's eye is, as a share of the viewport height. */
const READING_LINE = 0.58

/**
 * A list read like a teleprompter: the row at reading height is in full ink, the rest step back,
 * and a sodium marker follows the reader down the list. Items opt in with data-focus-item.
 */
export function FocusList({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      const list = root?.querySelector("ul")
      const marker = root?.querySelector<HTMLElement>("[data-focus-marker]")
      if (!root || !list || !marker) return
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-focus-item]", list)
        list.setAttribute("data-reading", "")

        // One tween per property, retargeted on every change: fast scrolling never leaves two tweens
        // fighting over the marker, which is what made it stick or flash back after leaving the list.
        const moveTo = gsap.quickTo(marker, "y", { duration: 0.6, ease: "expo.out" })
        const sizeTo = gsap.quickTo(marker, "height", { duration: 0.6, ease: "expo.out" })
        let active: HTMLElement | null = null

        const place = (item: HTMLElement, instantly: boolean) => {
          moveTo(item.offsetTop, instantly ? item.offsetTop : undefined)
          sizeTo(item.offsetHeight, instantly ? item.offsetHeight : undefined)
        }

        // The row under the reading line is read from the live layout, never from positions cached at refresh.
        const update = () => {
          const line = window.innerHeight * READING_LINE
          const item =
            items.find((candidate) => {
              const box = candidate.getBoundingClientRect()
              return box.top <= line && box.bottom > line
            }) ?? null
          if (item === active) return
          // A marker that was hidden appears on its row instead of sliding in from where it left.
          const appearing = active === null
          active = item
          for (const element of items) element.toggleAttribute("data-active", element === item)
          if (item) place(item, appearing)
          gsap.to(marker, { autoAlpha: item ? 1 : 0, duration: 0.3, overwrite: "auto" })
        }

        ScrollTrigger.create({
          trigger: list,
          start: "top bottom",
          end: "bottom top",
          onUpdate: update,
          onToggle: update,
          onRefresh: () => {
            if (active) place(active, true)
            update()
          },
        })
        update()

        return () => {
          list.removeAttribute("data-reading")
          for (const element of items) element.removeAttribute("data-active")
        }
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span
        aria-hidden
        data-focus-marker
        className="invisible absolute top-0 -left-4 h-0 w-[3px] rounded-full bg-sodium md:-left-7"
      />
      {children}
    </div>
  )
}
