# Design

<!-- impeccable:design-schema 1 -->

## Direction contract

**THESIS.** picnicdev looks like a **silkscreen picnic poster**, not a soft SaaS
landing page. Flat saturated color blocks, thick black outlines, and hard offset
shadows — a printed, tactile, joyful grid of panels. It refuses the cream-and-
serif "friendly studio" default (which is exactly where this site started).

**OWN-WORLD.** Warm cream ground (#f7ecd8). Five poster inks used as whole fields,
never as timid accents: cobalt blue, tomato red-orange, kelly green, golden yellow,
picnic pink. Everything is drawn with a **3px near-black outline** (#161311) and sits
on a **hard, un-blurred offset shadow** (e.g. `6px 6px 0`). Corners lightly rounded
(12–16px), never pill-soft. Display type is **Rubik** at heavy weights (700–900),
tracked tight; body is **Nunito Sans**. Illustrations are flat, bold-outline food
(sandwich, chips, watermelon, basket, strawberry) rendered in the poster inks.
Recognizable with all text removed: black-bordered color panels + hard shadows.

**STORY.** A small-business owner (or agency) lands in a bright, confident printed
world, immediately meets Nic in a bold framed panel, sees honest flat prices on
color-block cards, and acts.

**FIRST VIEWPORT.** Left: sticker eyebrow, huge Rubik headline, lead, chunky primary
button + text link, price reassurance. Right: a modular grid of framed poster panels
— Nic's intro card plus flat-outline picnic-food tiles. Cream ground throughout.

**FORM.** Brief-pinned by the user's reference image (a screenprint picnic-food grid).
No concept roll — a pinned brief beats the roll.

## Platform

web

## Color

Ground: `--paper #f7ecd8` (warm cream), `--paper-2 #fffaf0` insets.
Ink / borders / text: `--ink #161311` (near-black; all outlines use this).
Poster inks (used as whole fields): `--blue #2b5fd0`, `--red #e8461e`,
`--green #1f9b4b`, `--yellow #f4bd1e`, `--pink #f2b3cb`, `--white #fffdf6`.
Deep variants for text-on-color / hovers: `--blue-deep`, `--red-deep`,
`--green-deep`. Text on a saturated field is white or near-black chosen for ≥4.5:1;
never a mid-gray. Strategy = **Full palette** (poster is the product).

## Type

Display: **Rubik** (700 / 800 / 900), letter-spacing ≈ -0.02em, for h1–h3, prices,
brand, buttons. Body: **Nunito Sans** (400/700/800). No serif — the old Fraunces is
retired with the old world. Display max ~6rem; body measure 60–72ch.

## Material rules (durable)

- **Outlines, not hairlines.** Panels, cards, buttons, inputs, tiles: `3px solid
  var(--ink)`. 1px borders belong to the old world.
- **Hard shadows only.** `box-shadow: Npx Npx 0 var(--ink)` — zero blur, solid.
  Soft/blurred shadows are banned in this world.
- **Flat fills, no gradients.** Color is flat and printed. A faint paper grain
  overlay is allowed; smooth gradients are not.
- **Press interaction.** Buttons/interactive panels shift into their shadow on
  hover/active (`translate(3px,3px)` + shrink shadow) like a pressed stamp.
- **Sticker eyebrows.** Section kickers are bold bordered chips, optionally rotated
  a degree or two — a poster device, used with restraint (not on every block).
- **Icons in-world.** Food/UI icons are flat, bold-outline SVG in the poster inks —
  not emoji, not thin-line icon fonts.

## Preserved from before (product, not look)

Audience switcher (small-business `/` ↔ agency `/for-agencies`, no-reload, nav-wide),
all copy, the three tiers, Nic-centered positioning, honest no-proof stance, SEO
(per-URL titles/H1, sitemap, robots), reduced-motion support, WCAG AA contrast.
