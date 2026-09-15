"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP } from "@/lib/gsap"

/** Opening scene: scrolling flies into the "30" until the night road fills the screen, then the stats rise over it. */
export function HeroScene({ children }: { children: React.ReactNode }) {
  const root = React.useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const q = gsap.utils.selector(root)
        const [stage] = q("[data-hero-stage]") as HTMLElement[]
        const [paper] = q("[data-hero-paper]") as HTMLElement[]
        const [zero] = q("[data-hero-zero]") as HTMLElement[]
        const [runway] = q("[data-hero-runway]") as HTMLElement[]
        const [stats] = q("[data-hero-stats]") as HTMLElement[]
        if (!stage || !paper || !zero || !runway || !stats) return

        // Offsets ignore transforms, so the zoom point stays inside the zero's stroke on every refresh.
        const origin = () => ({
          x: zero.offsetLeft + zero.offsetWidth * 0.2,
          y: zero.offsetTop + zero.offsetHeight * 0.5,
        })
        const endScale = () => {
          const { x, y } = origin()
          const reach = Math.hypot(Math.max(x, stage.clientWidth - x), Math.max(y, stage.clientHeight - y))
          return reach / (zero.offsetHeight * 0.06)
        }

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: runway,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            paper,
            { scale: 1, transformOrigin: () => `${origin().x}px ${origin().y}px` },
            { scale: endScale, ease: "power2.in", duration: 1 },
            0
          )
          .to(q("[data-hero-copy]"), { autoAlpha: 0, y: () => window.innerHeight * -0.06, duration: 0.3 }, 0)
          .fromTo(q("[data-hero-photo]"), { scale: 1.18 }, { scale: 1, duration: 1 }, 0)
          .to(paper, { autoAlpha: 0, duration: 0.08 }, 0.92)

        gsap.from(q("[data-hero-stat]"), {
          yPercent: 35,
          autoAlpha: 0,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: stats, start: "top 80%", end: "top 20%", scrub: 0.5 },
        })
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative">
      {children}
    </section>
  )
}
