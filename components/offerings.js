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
    desc: "For projects that need more than a template. Custom WordPress or a standalone application, engineered and deployed properly.",
    features: [
      "Custom WordPress or standalone app",
      "Bespoke features & integrations",
      "fly.io deployment",
      "CI/CD pipelines set up",
      "Staging + production environments",
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

// Monthly all-inclusive plans for organizations. PLACEHOLDER prices and
// hours — set real numbers before launch.
export const carePlans = [
  {
    id: "essentials",
    kicker: "The Thermos",
    name: "Essentials",
    price: "$249", // PLACEHOLDER
    per: "/mo",
    desc: "Keeps a finished site warm and safe, with a little developer time for the small stuff that comes up.",
    features: [
      { icon: "leaf", label: "Managed hosting included" },
      "Software & security updates",
      "Daily backups & uptime monitoring",
      "2 developer hours a month", // PLACEHOLDER
      "Content edits & small fixes",
    ],
    cta: "Start Essentials",
  },
  {
    id: "steady",
    kicker: "The Potluck",
    name: "Steady",
    price: "$549", // PLACEHOLDER
    per: "/mo",
    badge: "Best for most",
    desc: "For organizations that keep their site busy with events, campaigns, and new pages throughout the year.",
    features: [
      "Everything in Essentials",
      "5 developer hours a month", // PLACEHOLDER
      "New pages, forms & landing pages",
      "Plugin & integration work",
      "Quarterly site check-up",
    ],
    cta: "Start Steady",
    variant: "featured",
  },
  {
    id: "part-time",
    kicker: "The Regular",
    name: "Part-time dev",
    price: "$999", // PLACEHOLDER
    per: "/mo",
    desc: "Real development capacity each month, for ongoing projects that don't justify a full-time hire.",
    features: [
      "Everything in Steady",
      "10 developer hours a month", // PLACEHOLDER
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
