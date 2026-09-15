"use client"

import * as React from "react"
import { ReactLenis, useLenis } from "lenis/react"

import { gsap, MOTION, ScrollTrigger } from "@/lib/gsap"
import { useMediaQuery } from "@/lib/use-media-query"

/** Lenis runs on the GSAP ticker, so smooth scrolling and ScrollTrigger scenes share one clock. */
function LenisClock() {
  const lenis = useLenis(ScrollTrigger.update)

  React.useEffect(() => {
    if (!lenis) return
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // The menu sheet (Radix) and the lightbox lock the page; smooth scrolling pauses with them.
    const body = document.body
    const observer = new MutationObserver(() => {
      const locked = body.hasAttribute("data-scroll-locked") || body.classList.contains("yarl__no_scroll")
      if (locked) lenis.stop()
      else lenis.start()
    })
    observer.observe(body, { attributes: true, attributeFilter: ["data-scroll-locked", "class"] })

    return () => {
      observer.disconnect()
      gsap.ticker.remove(tick)
    }
  }, [lenis])

  return null
}

export function SmoothScroll() {
  const motion = useMediaQuery(MOTION)

  React.useEffect(() => {
    // Headlines change width once the variable font arrives; scene positions are measured again then.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  if (!motion) return null
  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.12, anchors: { offset: -96 } }}>
      <LenisClock />
    </ReactLenis>
  )
}
