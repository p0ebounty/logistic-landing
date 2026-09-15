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
            gsap.set(self.masks, { paddingTop: "0.16em", paddingBottom: "0.16em", marginTop: "-0.16em", marginBottom: "-0.16em" })
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
