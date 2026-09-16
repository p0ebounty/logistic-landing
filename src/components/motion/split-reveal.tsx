"use client"

import * as React from "react"

import { gsap, MOTION, SplitText, useGSAP } from "@/lib/gsap"

type SplitRevealProps = React.HTMLAttributes<HTMLElement> & { as?: "h1" | "h2" | "h3" | "p" }

/** Headline entrance: lines rise out of their own masks once, the first time the headline comes into view. */
export function SplitReveal({ as = "h2", children, ...props }: SplitRevealProps) {
  const ref = React.useRef<HTMLElement>(null)
  const Component = as as React.ElementType

  useGSAP(
    () => {
      const element = ref.current
      if (!element) return
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        SplitText.create(element, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            // Line masks clip at the line box, and tight display leading puts descenders (g, y) outside it:
            // widen each mask without moving the layout, then hand back the plain heading once the lines are in.
            // Adjacent vertical margins collapse, so each gap between two masks takes one -0.32em margin rather
            // than two -0.16em ones (which would collapse to -0.16em and grow the heading until the revert).
            gsap.set(self.masks, {
              paddingTop: "0.16em",
              paddingBottom: "0.16em",
              marginTop: (index: number) => (index === 0 ? "-0.16em" : "-0.32em"),
              marginBottom: (index: number, _mask: Element, masks: Element[]) =>
                index === masks.length - 1 ? "-0.16em" : "0em",
            })
            return gsap.from(self.lines, {
              yPercent: 125,
              duration: 1.15,
              ease: "expo.out",
              stagger: 0.085,
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
              onComplete: () => self.revert(),
            })
          },
        })
      })
    },
    { scope: ref }
  )

  return (
    <Component ref={ref} data-split {...props}>
      {children}
    </Component>
  )
}
