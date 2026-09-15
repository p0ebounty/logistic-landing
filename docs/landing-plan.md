# MagnaQore Logistic — landing plan

## Brief

- **Product:** MagnaQore Logistic — AI sales department (AI calling, lead rating, follow-ups, tender deadlines, CRM, analytics) for US and Canadian logistics companies.
- **Audience:** owners and heads of sales at freight brokerages, 3PLs and carriers.
- **Primary job:** make the full case (problems → system → AI vs human math → pricing → packages) and get a free strategy call booked on cal.com.
- **Hard constraints:** keep ≥95% of the old page's content (CPO), easy long-form reading, fully responsive, ready-made components (shadcn/ui on Radix) — no native browser widgets, Next.js 16 + Turbopack, new generated imagery (old covers are not reused; real product screenshots are).

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

**Concept — "Interchange".** A good interchange takes traffic from every direction and sends each car down the right lane without a collision; MagnaQore Logistic does the same with leads. The page inherits the MagnaQore brand (magnaqore.io: ink navy, brass, paper, Archivo + Newsreader, MQ logo) and adds the vernacular of North American freight roads: night aerial highway photography and road-sign semantics.

**Color** (brand tokens + two product semantics)

| Token | Hex | Role |
|-------|-----|------|
| Ink | `#0A1D2A` | dark bands, header, primary surfaces for hero/pilot |
| Paper / Paper warm / Band | `#FFFFFF` / `#F7F6F3` / `#F0EEE9` | reading surfaces |
| Brass bright / Brass / Brass deep | `#E5B54A` / `#C9962B` / `#8C6414` | CTA, attention, emphasis text on light (deep only) |
| Route green | `#1E6B52` | the system, solutions, results, included |
| Stop red | `#B3261E` | problems, losses, human-department cost, not included |
| Text / Muted | `#10222F` / `#4D6373` | copy |

**Type.** Archivo (variable width + weight) carries the product voice: semi-expanded heavy headlines like freight signage, regular width for body. Newsreader (brand serif) only for a few editorial statements. Sentence case everywhere, no all-caps labels, tabular figures in tables.

**Layout.** Left-aligned long-form on a 1280 px shell with brand gutters (20/40/64 px); 68ch measure. Long chapters use a sticky left heading column with content on the right. Sticky ink header with section nav and a brass reading-progress line; mobile nav in a Sheet.

```
[header: logo · Challenges · AI vs human · Pricing · Packages · Why MagnaQore · Pilot · Book a call]
HERO   ink + aerial interchange photo; headline left; CTA + watch overview
       one green guide-sign band with the 4 stats (the single bold moment)
OVERVIEW  thesis (serif) | video · approach · specialization · 30-day facts
WHO      8 pains with red warning markers · brass "Important" callout
CHALLENGES ×5  sticky heading | problem (red) → system (green) → results; photos + product shots
AI VS HUMAN / PRICING  typeset tables, AI column green, human column red
SERVICES  6 services, 2 columns
PACKAGES  matrix table on desktop, package tabs on mobile; vs in-house matrix
WHY      7 reasons + result
PILOT    ink + dawn highway photo; tired-of list, pilot offer, CTA
```

**Principles.** Spend boldness once (hero photo + sign band); everything else quiet and disciplined. Structure encodes meaning: red = problem/loss, green = system/result, numbers only for real sequences (the 7-step call flow). Motion only for the hero load and user actions; respects reduced motion. Every table readable on a 360 px phone.

## Generated imagery (kie.ai, gpt-image-2-5-flare)

`scripts/image-prompts.mjs` → `node scripts/generate-images.mjs` → `node scripts/optimize-images.mjs` (WebP into `public/images`).

- `hero-interchange` (21:9 4K) and `hero-interchange-portrait` (2:3) — night aerial stack interchange, brass light trails.
- `challenge-leads` — distribution center docks, three lit (priority).
- `challenge-calls` — telecom tower by an interstate, light trails (constant contact).
- `challenge-tenders` — trailer yard at dawn in exact rows (preparation, timing).
- `challenge-crm` — three highways merging into one (Clients → Loads → Carriers).
- `pilot-highway` (21:9) — empty prairie highway before dawn (decision time).
