"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Image, { type StaticImageData } from "next/image"
import { ExpandIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const LightboxView = dynamic(() => import("@/components/site/lightbox-view"), { ssr: false })

/** A product screen that opens full size with zoom, so dense tables stay readable on phones. */
export function ProductShot({
  image,
  alt,
  caption,
  sizes = "(min-width: 88rem) 80rem, 100vw",
  className,
}: {
  image: StaticImageData
  alt: string
  caption?: string
  sizes?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [requested, setRequested] = React.useState(false)

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => {
          setRequested(true)
          setOpen(true)
        }}
        aria-label={`Open full size: ${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#141311] shadow-[0_30px_70px_-35px_rgb(10_29_42/0.6)] ring-1 ring-ink/15 outline-none focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Image src={image} alt={alt} sizes={sizes} placeholder="blur" className="h-auto w-full" />
        <span
          aria-hidden
          className={cn(
            "absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-ink/85 px-2.5 py-1.5 text-sm font-medium text-white transition-opacity",
            "md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
          )}
        >
          <ExpandIcon className="size-4" />
          Zoom
        </span>
      </button>
      {caption ? <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption> : null}
      {requested ? <LightboxView image={image} alt={alt} open={open} onClose={() => setOpen(false)} /> : null}
    </figure>
  )
}
