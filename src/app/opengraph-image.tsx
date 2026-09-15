import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

import { hero } from "@/content/landing"

export const alt = "MagnaQore Logistic — an AI sales department for your logistics company in 30 days"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
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
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, #0a1d2a 22%, rgba(10,29,42,0.78) 52%, rgba(10,29,42,0.12) 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "60px 72px" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a9c0d0" }}>MagnaQore Logistic</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", maxWidth: 760, fontSize: 64, lineHeight: 1.02, letterSpacing: "-0.02em", color: "#ffffff" }}>
              {hero.title}
            </div>
            <div style={{ display: "flex", marginTop: 36, borderRadius: 14, background: "#1e6b52", padding: 5, alignSelf: "flex-start" }}>
              <div style={{ display: "flex", border: "2px solid rgba(255,255,255,0.9)", borderRadius: 10 }}>
                {hero.stats.slice(0, 3).map((stat, index) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "14px 26px",
                      borderLeft: index === 0 ? "none" : "2px solid rgba(255,255,255,0.9)",
                      color: "#ffffff",
                    }}
                  >
                    <div style={{ display: "flex", fontSize: 38, lineHeight: 1 }}>{stat.value}</div>
                    <div style={{ display: "flex", fontSize: 18, marginTop: 6 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] }
  )
}
