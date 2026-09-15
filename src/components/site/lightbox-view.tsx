"use client"

import type { StaticImageData } from "next/image"
import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/styles.css"

/** Loaded on the first "Zoom" click only, so the lightbox never weighs on the initial page load. */
export default function LightboxView({
  image,
  alt,
  open,
  onClose,
}: {
  image: StaticImageData
  alt: string
  open: boolean
  onClose: () => void
}) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={[{ src: image.src, width: image.width, height: image.height, alt }]}
      plugins={[Zoom]}
      carousel={{ finite: true }}
      controller={{ closeOnBackdropClick: true }}
      render={{ buttonPrev: () => null, buttonNext: () => null }}
      zoom={{ maxZoomPixelRatio: 2 }}
    />
  )
}
