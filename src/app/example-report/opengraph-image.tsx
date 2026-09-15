import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { reportMeta } from "@/content/example-report"

export const alt = "AI lead generation report: $156,228 saved, 744% ROI in 5 weeks"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const night = "#0a1119"
const paper = "#f3f4f1"
const fog = "#aab4bd"
const sodium = "#f4a53a"

export default async function ReportOpengraphImage() {
  const dir = join(process.cwd(), "assets/og")
  const [background, expanded, condensed, medium] = await Promise.all([
    readFile(join(dir, "og-background.jpg")),
    readFile(join(dir, "MonaSans-ExpandedExtraBold.ttf")),
    readFile(join(dir, "MonaSans-CondensedExtraBold.ttf")),
    readFile(join(dir, "MonaSans-Medium.ttf")),
  ])

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: night }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img elements */}
        <img
          src={`data:image/jpeg;base64,${background.toString("base64")}`}
          width={size.width}
          height={size.height}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #0a1119 38%, rgba(10,17,25,0.75) 70%, rgba(10,17,25,0.35) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "58px 68px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Mona Sans Medium", fontSize: 26, color: fog }}>
            <div style={{ display: "flex", width: 34, height: 5, marginRight: 14, background: sodium }} />
            MagnaQore Logistic example report
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Mona Sans Expanded",
                fontSize: 70,
                lineHeight: 1,
                letterSpacing: "-0.035em",
                color: paper,
              }}
            >
              {reportMeta.title}
            </div>
            <div style={{ display: "flex", fontFamily: "Mona Sans Medium", fontSize: 28, marginTop: 18, color: fog }}>
              {reportMeta.period}
            </div>
            <div style={{ display: "flex", marginTop: 46 }}>
              {reportMeta.headline.slice(0, 3).map((item, index) => (
                <div key={item.label} style={{ display: "flex", flexDirection: "column", marginLeft: index === 0 ? 0 : 60 }}>
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Mona Sans Condensed",
                      fontSize: 76,
                      lineHeight: 0.9,
                      color: index === 0 ? sodium : paper,
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ display: "flex", fontFamily: "Mona Sans Medium", fontSize: 22, marginTop: 10, color: fog }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
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
