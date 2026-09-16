@AGENTS.md

# MagnaQore Logistic landing

- Brief, design tokens and the old → new content map: `docs/landing-plan.md`. Full text of the old site: `docs/old-site-content.txt`.
- All copy lives in `src/content/landing.ts`. The CPO requires at least 95% of the old site's content: never drop facts, numbers, table rows or offers. After copy changes run `node scripts/content-coverage.mjs` against the dev server.
- UI is shadcn/ui on Radix (`components.json`). Use existing components first; no native browser widgets (native select, title tooltips) — custom components only. Every section must work at 360px wide.
- Type roles are `type-*` utilities from `globals.css`. Do not reintroduce custom `text-*` size names: `cn` treats them as colors and drops them. Mona Sans width uses the `stretch-*` utilities; avoid `tabular-nums` on Mona Sans figures (slashed zero) except live counters.
- Night sections use `.surface-ink`, which swaps the semantic color tokens locally.
- Motion: import GSAP from `@/lib/gsap` (plugins registered) and use `useGSAP` + `gsap.matchMedia()` with `MOTION` / `WIDE`. Markup must hold the final state (SSR, no JS, reduced motion); animate from it. Scroll runways get `data-scene-runway`. Full-screen pinned panels use the `pin-scene` utility: size them in `lvh`, keep content above `var(--bleed)` (so it fits the small viewport on phones) and call `observePinHeight` when the panel can be taller than a phone screen. Official GSAP skills are in `.claude/skills`. Check scenes with screenshots at 1440 and 390, with and without reduced motion.
- Images: `scripts/generate-images.mjs` (kie.ai, key in `.env.local`) → `scripts/optimize-images.mjs` → static imports from `src/assets/images`. Product screens must use fictional data only.
