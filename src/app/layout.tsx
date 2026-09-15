import type { Metadata, Viewport } from "next"
import { Mona_Sans } from "next/font/google"

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { ImageDragGuard } from "@/components/site/image-drag-guard"
import { SITE_URL } from "@/content/landing"
import "./globals.css"

// One family, two voices through the width axis: expanded like trailer lettering, condensed like mile-marker numerals.
const monaSans = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
})

const title = "AI Sales Department for Logistics in 30 Days | MagnaQore"
const description =
  "AI calling, lead rating, follow-ups and CRM for US and Canadian logistics companies. Process 2,000–70,000 leads a month with 0% lead loss."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | MagnaQore" },
  description,
  applicationName: "MagnaQore Logistic",
  authors: [{ name: "MagnaQore", url: "https://magnaqore.io" }],
  creator: "MagnaQore",
  publisher: "MagnaQore",
  category: "Business software",
  keywords: [
    "AI sales department for logistics",
    "AI calling for freight brokers",
    "logistics lead generation",
    "logistics CRM",
    "sales automation for logistics",
    "MagnaQore",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MagnaQore Logistic",
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: "#f3f4f1",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={monaSans.variable}>
      <body className="min-h-dvh antialiased">
        <SmoothScroll />
        <ImageDragGuard />
        {children}
      </body>
    </html>
  )
}
