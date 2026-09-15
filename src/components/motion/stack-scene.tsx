"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP, WIDE } from "@/lib/gsap"

/**
 * Sticky cards that pile up: each [data-stack-card] sticks under the previous one, and the card being covered
 * steps back (scale and [data-stack-shade]) as the next one slides over it. Phones get a plain list.
 */
export function StackScene({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(`${MOTION} and ${WIDE}`, () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root)
        cards.forEach((card, index) => {
          const next = cards[index + 1]
          if (!next) return
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(card, { scale: 0.94, transformOrigin: "50% 0%" }, 0)
            .to(card.querySelector("[data-stack-shade]"), { opacity: 1 }, 0)
        })
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
