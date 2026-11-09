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
tracked tight; body is **Nunito Sans**. Photographs are **printed in poster ink**:
one ink plus cream (a tritone: ink #161311 → the ink → cream #f7ecd8), like a
screenprinted travel poster. The one exception is Nic's headshot, which stays in
full color so the person is the only thing on the poster in his true colors.
Recognizable with all text removed: black-bordered color panels + hard shadows.

**RESTRAINT.** A real poster has one big image and a lot of paper. The loud
treatment (3px outline + hard shadow + saturated fill) is saved for a few
**moments** per page: the hero poster, the pricing cards, the closing CTA, and
buttons. Anty's ticket stand (the intake) is a sanctioned moment of its own,
with the material set recorded under "Anty's ticket stand" below. Everything between them sits flat on the cream, held together by space
and 2px ink rules. If a new element wants an outline and a shadow, it has to
replace one of the moments, not join them. (Set 2026-09-30 after the site read
as too busy: 61 outlines, 41 shadows, 7 stickers and 10 sections on one page.)

**STORY.** A small-business owner (or agency, or organization) lands in a bright,
printed world, immediately meets Nic in the hero poster, reads his promise, sees
honest flat prices on color-block cards, and acts. The front door at `/` runs hero →
three doors (Small business, Organization, Agency), the doors standing in for the
pricing cards as its loud moment, each pressing like a button and marked with its
audience's switcher color; the header's own switcher steps aside there. (The
GitHub Pages export still serves the holding card at `/`, since Pages can't run
the rest of the site; it uses the 5px shadow and an untilted mark.) Each home runs hero → promise →
pricing → how it works → questions → CTA, and says each thing once (the
organizations home skips the promise and goes straight from hero to care plans, and
skips how it works, going from its build prices straight to questions).

**FIRST VIEWPORT.** Left: huge Rubik headline with one red italic phrase, lead,
chunky primary button + text link. Right: two overlapping prints, Nic's own
photo of the Boise Depot tower printed in cobalt (4:5), and his full-color
headshot (square, with a small "Hi, I'm Nic" label) laid over its lower right
corner. Under them, one plain line with a map pin: "Based in Boise, Idaho.
Working with clients anywhere." Cream ground throughout. (Replaced the 2×2 grid
of Nic plus burger, watermelon, and basket tiles on 2026-10-07.)

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
never a mid-gray. Strategy = **Full palette, placed**: each ink has one job.
Blue also prints the hero's Depot photo. Red-deep = primary action and the CTA
box; yellow = highlight (sticker, step numbers, link underlines, CTA button); pink =
the featured pricing card on the business and agency homes (the organizations
home marks its featured plan with a yellow "Best for most" band across the card's
top instead, the card raised by the band's height so prices still align); green-deep = checks and tier kickers. Section
backgrounds stay cream: no colored bands, no rainbow card rows.

## Type

Display: **Rubik**, letter-spacing ≈ -0.02em. h1 900, h2 800, h3 / labels /
buttons 700; prices 900. Body: **Nunito Sans** at 400, with 600–700 only for
small labels. List and card body text stays regular weight; heavy weights are
for headings, not paragraphs. No serif — the old Fraunces is retired with the
old world. Display max ~6rem; body measure 60–72ch.

## Material rules (durable)

- **Outlines on the moments, rules everywhere else.** Hero tiles, pricing cards,
  CTA box, buttons, brand mark: `3px solid var(--ink)`. Quiet structure (nav and
  footer edges, FAQ and price-list dividers, form inputs, the sticker, the switcher)
  uses `2px` ink. 1px hairlines belong to the old world. Secondary content (steps,
  promises, FAQ, kit, contact notes) gets no card container at all.
- **Hard shadows only, two sizes.** `--sh-sm` (3px) and `--sh` (5px), both
  `Npx Npx 0 var(--ink)`, zero blur. Only the moments carry one.
- **Flat fills, no gradients.** Color is flat and printed. A faint paper grain
  overlay is allowed; smooth gradients are not.
- **Press interaction.** Buttons shift into their shadow on hover/active like a
  pressed stamp. Non-interactive cards never move on hover.
- **One sticker per page.** A yellow bordered chip over the section that matters
  most (pricing or plans on the audience homes). `/contact` carries none: the
  stand is that page's moment. No tilt; the only tilted mark in the world is the
  ticket's rubber stamp (below), and that exception belongs to the stamp alone.
  Every other section opens on its heading alone.
- **Gingham twice.** The CTA box's top edge and the footer seam. Nowhere else.
- **One moment of motion per page.** The hero prints lift off the paper on load
  (transform and shadow only, visible from the first frame). No scroll reveals.
  Disabled under `prefers-reduced-motion`. The ticket stand has its own bounded
  motion set (below); nothing outside it may borrow those motions.
  The header is the one piece of chrome that moves (Nic, 2026-11-09): it slides
  up out of view while the page scrolls down and back on any scroll up (0.28s,
  ease-out in, ease-in away; `useTuck` in `Nav.js`), staying put within 80px of
  the top and while keyboard focus is inside it. Under reduced motion it snaps.
- **Location, lightly.** Nic is based in Boise, Idaho and works with clients
  anywhere. Say so in small lines (the hero caption, "Made in Boise, Idaho" in the
  footer), never as a service area.
- **Icons in-world.** Food/UI icons are flat, bold-outline SVG in the poster inks —
  not emoji, not thin-line icon fonts. Arrows, close, check, chevron, and pencil
  are drawn SVG from the shared icon set, never text glyphs (← → × ✓) standing
  in for an icon.

## Anty's ticket stand (the intake moment)

A conversational intake staged as a picnic stand. The same stand opens as a
native modal dialog over any audience page from every start/contact link, and
sits inline on `/contact`. It belongs to the poster world; it is not a second
world. Anty (red ant, ink outlines, yellow pencil) is drawn as inline SVG in the
site's bold-outline grammar.

**Frame.** On desktop, a modal about 1080px wide with a 3px ink outline, 20px
corners, and the 5px hard shadow, over a dotted cream wash (the paper grain, not
a gradient). It sizes itself to its content, grows as the ticket fills, never
shrinks back once grown, and stops at the viewport, where each half scrolls on its
own. Inline on `/contact` it is the same box. On phones (≤760px) it becomes a
full-screen sheet with no outline or shadow.

**Two halves.** Left (~53%): the cream counter side. Anty and his comic balloon
(white, 3px outline, 18px corners, tail pointing at his mouth, no shadow) sit
above the **counter strip**, a yellow bar with 3px ink rules on top and bottom
and a small uppercase sign; Anty's hands rest on its top edge. The answer sits
below the counter, and a 2px-ruled foot holds back, progress, and skip. Right: the
**blue board**, a flat `--blue` field split from the counter by a 3px ink rule,
with the ticket clipped to it. On phones the board collapses to a blue peek bar
under the sheet's top edge ("Your ticket · N lines" plus the latest line); tap
it and the board takes over the sheet. Review and sent show the ticket inline.

**Chips.** Answers are quiet 2px-outline chips (white, 12px corners, no shadow).
Hover warms them to a pale yellow; a picked chip fills yellow and gets a small
ink check badge on its corner. Typed answers use the same 2px white field with a
blue focus ring. One 3px stamp button (the site's button) per step.

**Progress.** Always four parts, fixed per flow (for example About you · The
site · The details · Wrap-up): small 2px-outlined bars, done ones filled ink, the
current one yellow. Never a step count that grows or reflows.

**The ticket.** A white sheet, 3px outline, 12px corners, 5px hard shadow. A
red-deep "Ticket for Nic" band with white uppercase type and the date on its
top edge. Answer lines are printed blue rules (2px, blue at low opacity) with
small uppercase ink-soft labels on the left. The tier line runs dot leaders
(2px dotted ink) to the one real price, set at 900. Each answered line is a
button that reopens its question. A dashed 2px tear-off footer carries the
"not an order" note, with the stamp in its own corner of that strip. On a long
ticket the red band stays pinned to the top of the board and a dark "More of
your ticket" pill sits at the board's foot.

**The stamp.** READY FOR NIC in red-deep at 900, a 3px outline in its own color
with an inset double rule, on a translucent white ground, tilted -5deg. It is the
only tilted element in the world. It never says "sent": the visitor sends the
ticket from their own email app, so the stand can't know that it went.

**Stand motion, bounded.** The stand moves only on these beats:
- the modal lifts off the paper on open with the hero's ease (on phones the sheet
  slides up) and drops back on close;
- each answer is written in: a left-to-right clip-path wipe, then a yellow marker
  that fades out;
- Anty's pencil arm scribbles, bound to each write;
- the stamp comes down hard on send (accelerating ease-in, stopping dead);
- two story beats for Anty: a wave on hello, a hop once the ticket is sent.
Pointing at the ticket during review is a pose, not a motion. No idle loops and
no per-step pops. All of it is off under `prefers-reduced-motion`.

**Honesty you can see.** The ticket carries no ticket or order number. The only
price that appears is a real published price on the tier line. Every ticket's
footer says what it is not ("Not an order", "Not an agreement", "Not a
sign-up") and that Nic replies personally.

## Preserved from before (product, not look)

Audience switcher (small business `/for-business`, agency `/for-agencies`, organization
`/for-organizations`; no-reload, nav-wide; below the header on phones so the sticky
bar stays one row), Nic-centered positioning, honest no-proof stance, SEO (per-URL
titles/H1, sitemap, robots), reduced-motion support, WCAG AA contrast.
