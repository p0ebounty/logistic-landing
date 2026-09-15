"use client"

import * as React from "react"

import { gsap, MOTION, ScrollTrigger, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

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

        const activate = (item: HTMLElement | null) => {
          for (const element of items) element.toggleAttribute("data-active", element === item)
          if (item) {
            gsap.to(marker, { y: item.offsetTop, height: item.offsetHeight, autoAlpha: 1, duration: 0.8, ease: "expo.out" })
          } else {
            gsap.to(marker, { autoAlpha: 0, duration: 0.3 })
          }
        }

        for (const item of items) {
          ScrollTrigger.create({
            trigger: item,
            start: "top 58%",
            end: "bottom 58%",
            onToggle: (self) => self.isActive && activate(item),
          })
        }
        ScrollTrigger.create({
          trigger: list,
          start: "top 58%",
          end: "bottom 58%",
          onLeave: () => activate(null),
          onLeaveBack: () => activate(null),
        })

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
