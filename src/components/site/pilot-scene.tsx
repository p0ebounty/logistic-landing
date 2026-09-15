"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP, WIDE } from "@/lib/gsap"

/** Closing scene: the road opens from a window to the whole screen while the question stays in place. */
export function PilotScene({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add({ motion: MOTION, wide: WIDE }, (context) => {
        const { motion, wide } = context.conditions ?? {}
        const runway = root.querySelector("[data-pilot-runway]")
        const frame = root.querySelector("[data-pilot-window]")
        const photo = root.querySelector("[data-pilot-photo]")
        if (!motion || !runway || !frame || !photo) return

        // The window opens beside the question on wide screens and below it on phones.
        const start = wide ? "inset(34% 5% 9% 46% round 2rem)" : "inset(42% 6% 10% 6% round 1.5rem)"
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: runway, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
          })
          .fromTo(frame, { clipPath: start }, { clipPath: "inset(0% 0% 0% 0% round 0rem)" }, 0)
          .fromTo(photo, { scale: 1.4 }, { scale: 1 }, 0)
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  )
}
