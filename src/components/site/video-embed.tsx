"use client"

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

/** YouTube facade: a thumbnail and a play button until clicked, so the page loads no YouTube code up front. */
export function VideoEmbed({ id, title }: { id: string; title: string }) {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
      announce="Play video"
      poster="sddefault"
      webp
      noCookie
      lazyLoad
      params="rel=0"
    />
  )
}
