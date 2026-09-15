"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Image, { type StaticImageData } from "next/image"
import { ExpandIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const LightboxView = dynamic(() => import("@/components/site/lightbox-view"), { ssr: false })

const zoomBadge =
  "absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-night/85 px-3 py-1.5 text-sm font-medium text-paper backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"

/**
 * A product screen that opens full size with zoom, so dense tables stay readable on phones.
 * "inline" is a captioned figure in the text flow; "frame" fills a chapter's sticky media frame.
 */
export function ProductShot({
  image,
  alt,
  caption,
  sizes = "(min-width: 96rem) 88rem, 100vw",
  variant = "inline",
  className,
}: {
  image: StaticImageData
  alt: string
  caption?: string
  sizes?: string
  variant?: "inline" | "frame"
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [requested, setRequested] = React.useState(false)

  const openLightbox = () => {
    setRequested(true)
    setOpen(true)
  }
  const lightbox = requested ? (
    <LightboxView image={image} alt={alt} open={open} onClose={() => setOpen(false)} />
  ) : null

  if (variant === "frame") {
    return (
      <>
        <button
          type="button"
          onClick={openLightbox}
          aria-label={`Zoom: ${alt}`}
          className={cn(
            "group absolute inset-0 block cursor-zoom-in outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-inset",
            className
          )}
        >
          <Image src={image} alt={alt} fill sizes={sizes} className="object-cover object-top" />
          <span aria-hidden className={zoomBadge}>
            <ExpandIcon className="size-4" />
            Zoom
          </span>
        </button>
        {lightbox}
      </>
    )
  }

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={openLightbox}
        aria-label={`Zoom: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] bg-night shadow-[0_40px_80px_-40px_rgb(10_17_25/0.55)] ring-1 ring-asphalt/10 outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Image src={image} alt={alt} sizes={sizes} placeholder="blur" className="h-auto w-full" />
        <span aria-hidden className={zoomBadge}>
          <ExpandIcon className="size-4" />
          Zoom
        </span>
      </button>
      {caption ? <figcaption className="mt-3 text-[0.95rem] text-muted-foreground">{caption}</figcaption> : null}
      {lightbox}
    </figure>
  )
}
