"use client"

import * as React from "react"
import { useLenis } from "lenis/react"
import { MousePointer2Icon, PlayIcon } from "lucide-react"

import { gsap, MOTION } from "@/lib/gsap"
import { useMediaQuery } from "@/lib/use-media-query"
import { cn } from "@/lib/utils"

/** Cruising speed, in screens per second. */
const SPEED = 0.35
/** Seconds to reach cruising speed. */
const RAMP_UP = 1.2
/** Screens before the end over which the page slows down, and the slowest share of cruising speed it keeps. */
const RAMP_DOWN = 0.5
const MIN_PACE = 0.2
/** The button is offered while the page is scrolled less than this, in px. */
const TOP_ZONE = 80
/** Delay before the first offer after load, and how long the "scroll to take over" hint stays, in ms. */
const FIRST_OFFER_MS = 900
const HINT_MS = 2600

const TAKEOVER_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const

const smoothstep = (value: number) => {
  const t = Math.min(Math.max(value, 0), 1)
  return t * t * (3 - 2 * t)
}

/**
 * Offered whenever the page is at its very top: scrolls the whole landing at a calm pace so every scene plays by
 * itself. Any wheel, touch, key or click hands control back to the reader.
 */
export function Autoplay() {
  const motion = useMediaQuery(MOTION)
  const lenis = useLenis()
  const [ready, setReady] = React.useState(false)
  const [atTop, setAtTop] = React.useState(true)
  const [playing, setPlaying] = React.useState(false)
  const [hint, setHint] = React.useState(false)
  const stopRef = React.useRef<(() => void) | null>(null)

  React.useEffect(() => {
    if (!motion) return
    const timer = window.setTimeout(() => setReady(true), FIRST_OFFER_MS)
    const onScroll = () => setAtTop(window.scrollY < TOP_ZONE)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }, [motion])

  // Whatever happens, the page stops scrolling by itself when this goes away.
  React.useEffect(() => () => stopRef.current?.(), [])

  // The hint fades a little after the start; the page keeps scrolling.
  React.useEffect(() => {
    if (!hint) return
    const timer = window.setTimeout(() => setHint(false), HINT_MS)
    return () => window.clearTimeout(timer)
  }, [hint])

  const play = () => {
    let position = window.scrollY
    let elapsed = 0

    const stop = () => {
      gsap.ticker.remove(tick)
      for (const type of TAKEOVER_EVENTS) window.removeEventListener(type, stop, { capture: true })
      stopRef.current = null
      setHint(false)
      setPlaying(false)
    }

    function tick(_time: number, deltaTime: number) {
      // Something else moved the page (a scrollbar drag, a jump): the reader has taken over.
      if (Math.abs(window.scrollY - position) > 3) return stop()

      const seconds = Math.min(deltaTime, 50) / 1000
      elapsed += seconds
      const screen = window.innerHeight
      const limit = document.documentElement.scrollHeight - screen
      const pace = smoothstep(elapsed / RAMP_UP) * Math.max(smoothstep((limit - position) / (screen * RAMP_DOWN)), MIN_PACE)

      position = Math.min(limit, position + screen * SPEED * pace * seconds)
      if (lenis) lenis.scrollTo(position, { immediate: true, force: true })
      else window.scrollTo(0, position)
      if (position >= limit - 1) stop()
    }

    // Listening starts after the pressing click, so only the reader's next move stops the ride.
    for (const type of TAKEOVER_EVENTS) window.addEventListener(type, stop, { capture: true, passive: true })
    gsap.ticker.add(tick)
    stopRef.current = stop
    setPlaying(true)
    setHint(true)
  }

  if (!motion) return null

  const offered = ready && atTop && !playing
  const shown = offered || (playing && hint)

  return (
    <>
      {/* Phones: centered over the "30" like a play button on a picture. Wide screens: on the hero's button row,
          at the right edge of the grid. */}
      <div
        inert={!offered}
        className="pointer-events-none fixed inset-x-0 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-30 lg:bottom-[3.25rem]"
      >
        <div className="shell flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={play}
            className={cn(
              "surface-ink flex h-12 items-center gap-3 rounded-full bg-night/85 py-1.5 pr-5 pl-1.5 font-heading text-[0.95rem] font-semibold whitespace-nowrap shadow-[0_24px_60px_-24px_rgb(10_17_25/0.8)] ring-1 ring-white/10 backdrop-blur-md transition duration-500 ease-expo outline-none focus-visible:ring-3 focus-visible:ring-sodium",
              offered && "pointer-events-auto hover:bg-night",
              !shown && "translate-y-3 opacity-0"
            )}
          >
            <span aria-hidden className="grid size-9 place-items-center rounded-full bg-sodium text-asphalt">
              {playing ? <MousePointer2Icon className="size-4" /> : <PlayIcon className="size-4 translate-x-px fill-current" />}
            </span>
            {playing ? "Scroll to take over" : "Autoplay"}
          </button>
        </div>
      </div>
      {/* Outside the inert wrapper, so screen readers still hear it while the button is withdrawn. */}
      <p aria-live="polite" className="sr-only">
        {playing ? "The page is scrolling by itself. Scroll, tap or press any key to take over." : ""}
      </p>
    </>
  )
}
