"use client"

import * as React from "react"

/** Stops pictures from being dragged out of the page; CSS covers Chromium and Safari, this covers Firefox. */
export function ImageDragGuard() {
  React.useEffect(() => {
    const onDragStart = (event: DragEvent) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault()
    }
    document.addEventListener("dragstart", onDragStart)
    return () => document.removeEventListener("dragstart", onDragStart)
  }, [])

  return null
}
