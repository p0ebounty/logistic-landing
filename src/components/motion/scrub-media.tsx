"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP } from "@/lib/gsap"
import { cn } from "@/lib/utils"

/** Media that opens up while it scrolls into view: the frame widens from an inset window and the picture settles from a zoom. */
export function ScrubMedia({
  className,
  inset = "12% 9%",
  children,
}: {
  className?: string
  /** Starting inset of the window, as in clip-path inset(). */
  inset?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const frame = ref.current
      if (!frame) return
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const inner = frame.querySelector("[data-scrub-inner]") ?? frame.firstElementChild
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: frame, start: "top bottom", end: "top 20%", scrub: 0.6 },
          })
          .fromTo(frame, { clipPath: `inset(${inset} round 2.5rem)` }, { clipPath: "inset(0% 0% round 1.25rem)" }, 0)
          .fromTo(inner, { scale: 1.28 }, { scale: 1 }, 0)
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn("overflow-hidden rounded-[1.25rem]", className)}>
      {children}
    </div>
  )
}
