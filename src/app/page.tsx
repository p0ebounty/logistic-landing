import { Audience } from "@/components/site/audience"
import { Challenges } from "@/components/site/challenges"
import { AiVsHuman, Pricing } from "@/components/site/comparison"
import { Hero } from "@/components/site/hero"
import { Overview } from "@/components/site/overview"
import { Packages } from "@/components/site/packages"
import { Pilot } from "@/components/site/pilot"
import { Services } from "@/components/site/services"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { WhyMagnaQore } from "@/components/site/why-magnaqore"
import { landingJsonLd, serializeJsonLd } from "@/lib/structured-data"

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-brass-bright focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Overview />
        <Audience />
        <Challenges />
        <AiVsHuman />
        <Pricing />
        <Services />
        <Packages />
        <WhyMagnaQore />
        <Pilot />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(landingJsonLd()) }} />
    </>
  )
}
