/**
 * A sticky scene taller than the screen would stay pinned with its bottom out of view. This publishes the element's
 * height as --pin-height, so `top: min(0px, 100lvh - var(--pin-height))` pins it by its bottom edge instead.
 * Returns the cleanup.
 */
export function observePinHeight(element: HTMLElement) {
  const observer = new ResizeObserver(() => {
    element.style.setProperty("--pin-height", `${element.offsetHeight}px`)
  })
  observer.observe(element)
  return () => {
    observer.disconnect()
    element.style.removeProperty("--pin-height")
  }
}
