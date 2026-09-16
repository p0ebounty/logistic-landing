# MagnaQore Logistic — landing

Landing page for MagnaQore Logistic, the AI sales department for US and Canadian logistics companies. Replaces the Readdy.ai page at https://logistic.magnaqore.io.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · shadcn/ui on Radix · GSAP (ScrollTrigger, SplitText, `@gsap/react`) · Lenis · yet-another-react-lightbox (loaded on demand) · react-lite-youtube-embed. Type: Mona Sans (variable width and weight).

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run start    # serve the build
npm run lint
```

## Pages

| Route | What |
|-------|------|
| `/` | The landing |
| `/example-report` | Example report: a 5-week AI lead generation campaign (replaces the old claude.ai link) |

Also generated: `/opengraph-image` and `/example-report/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon.png`, `/apple-icon.png`; static `/llms.txt`.

## Where things live

| Path | What |
|------|------|
| `src/content/landing.ts` | Every piece of landing copy, table and link (booking URL, video) |
| `src/content/example-report.ts` | All figures of the example report |
| `src/components/site/` | Landing sections; `*-scene.tsx` are their scroll scenes |
| `src/components/motion/` | Reusable motion: smooth scroll, autoplay, headline reveal, opening media, focus list, horizontal track, card stack |
| `src/lib/gsap.ts` | GSAP with its plugins registered; `MOTION` / `WIDE` media queries |
| `src/lib/pin-height.ts` | Lets a pinned scene taller than the screen pin by its bottom edge (with the `pin-scene` utility) |
| `src/components/report/` | Report sections and charts |
| `src/components/ui/` | shadcn/ui components (Radix base) |
| `src/lib/structured-data.ts` | JSON-LD (Organization, WebSite, Service with offers, VideoObject, BreadcrumbList, Report) |
| `src/app/globals.css` | Brand tokens, type roles (`type-*`), chart colors, `.surface-ink` dark bands |
| `src/assets/images/` | Optimized imagery, imported statically |
| `docs/landing-plan.md` | Brief, old → new content map, design system |
| `docs/old-site-content.txt` | Full text of the previous landing |

## Content rule

The previous page's information must survive (target ≥ 95%). After changing copy, run the check against the dev server:

```bash
node scripts/content-coverage.mjs
```

Current score: 98.9% (the only dropped line is the "Click here" link text).

## Images

Photos and product screens are generated with kie.ai (`gpt-image-2-5-flare-text-to-image`); product screens use fictional data only. The key goes into `.env.local` as `KIE_API_KEY` (never committed). Raw generations in `assets/generated/` are git-ignored; optimized WebP files in `src/assets/images/` are what the site uses.

```bash
node scripts/generate-images.mjs                  # generate everything that is missing
node scripts/generate-images.mjs product-call     # regenerate one image
node scripts/optimize-images.mjs                  # WebP into src/assets/images, icons, OG background
```

Prompts: `scripts/image-prompts.mjs` (photography) and `scripts/product-prompts.mjs` (product screens).

## Deploy on Vercel

1. Import the GitHub repository in Vercel; the framework preset is detected as Next.js, no settings or environment variables are required.
2. Add the domain `logistic.magnaqore.io` in Project → Domains. `SITE_URL` in `src/content/landing.ts` drives canonical URLs, the sitemap and Open Graph links.
3. After the first deploy, submit `https://logistic.magnaqore.io/sitemap.xml` in Google Search Console.
