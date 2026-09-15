"use client"

import * as React from "react"

import { gsap, MOTION, useGSAP } from "@/lib/gsap"

const hoursFormat = new Intl.NumberFormat("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const countFormat = new Intl.NumberFormat("en-US")

/**
 * The same 2,000 contacts, processed by both departments while the reader scrolls. Scroll plays the clock:
 * the first stretch covers the AI's 11.5 hours, the rest the human department's remaining hours.
 * Rows carry data-hours and data-contacts; the markup holds the finished state for everyone without motion.
 */
export function RaceScene({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const runway = root.querySelector<HTMLElement>("[data-race-runway]")
        const rows = gsap.utils.toArray<HTMLElement>("[data-race-row]", root).map((row) => ({
          hours: Number(row.dataset.hours),
          contacts: Number(row.dataset.contacts),
          bar: row.querySelector<HTMLElement>("[data-race-bar]"),
          hoursText: row.querySelector<HTMLElement>("[data-race-hours]"),
          contactsText: row.querySelector<HTMLElement>("[data-race-contacts]"),
        }))
        if (!runway || rows.length === 0) return

        const originals = rows.map((row) => [row.hoursText?.textContent, row.contactsText?.textContent])
        const fastest = Math.min(...rows.map((row) => row.hours))
        const slowest = Math.max(...rows.map((row) => row.hours))
        const clock = { hours: 0 }

        const render = () => {
          for (const row of rows) {
            const done = Math.min(clock.hours, row.hours)
            const share = done / row.hours
            if (row.bar) row.bar.style.width = `${share * 100}%`
            if (row.hoursText) row.hoursText.textContent = `${hoursFormat.format(done)} hours`
            if (row.contactsText) {
              row.contactsText.textContent = `${countFormat.format(Math.round(share * row.contacts))} of ${countFormat.format(row.contacts)} contacts`
            }
          }
        }

        gsap
          .timeline({
            defaults: { ease: "none" },
            onUpdate: render,
            scrollTrigger: { trigger: runway, start: "top bottom", end: "bottom bottom", scrub: 0.4 },
          })
          .to(clock, { hours: fastest, duration: 0.18 })
          .to(clock, { hours: slowest, duration: 0.82 })
        render()

        return () => {
          rows.forEach((row, index) => {
            if (row.bar) row.bar.style.width = "100%"
            if (row.hoursText) row.hoursText.textContent = originals[index][0] ?? ""
            if (row.contactsText) row.contactsText.textContent = originals[index][1] ?? ""
          })
        }
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
