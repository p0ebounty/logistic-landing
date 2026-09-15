"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP, WIDE } from "@/lib/gsap"

/**
 * Sticky media for a challenge chapter. The frame holds a photograph and the product screens as stacked layers;
 * each [data-chapter-step] in the text column wipes the next layer up over the previous one, which zooms back,
 * while a sodium line ([data-chapter-edge]) rides the edge of the wipe.
 */
export function ChapterScene({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(`${MOTION} and ${WIDE}`, () => {
        const edge = root.querySelector<HTMLElement>("[data-chapter-edge]")
        const layers = gsap.utils.toArray<HTMLElement>("[data-chapter-layer]", root)
        const captions = gsap.utils.toArray<HTMLElement>("[data-chapter-caption]", root)
        const steps = gsap.utils.toArray<HTMLElement>("[data-chapter-step]", root)
        const base = root.querySelector("[data-chapter-photo]") ? 1 : 0
        const revealed = layers.map((_, index) => index === 0)

        // Only the layer on top takes focus and clicks; the covered ones sit out.
        const syncInteractive = () => {
          const top = revealed.lastIndexOf(true)
          layers.forEach((layer, index) => {
            layer.inert = index !== top
          })
        }

        gsap.set(captions, { autoAlpha: (index: number) => (base === 0 && index === 0 ? 1 : 0) })

        steps.forEach((step, stepIndex) => {
          const layerIndex = stepIndex + base
          const layer = layers[layerIndex]
          const previous = layers[layerIndex - 1]
          if (!layer || !previous) return
          const caption = captions[layerIndex - base]
          const previousCaption = captions[layerIndex - base - 1]

          const timeline = gsap
            .timeline({
              defaults: { ease: "none", duration: 1 },
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 45%",
                scrub: 0.6,
                onUpdate: (self) => {
                  const shown = self.progress > 0.5
                  if (revealed[layerIndex] !== shown) {
                    revealed[layerIndex] = shown
                    syncInteractive()
                  }
                },
              },
            })
            .fromTo(layer, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0)
            .fromTo(previous, { scale: 1 }, { scale: 1.12 }, 0)

          if (edge) {
            // The edge layer is frame-sized, so yPercent 100 → 0 keeps its line exactly on the wipe's edge.
            timeline
              .fromTo(edge, { yPercent: 100 }, { yPercent: 0 }, 0)
              .fromTo(edge, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0)
              .to(edge, { autoAlpha: 0, duration: 0.05 }, 0.95)
          }
          if (caption) timeline.fromTo(caption, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, 0.6)
          if (previousCaption) timeline.to(previousCaption, { autoAlpha: 0, duration: 0.3 }, 0.1)
        })

        syncInteractive()
        return () => {
          for (const layer of layers) layer.inert = false
        }
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
