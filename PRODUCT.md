# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: small-business owners** commissioning their first real website or replacing a
dated/DIY one. They are not technical, are cost-sensitive, and are wary of being upsold or
locked into recurring fees. Their job: get a professional site launched quickly, at a price
they can see up front, without having to learn web development or manage a vendor relationship.

**Secondary: digital/design agencies** who need development capacity. Their job: hand off a
finished design and get it built reliably and on time under their own brand (white-label),
without hiring an in-house developer. This is a real revenue line but the marketing site is
optimized to convert the primary audience first.

**Also served: nonprofits and local organizations** (chambers of commerce, economic development
agencies, community groups) with ongoing but part-time web needs. Their job: keep a site hosted,
maintained, and improving with a few developer hours a month, without hiring a full-time person
or leaning on volunteers. Home route: `/for-organizations`, built around monthly care plans.

## Product Purpose

picnicdev is a one-person web development studio that builds and ships websites and web
applications for small businesses, and provides white-label development to agencies. It exists
to make getting a good website unintimidating, honestly priced, and low-maintenance — removing
the two things that scare small-business owners off: surprise costs and jargon. Success is a
small-business owner launching a site they're proud of, understanding exactly what they paid
for, and carrying near-zero ongoing cost.

## Positioning

**You work directly with one experienced developer — start to finish.** No account managers,
no sales layer, no outsourced hand-offs. The person who quotes the work builds the work and
answers your email. For a small-business owner this means honest, fast, plain-language answers
and accountability from a single senior person; for agencies it means a dependable developer who
plugs in cleanly. A larger agency cannot truthfully make this claim, and a freelancer
marketplace cannot guarantee it.

Supporting (true, but not the lead): flat up-front pricing, and static sites hosted free so the
client's only recurring cost is typically their domain.

## Operating Context

Engagements run over email/direct contact rather than a portal: inquiry → plan + flat quote →
design → build → launch → post-launch support. Clients choose from three service tiers:

- **Static** — from $500. Hand-built site, free hosting, client pays only for a domain (~$15/yr).
- **WordPress** — from $1,500. Custom theme + CMS so the client can edit content and blog.
- **Custom** — quoted per project. Custom WordPress or standalone application development,
  deployed on fly.io with CI/CD, staging + production environments.

Agency Partner Program runs in parallel: picnicdev builds from the agency's designs under the
agency's brand, including overflow/staff-augmentation work.

Monthly care plans (organizations audience) bundle managed hosting, updates, backups, and
monitoring, plus a fixed block of developer hours on the upper two:
- **Essentials** — $50/mo. Hosting and upkeep only; no developer hours, no content edits.
- **Steady** — $250/mo. 2 developer hours a month, for small updates and ongoing changes.
- **Part-time dev** — $500/mo. 5 developer hours a month, for new features and bigger work.

## Capabilities and Constraints

- Delivers: static sites (hand-built / modern frameworks incl. Next.js), WordPress (custom
  themes, plugins, integrations), and custom web applications with fly.io deployment and CI/CD.
- One-person studio: capacity is finite; positioning depends on the founder personally doing
  the work, so future copy must not imply a team or call-center scale.
- Free hosting applies specifically to static builds (generous static-host free tiers).
  WordPress and custom apps carry hosting costs that vary by project — future work must not
  imply those are also free.
- Leads come in through **Anty's ticket stand**: a conversational intake that opens over any
  audience page from the start/contact links (and inline at `/contact`). Anty is Nic's helper —
  never Nic, never an AI — and every reply comes from Nic himself. The site is static files on
  GitHub Pages with no server (2026-11-09): a finished ticket opens in the visitor's own email
  app, addressed to Nic and written up, and they send it from there (with a copy button for
  anyone without an email app). Stored tickets, Resend notifications and the `/inbox` live on
  the `feature/server-intake` branch for later.
  The public contact address is **`nic@picnicdev.com`**, set once in `lib/contact.js` (every
  mailto and the intake read it); confirm it receives mail before launch.
- Nic is **based in Boise, Idaho** and works with clients anywhere. Say where he is in
  small honest lines ("Made in Boise, Idaho"); do not claim a local-only service area.

## Brand Commitments

- Name: **picnicdev** (lowercase), domain **picnicdev.com**. The "picnic" metaphor is
  intentional: approachable, unfussy, welcoming — the opposite of a stiff corporate agency.
- Voice: warm, plain-spoken, friendly, and honest. No jargon, no hard-sell, no fake urgency.
  Confident but humble; a real human talking, not a brand.
- Founder-led and founder-built; the single-developer relationship is a brand promise, not just
  an operational fact.

## Evidence on Hand

- **No public proof exists yet.** No portfolio of showable client sites, no testimonials, no
  published client list, and no cited track record have been confirmed. Future work must NOT
  fabricate case studies, reviews, client logos, star ratings, "trusted by" claims, or
  statistics. Proof-driven sections should be omitted or left as honest placeholders until real
  evidence is provided.
- The picnicdev marketing site itself (this repository) is the one live artifact and can stand
  as a demonstration of build quality.

## Product Principles

1. **Honesty over persuasion.** Every price, claim, and cost is stated plainly and up front;
   never manufacture proof, urgency, or scale the studio doesn't have.
2. **One human, accountable.** The direct relationship with a single senior developer is the
   core promise — keep the product and its messaging personal, not corporate.
3. **Small-business-first.** When priorities compete, optimize for the non-technical owner:
   clarity, low cost, and low maintenance beat cleverness.
4. **Low-maintenance by default.** Favor the simplest durable solution (often static) so clients
   aren't saddled with ongoing cost or upkeep.
5. **Approachable, never fussy.** The picnic ethos: make web development feel easy and welcoming.

## Accessibility & Inclusion

Audience skews non-technical and includes older small-business owners; the site must stay
legible and usable — strong contrast, real text (not text-in-images), keyboard-navigable, and
respectful of reduced-motion preferences. No stricter formal standard has been established.
