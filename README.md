# MagnaQore Logistic — Landing Page

A scroll-driven marketing landing page for **MagnaQore Logistic**, an AI sales department for US and Canadian logistics companies (AI calling, lead rating, follow-ups, tender deadlines, CRM and analytics).

Built with Next.js 16, React 19, Tailwind CSS 4, shadcn/ui and GSAP. It replaces a no-code page builder version of the site while keeping almost all of its content (98.9% coverage, measured automatically).

## Features

- **Scroll-driven scenes** with GSAP ScrollTrigger, SplitText and Lenis smooth scrolling: a hero that flies into a giant "30" until the night photo fills the screen, sticky chapter frames that wipe from photography to product screens, a pinned "AI vs human" race, a horizontal services track, stacked "why us" cards and a closing highway scene.
- **Progressive enhancement**: the server-rendered markup already holds the final state, so crawlers, no-JS visitors, reduced-motion users and phones get the full content. Motion only animates *from* that state.
- **Optional autoplay**: offered while the page is at the top, it scrolls the whole landing so every scene plays; any wheel, touch, key or click hands control back.
- **Mobile-first layouts**: every section works at 360 px wide; pinned panels are sized in `lvh` so nothing hides under mobile browser bars.
- **Example report page** (`/example-report`) with custom charts for a 5-week AI lead generation campaign (client name omitted).
- **SEO**: metadata, JSON-LD (Organization, WebSite, Service with offers, VideoObject, BreadcrumbList, Report), sitemap, robots, web manifest, generated Open Graph images and a static `llms.txt`.
- **Generated imagery**: editorial photography and product screens produced with an image-generation API; product screens use fictional data only.
- **Content coverage check**: a script that compares the new page's rendered HTML against the full text of the previous site.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui on Radix, `tw-animate-css`, lucide icons |
| Motion | GSAP (ScrollTrigger, SplitText, `@gsap/react`), Lenis |
| Media | `next/image` with static imports, `yet-another-react-lightbox` (loaded on demand), `react-lite-youtube-embed` |
| Type | Mona Sans (variable width and weight) |
| Tooling | ESLint, `sharp` (image optimization scripts) |

## Routes

| Route | Description |
|-------|-------------|
| `/` | The landing page |
| `/example-report` | Example report: a 5-week AI lead generation campaign |

Also generated: `/opengraph-image`, `/example-report/opengraph-image`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/icon.png`, `/apple-icon.png`. Static: `/llms.txt`.

## Repository structure

| Path | Contents |
|------|----------|
| `src/app/` | Routes, layout, metadata, OG images, sitemap, robots, manifest |
| `src/content/landing.ts` | All landing copy, tables and links (site URL, booking URL, video ID) |
| `src/content/example-report.ts` | All figures of the example report |
| `src/components/site/` | Landing sections; `*-scene.tsx` files are their scroll scenes |
| `src/components/motion/` | Reusable motion: smooth scroll, autoplay, headline reveal, opening media, focus list, horizontal track, card stack |
| `src/components/report/` | Report sections and charts |
| `src/components/ui/` | shadcn/ui components (Radix base) |
| `src/lib/gsap.ts` | GSAP with plugins registered; `MOTION` / `WIDE` media queries |
| `src/lib/pin-height.ts` | Lets a pinned scene taller than the screen pin by its bottom edge |
| `src/lib/structured-data.ts` | JSON-LD builders |
| `src/app/globals.css` | Brand tokens, type roles (`type-*`), chart colors, `.surface-ink` night sections |
| `src/assets/images/` | Optimized WebP imagery used by the site |
| `assets/` | Brand files, OG fonts/background, prompt metadata of generated images |
| `scripts/` | Image generation and optimization, content coverage check |
| `docs/` | Design brief, old → new content map, text of the previous page |
| `.claude/skills/` | Project skills for AI coding agents (GSAP, shadcn, frontend design, SEO) |

## Getting started

Requirements: Node.js 20.12 or newer (the image scripts use `process.loadEnvFile`), npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
npm run lint
```

The site itself needs no environment variables. The canonical URL, booking link and overview video are constants in `src/content/landing.ts`:

```ts
export const SITE_URL = "https://example.com"
export const BOOKING_URL = "https://example.com/book-a-call"
export const OVERVIEW_VIDEO_ID = "<youtube-video-id>"
```

`SITE_URL` drives canonical URLs, the sitemap, robots and Open Graph links.

## Content coverage check

The new page must keep at least 95% of the previous page's information. After changing copy, run the check against a running server:

```bash
node scripts/content-coverage.mjs                       # defaults to http://localhost:3000
node scripts/content-coverage.mjs https://example.com   # or any deployed URL
```

The score is the share of the old page's word pairs (`docs/old-site-content.txt`) found in the new page's server-rendered HTML.

## Images

Photography and product screens are generated with the kie.ai API. Only needed when regenerating images; the optimized results are already committed in `src/assets/images/`.

1. Create `.env.local` (git-ignored):

   ```bash
   KIE_API_KEY=your-api-key
   ```

2. Generate and optimize:

   ```bash
   node scripts/generate-images.mjs                  # generate every missing image
   node scripts/generate-images.mjs product-call     # regenerate specific images
   node scripts/optimize-images.mjs                  # WebP into src/assets/images, icons, OG background
   ```

Prompts live in `scripts/image-prompts.mjs` (photography) and `scripts/product-prompts.mjs` (product screens). Raw generations in `assets/generated/` are git-ignored; only their prompt metadata (`*.json`) is kept.

## Deployment

The project deploys to Vercel as a standard Next.js app:

1. Import the repository in Vercel. The Next.js preset is detected automatically; no settings or environment variables are required.
2. Add your domain under Project → Domains and set `SITE_URL` in `src/content/landing.ts` to match.
3. After the first deploy, submit `https://example.com/sitemap.xml` to Google Search Console.

## Notes

- Brand names, logos and product copy belong to MagnaQore; this repository is shared as a portfolio example of the front-end work.
- Product screens and contacts shown in images are fictional (phone numbers use the reserved 555-01xx range).
- Bundled skills in `.claude/skills/` are third-party and keep their own licenses.
