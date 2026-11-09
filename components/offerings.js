// Everything picnicdev sells, in one place. The pricing cards and Anty's
// ticket both read from here, so a price only ever changes once.

// One-off build tiers, shown on the small-business and organization homes.
export const buildTiers = [
  {
    id: "static",
    kicker: "The Picnic Basket",
    name: "Static",
    from: "from",
    price: "$500",
    desc: "A fast, custom-built site with no ongoing software to maintain. Ideal for small businesses that need to look professional and load instantly.",
    features: [
      "Custom, mobile-responsive design",
      "Up to ~5 pages, hand-built",
      "Contact form & basic SEO",
      "Blazing-fast performance",
      { icon: "leaf", label: "Free hosting included" },
      "You only pay for your domain (~$15/yr)",
    ],
    muted: ["No content management system"],
    cta: "Start a static site",
  },
  {
    id: "wordpress",
    kicker: "The Spread",
    name: "WordPress",
    from: "from",
    price: "$1,500",
    badge: "Best for most",
    desc: "Everything in Static, plus a full WordPress CMS so you can edit pages, publish posts, and grow the site yourself over time.",
    features: [
      "Everything in Static",
      "Custom WordPress theme",
      "Editable pages & blog",
      "Plugins & integrations (forms, SEO, etc.)",
      "Editor training & handoff",
      "Managed hosting options available",
    ],
    cta: "Start a WordPress build",
    variant: "featured",
  },
  {
    id: "custom",
    kicker: "The Whole Feast",
    name: "Custom",
    price: "Let’s talk",
    quote: true,
    desc: "For projects that need more than a standard site: custom WordPress or a web app built around how your business works.",
    features: [
      "Custom WordPress or a web app",
      "Logins, payments, bookings, dashboards",
      "Connects to the tools you already use",
      "A private test copy to try changes first",
      "Every update tested before it goes live",
      "Ongoing support & maintenance",
    ],
    cta: "Scope a custom project",
  },
];

// Partnership shapes for agencies. Rates are set per agency, so these carry no price.
export const partnerTiers = [
  {
    id: "per-project",
    kicker: "The à la carte",
    name: "Per-project builds",
    desc: "You send designs, I return a built, tested, on-brand site. Scoped and priced per project.",
    features: [
      "WordPress, static, or custom",
      "Pixel-faithful to your design",
      "Delivered ready for your client",
    ],
    cta: "Discuss a build",
  },
  {
    id: "retainer",
    kicker: "The standing table",
    name: "Overflow & retainer",
    badge: "Best for most",
    desc: "Reserve ongoing development capacity for busy months and tight deadlines — a dependable extra seat on your team.",
    features: [
      "Priority turnaround",
      "Set hours or builds per month",
      "One familiar developer",
    ],
    cta: "Talk terms",
    variant: "featured",
  },
  {
    id: "app-dev",
    kicker: "The whole feast",
    name: "Custom & app dev",
    desc: "Complex builds and web applications — deployed on fly.io with CI/CD and everything wired up properly.",
    features: [
      "Bespoke features & apps",
      "fly.io deploys + CI/CD",
      "Staging & production",
    ],
    cta: "Scope a project",
  },
];

// Monthly plans for organizations. Every plan includes hosting and upkeep;
// Steady adds everyday edits; Part-time dev adds new pages and features too.
export const carePlans = [
  {
    id: "essentials",
    kicker: "The Thermos",
    name: "Essentials",
    price: "$50",
    per: "/mo",
    desc: "Keeps a finished site warm and safe: hosted, updated, backed up, and watched.",
    features: [
      { icon: "leaf", label: "Managed hosting included" },
      "Software & security updates",
      "Daily backups & uptime monitoring",
    ],
    muted: ["Content edits & small fixes"],
    cta: "Start Essentials",
  },
  {
    id: "steady",
    kicker: "Don’t Go It Alone",
    name: "Steady",
    price: "$250",
    per: "/mo",
    badge: "Best for most",
    desc: "For the everyday changes: a new staff bio, an event page, a broken form needing fixed. Send them over and I'll take care of them.",
    features: [
      "Everything in Essentials",
      "Content edits & small fixes",
      "Event pages & announcements",
      "Quarterly site check-up",
    ],
    cta: "Start Steady",
    variant: "banner",
  },
  {
    id: "part-time",
    kicker: "The Regular",
    name: "Part-time dev",
    price: "$500",
    per: "/mo",
    desc: "For a site that keeps growing: new pages, new features, and bigger changes, from a developer who already knows it.",
    features: [
      "Everything in Steady",
      "Website updates and changes",
      "New pages & sections",
      "New features & integrations",
      "Help planning what to build next",
      "Priority replies",
    ],
    cta: "Start Part-time dev",
  },
];

/** Look up any offering by id, with the audience it belongs to. */
export function findOffering(id) {
  const b = buildTiers.find((t) => t.id === id);
  if (b) return { ...b, group: "build" };
  const p = partnerTiers.find((t) => t.id === id);
  if (p) return { ...p, group: "partner" };
  const c = carePlans.find((t) => t.id === id);
  if (c) return { ...c, group: "plan" };
  return null;
}

/** "from $1,500", "$249/mo", or null for quoted / unpriced work. */
export function priceLabel(t) {
  if (!t || !t.price || t.quote) return null;
  return [t.from, `${t.price}${t.per || ""}`].filter(Boolean).join(" ");
}
