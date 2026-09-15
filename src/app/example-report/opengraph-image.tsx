import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { reportMeta } from "@/content/example-report"

export const alt = "AI lead generation report: $156,228 saved, 744% ROI in 5 weeks"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function ReportOpengraphImage() {
  const [background, archivo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/og-background.jpg")),
    readFile(join(process.cwd(), "assets/og/Archivo-ExtraBold.ttf")),
  ])

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: "#0a1d2a", fontFamily: "Archivo" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img elements */}
        <img
          src={`data:image/jpeg;base64,${background.toString("base64")}`}
          width={size.width}
          height={size.height}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #0a1d2a 30%, rgba(10,29,42,0.7) 70%, rgba(10,29,42,0.4) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "60px 72px" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#a9c0d0" }}>MagnaQore Logistic · Example report</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 66, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#ffffff" }}>
              AI lead generation report
            </div>
            <div style={{ display: "flex", fontSize: 28, color: "#a9c0d0", marginTop: 14 }}>{reportMeta.period}</div>
            <div style={{ display: "flex", marginTop: 40 }}>
              {reportMeta.headline.slice(0, 3).map((item, index) => (
                <div
                  key={item.label}
                  style={{ display: "flex", flexDirection: "column", paddingRight: 40, marginRight: 40, borderRight: index < 2 ? "2px solid rgba(255,255,255,0.25)" : "none" }}
                >
                  <div style={{ display: "flex", fontSize: 54, lineHeight: 1, color: index === 0 ? "#e5b54a" : "#ffffff" }}>{item.value}</div>
                  <div style={{ display: "flex", fontSize: 20, color: "#a9c0d0", marginTop: 10 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  )
}
