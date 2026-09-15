"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP, WIDE } from "@/lib/gsap"

/**
 * Pins [data-h-viewport] and moves [data-h-track] sideways while the reader scrolls down.
 * Phones and reduced motion keep the plain vertical stack. [data-h-parallax] images settle as they enter.
 */
export function HorizontalScene({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(`${MOTION} and ${WIDE}`, () => {
        const viewport = root.querySelector<HTMLElement>("[data-h-viewport]")
        const track = root.querySelector<HTMLElement>("[data-h-track]")
        if (!viewport || !track) return

        const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        for (const image of gsap.utils.toArray<HTMLElement>("[data-h-parallax]", track)) {
          gsap.fromTo(
            image,
            { scale: 1.18 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: image, containerAnimation: tween, start: "left right", end: "left 35%", scrub: true },
            }
          )
        }

        // Keyboard users tabbing into an off-screen panel get scrolled to it.
        const onFocus = (event: FocusEvent) => {
          const trigger = tween.scrollTrigger
          if (!trigger || !(event.target instanceof HTMLElement)) return
          const offset = event.target.getBoundingClientRect().left - track.getBoundingClientRect().left
          const x = gsap.utils.clamp(0, distance(), offset - 64)
          window.scrollTo({ top: trigger.start + x })
        }
        track.addEventListener("focusin", onFocus)
        return () => track.removeEventListener("focusin", onFocus)
      })
    },
    { scope: ref }
  )

  return <div ref={ref}>{children}</div>
}
