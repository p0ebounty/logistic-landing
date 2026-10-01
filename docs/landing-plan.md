# MagnaQore Logistic — landing plan

## Brief

- **Product:** MagnaQore Logistic — AI sales department (AI calling, lead rating, follow-ups, tender deadlines, CRM, analytics) for US and Canadian logistics companies.
- **Audience:** owners and heads of sales at freight brokerages, 3PLs and carriers.
- **Primary job:** make the full case (problems → system → AI vs human math → pricing → packages) and get a free strategy call booked on cal.com.
- **Hard constraints:** keep ≥95% of the old page's content, easy long-form reading, fully responsive, ready-made components (shadcn/ui on Radix) — no native browser widgets, Next.js 16 + Turbopack, new generated imagery (old covers are not reused; real product screenshots are).

## Old page map (logistic.magnaqore.io, Readdy.ai, ~25,500 px, 21 blocks)

| # | Old block | Content kept in new section |
|---|-----------|-----------------------------|
| 0 | Hero: logo, tagline, 30-day promise, 5×/4×/0%, YouTube overview, CTA | Hero + Overview |
| 1 | 4 stats, individual approach, specialization, ≤30 days facts, result | Hero sign band + Overview |
| 2 | Who is this for? 8 pains + "Important" | Who it's for |
| 3 | Banner: Key challenges | Challenges index |
| 4 | Lead, load & priority management: problem, solution, 4 results | Challenge 1 |
| 5–7 | Communication quality control: problem, 7 system functions, result, 300-contacts math | Challenge 2 |
| 8 | Tenders & deadlines: problem, 4 functions, 4 results, screenshot | Challenge 3 |
| 9 | Unified CRM architecture: problem, 3 functions, 4 results, screenshot | Challenge 4 |
| 10–11 | Analytics dashboards: problem, strategic window, time savings, 4 dashboards, company outcome, example report link | Challenge 5 |
| 12–13 | AI vs human speed, labor cost analysis, key metric comparison | AI vs human |
| 13 | AI agent pricing, cost of a human department | Pricing |
| 14–16 | 6 additional services | Services |
| 17 | Bundle packages with gifts (4 packages × 27 rows) | Packages |
| 18 | Comparison with human staff costs (5 columns × 13 rows) | Packages vs in-house |
| 19 | Why MagnaQore is better (7 points + result) | Why MagnaQore |
| 20 | Final: pain list, 30-day pilot, what's included, closing, CTA | Pilot |

Ground truth text: `docs/old-site-content.txt`. Check with `node scripts/content-coverage.mjs` against a running server.

## Design system

**Concept — "Night shift".** Freight moves all night, and so does an AI sales department. The page is calm daylight paper for reading, numbers and decisions, and cuts to night photography of the road wherever it shows scale. The reader's scroll drives the motion: the page is a sequence of scenes rather than a stack of fade-ins. An earlier editorial direction borrowed magnaqore.io colors and fonts; this one is deliberately its own.

**Color**

| Token | Hex | Role |
|-------|-----|------|
| Paper / Paper deep | `#F3F4F1` / `#E7E9E4` | reading surfaces, bands |
| Asphalt / Graphite | `#17191B` / `#5A5F63` | text, secondary text |
| Night / Night raised / Fog | `#0A1119` / `#111B25` / `#AAB4BD` | night scenes (`.surface-ink`) and their secondary text |
| Sodium / Sodium deep | `#F4A53A` / `#93570A` | the one accent: CTA fill, key figures on night; deep for accent text on paper |
| Go / Stop | `#1B6E4C` / `#B8352A` | included, solved / problem, not included (always with an icon or bar marker) |
| Chart AI / Human | `#B86E0E` / `#2F6DB5` on paper, `#C7831F` / `#3B82D4` on night | two-series charts, validated with the dataviz palette checker |

**Type.** Mona Sans only, with its width axis as the second voice: expanded (`stretch-125`) headlines like trailer lettering, condensed (`stretch-75`) big figures like mile-marker numerals, normal width for reading. Sizes come from the `type-*` utilities. Sentence case, no all-caps labels, no tabular figures on Mona Sans numbers (its tabular zero is slashed) except live counters.

**Layout.** Left-aligned on a 96rem shell (20/40/64 px gutters). A fixed header hides while reading down and returns on scroll up; sticky elements use `--header-offset`. Mobile nav in a Sheet.

```
[header: logo · Challenges · AI vs human · Pricing · Packages · Why MagnaQore · Pilot · Book a call]
HERO        paper with a giant "30" cut out of it over the night interchange; headline, standfirst, CTAs
            (phones: the "30" fills what the copy leaves of the first screen) · Autoplay button while at the top
            scroll → fly into the zero until the road fills the screen → 4 stats rise over the photo
OVERVIEW    thesis · video window opening on scroll · principles · 5 facts in condensed numerals · result + CTA
WHO         sticky heading | 8 pains read like a teleprompter, sodium marker follows the reader · "Important"
CHALLENGES  giant headline + chapter links; 5 chapters: text left | sticky frame right where a wipe with a thin
            sodium edge line swaps the photo for product screens
AI VS HUMAN pinned night race for the same 2,000 contacts (11.5 h vs 1,166.7 h) · three metric tables
PRICING     agent price list | night card with the human department cost
SERVICES    night, pinned horizontal track of 6 services + lead gen screen
PACKAGES    bundle matrix with a header that follows the reader (tabs on phones) · vs in-house matrix
WHY         7 reasons as sticky cards that pile up · night result card
PILOT       the dawn highway opens from a window to full screen under the question · offer · CTA · sign-off
```

**Motion.** GSAP (ScrollTrigger, SplitText, `useGSAP`) with Lenis smooth scrolling on the GSAP ticker; the official GSAP skills and the cinematic motion skill live in `.claude/skills`. Scenes are client wrappers (`src/components/motion`, `src/components/site/*-scene.tsx`) around server-rendered markup that already holds the final state, so SSR, crawlers, no-JS (a noscript style hides `data-scene-runway`) and reduced motion all get complete content. Pinned panels (`pin-scene`) fill the large viewport and keep their content inside the small one, so nothing hides under mobile browser bars; a panel taller than a phone screen pins by its bottom edge. Autoplay, offered whenever the page is at its top, scrolls the whole page at about a third of a screen per second; any wheel, touch, key or click takes control back. Reduced motion: no smooth scroll, no autoplay, no pins or scrubs. Phones keep the vertical versions (no horizontal track or card stack, product screens inline). Headlines reveal by masked lines once; nothing else fades in for its own sake.

## Generated imagery (kie.ai, gpt-image-2-5-flare)

`scripts/image-prompts.mjs` → `node scripts/generate-images.mjs` → `node scripts/optimize-images.mjs` (WebP into `src/assets/images`).

- `hero-interchange` (21:9 4K) and `hero-interchange-portrait` (2:3) — night aerial stack interchange, brass light trails.
- `challenge-leads` — distribution center docks, three lit (priority).
- `challenge-calls` — telecom tower by an interstate, light trails (constant contact).
- `challenge-tenders` — trailer yard at dawn in exact rows (preparation, timing).
- `challenge-crm` — three highways merging into one (Clients → Loads → Carriers).
- `pilot-highway` (21:9) — empty prairie highway before dawn (decision time).
