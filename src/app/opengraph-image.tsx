import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { hero } from "@/content/landing"

export const alt = "MagnaQore Logistic — an AI sales department for your logistics company in 30 days"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const paper = "#f3f4f1"
const asphalt = "#17191b"
const graphite = "#5a5f63"
const sodium = "#f4a53a"

/** The hero in one frame: the headline on paper and the night interchange showing through a giant "30". */
export default async function OpengraphImage() {
  const dir = join(process.cwd(), "assets/og")
  const [background, expanded, condensed, medium] = await Promise.all([
    readFile(join(dir, "og-background.jpg")),
    readFile(join(dir, "MonaSans-ExpandedExtraBold.ttf")),
    readFile(join(dir, "MonaSans-CondensedExtraBold.ttf")),
    readFile(join(dir, "MonaSans-Medium.ttf")),
  ])
  const photo = `data:image/jpeg;base64,${background.toString("base64")}`
  const [leads, , , loss] = hero.stats

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: paper }}>
        <div
          style={{
            position: "absolute",
            right: -70,
            top: 40,
            display: "flex",
            fontFamily: "Mona Sans Expanded",
            fontSize: 500,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "transparent",
            backgroundImage: `url(${photo})`,
            backgroundSize: "780px 560px",
            backgroundPosition: "0px 40px",
            backgroundClip: "text",
          }}
        >
          30
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            height: "100%",
            padding: "58px 0 58px 68px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Mona Sans Medium", fontSize: 26, color: graphite }}>
            <div style={{ display: "flex", width: 34, height: 5, marginRight: 14, background: sodium }} />
            MagnaQore Logistic
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Mona Sans Expanded",
              fontSize: 52,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: asphalt,
            }}
          >
            {hero.title}
          </div>
          <div style={{ display: "flex" }}>
            {[leads, loss].map((stat, index) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", marginLeft: index === 0 ? 0 : 56 }}>
                <div style={{ display: "flex", fontFamily: "Mona Sans Condensed", fontSize: 64, lineHeight: 0.9, color: asphalt }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", fontFamily: "Mona Sans Medium", fontSize: 22, marginTop: 10, color: graphite }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Mona Sans Expanded", data: expanded, weight: 800, style: "normal" },
        { name: "Mona Sans Condensed", data: condensed, weight: 800, style: "normal" },
        { name: "Mona Sans Medium", data: medium, weight: 500, style: "normal" },
      ],
    }
  )
}
