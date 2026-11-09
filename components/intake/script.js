// Anty's script. One flow per kind of visitor (a build, an agency partnership,
// a care plan). Each step is one thing Anty says, how the visitor answers, and
// the line it writes onto the ticket for Nic.
//
// Step fields
//   id        answer key
//   kind      "single" | "multi" | "text" | "long" | "reach" | "review", or
//             "passive" for a step that is never asked and only writes a line
//   say       (a, ctx) => string. *stars* mark the phrase Anty stresses.
//   aside     optional (a, ctx) => string, the small print under the balloon
//   options   array, or (a, ctx) => array, of { id, label, sub?, other?, only? }
//             `other` opens a short text box; `only` clears the rest (multi)
//   optional  the visitor may skip it (skipLabel names the skip)
//   when      (a, ctx) => boolean, whether the step applies at all
//   line      (a, ctx) => { k, v, price? } | null, what lands on the ticket
//
// Answers: single → { id, text? }, multi → { ids: [], text? }, text → string,
// reach → { id: "email" | "call" | "text", email?, phone? }. `ctx` is { audience, start, group,
// offering, step }.

import { findOffering, priceLabel, carePlans, buildTiers } from "../offerings";
import { CONTACT_EMAIL } from "@/lib/contact";

export const ANT_NAME = "Anty";
export const NIC_EMAIL = CONTACT_EMAIL;

/* ---------------- helpers ---------------- */

export const idOf = (v) => (v && typeof v === "object" ? v.id : v) || null;
const has = (v, id) => !!(v && v.ids && v.ids.includes(id));
const firstName = (a) => (a.name || "").trim().split(/\s+/)[0] || "";
const comma = (a) => (firstName(a) ? `, ${firstName(a)}` : "");
const bare = (url) =>
  String(url || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");

export function optionsOf(step, a, ctx) {
  const o = typeof step.options === "function" ? step.options(a, ctx) : step.options;
  return (o || []).filter(Boolean);
}

/** Plain-language text for a chip answer: the chosen labels plus any typed extra. */
export function answerText(step, value, a, ctx) {
  if (value == null) return "";
  const opts = optionsOf(step, a, ctx);
  const label = (id) => {
    const o = opts.find((x) => x.id === id);
    return o ? o.ticket || o.label : id;
  };
  if (step.kind === "single") {
    const o = opts.find((x) => x.id === value.id);
    if (o?.other && value.text) return value.text;
    return label(value.id);
  }
  if (step.kind === "multi") {
    const parts = (value.ids || [])
      .filter((id) => !opts.find((o) => o.id === id)?.other)
      .map(label);
    if (value.text) parts.push(value.text);
    return parts.join(", ");
  }
  return String(value);
}

const said = (k) => (a, c) => (a[c.step.id] ? { k, v: answerText(c.step, a[c.step.id], a, c) } : null);

/* ---------------- steps every flow shares ---------------- */

// The opening is the same for everyone: a name, the best way to reach them,
// then a choice between a few quick questions and just hearing from Nic.

const nameStep = {
  id: "name",
  kind: "text",
  say: (a) =>
    idOf(a.track || a.plan) === "unsure" ? "No problem, that's what Nic's for. What's your name?" : "What's your name?",
  placeholder: "Your first name",
  autoComplete: "given-name",
  max: 80,
  // shown in the ticket's "For" line, not as its own line
};

export const REACH = [
  { id: "email", label: "Email", ticket: "email is best", field: "email" },
  { id: "call", label: "Phone call", ticket: "prefers a call", field: "phone" },
  { id: "text", label: "Text message", ticket: "prefers a text", field: "phone" },
];

const reachStep = {
  id: "reach",
  kind: "reach",
  say: (a) => `Nice to meet you${comma(a)}! What's the best way to contact you?`,
  aside: () => "Nic only uses it to reply about your project. No newsletters, no sharing.",
  options: REACH,
  line: (a) => {
    const r = a.reach;
    const how = REACH.find((o) => o.id === r?.id);
    const value = how && (how.field === "email" ? r.email : r.phone);
    return value ? { k: "Contact", v: `${value} · ${how.ticket}` } : null;
  },
};

const paceStep = (aside) => ({
  id: "pace",
  kind: "single",
  say: (a) => `Thanks${comma(a)}! Do you have time for a few quick questions, or should Nic just reach out?`,
  aside: () => aside,
  options: [
    { id: "questions", label: "Sure, ask away", sub: "About two minutes, mostly tapping" },
    { id: "callback", label: "Just have Nic reach out", sub: "Writes Nic a short email with your name and contact" },
  ],
  line: (a) => (idOf(a.pace) === "callback" ? { k: "Asked for", v: "Nic to reach out" } : null),
});

const notesStep = (aside) => ({
  id: "notes",
  kind: "long",
  optional: true,
  say: (a) => `Thanks${comma(a)}! Anything else Nic should know?`,
  aside: () => aside,
  placeholder: "Totally optional.",
  max: 2000,
  line: (a) => (a.notes ? { k: "Notes", v: a.notes } : null),
});

const heardStep = {
  id: "heard",
  kind: "single",
  optional: true,
  say: () => "Just curious: how did you find picnicdev?",
  options: [
    { id: "search", label: "Searching online" },
    { id: "friend", label: "A friend or referral" },
    { id: "social", label: "Social media" },
    { id: "other", label: "Somewhere else", other: true, placeholder: "Where was it?" },
  ],
  line: said("Found via"),
};

const reviewStep = () => ({
  id: "review",
  kind: "review",
  say: (a) => `That's your ticket${comma(a)}! Give it a once-over.`,
  aside: () => "Tap any line on the ticket to change it.",
});


/* ---------------- builds: a small business, or an organization's new site ---------------- */

const BUILD_NOUN = { static: "Static site", wordpress: "WordPress build", custom: "Custom project" };

function buildLine(id) {
  if (id === "unsure") return { k: "Build", v: "Not sure yet", price: "Nic will suggest one" };
  const t = findOffering(id);
  return { k: "Build", v: t?.name || id, price: priceLabel(t) || "quoted per project" };
}

const BUSINESS_KINDS = [
  { id: "food", label: "Food & drink" },
  { id: "retail", label: "Shop or retail" },
  { id: "trades", label: "Trades & home services" },
  { id: "beauty", label: "Beauty & wellness" },
  { id: "pro", label: "Professional services" },
  { id: "creative", label: "Creative or studio" },
  { id: "other", label: "Something else", other: true, placeholder: "In a few words?" },
];

const ORG_KINDS = [
  { id: "nonprofit", label: "Nonprofit or charity" },
  { id: "chamber", label: "Chamber of commerce" },
  { id: "econ", label: "Economic development" },
  { id: "community", label: "Community group or club" },
  { id: "faith", label: "Faith community" },
  { id: "other", label: "Something else", other: true, placeholder: "In a few words?" },
];

const SITE_ISSUES = {
  id: "site_issues",
  kind: "multi",
  optional: true,
  when: (a) => idOf(a.site) === "yes",
  say: () => "What's bugging you about it?",
  aside: () => "Pick any that apply.",
  options: [
    { id: "dated", label: "Looks dated" },
    { id: "update", label: "Hard to update" },
    { id: "slow", label: "It's slow" },
    { id: "phones", label: "Bad on phones" },
    { id: "quiet", label: "Doesn't bring anyone in" },
    { id: "diy", label: "I made it myself" },
    { id: "other", label: "Something else", other: true, placeholder: "What's wrong with it?" },
  ],
  // folded into the "Current site" line
};

function buildFlow(ctx) {
  const org = ctx.audience === "org";
  const track = (a) => idOf(a.track) || ctx.start;
  return [
    {
      // never asked: writes the tier line the visitor arrived with
      id: "intro",
      kind: "passive",
      line: (a) => (track(a) ? buildLine(track(a)) : null),
    },
    nameStep,
    reachStep,
    paceStep("The more Nic knows, the more useful his first reply. Either way is fine."),
    {
      id: "track",
      kind: "single",
      // asked when the visitor didn't come from a tier card, or reopened from the ticket
      when: (a) => !ctx.start || "track" in a,
      say: (a) => ("track" in a ? "What are we building?" : "First up: what are we building?"),
      options: () =>
        buildTiers
          .map((t) => ({
            id: t.id,
            label: { static: "A simple, speedy site", wordpress: "A site I can edit myself", custom: "Something custom" }[t.id] || t.name,
            sub: `${t.name} · ${priceLabel(t) || "quoted"}`,
          }))
          .concat({ id: "unsure", label: "Not sure yet", sub: "Nic will suggest one" }),
      // the intro step writes the "Build" line
    },
    {
      id: "org",
      kind: "text",
      optional: true,
      skipLabel: "No name yet",
      say: () => `Great! What's the ${org ? "organization" : "business"} called?`,
      placeholder: org ? "Organization name" : "Business name",
      autoComplete: "organization",
      max: 120,
    },
    {
      id: "kind",
      kind: "single",
      say: (a) =>
        org
          ? a.org ? `And what kind of organization is *${a.org}*?` : "And what kind of organization is it?"
          : a.org ? `And what does *${a.org}* do?` : "And what kind of business is it?",
      options: org ? ORG_KINDS : BUSINESS_KINDS,
      line: said(org ? "Organization" : "Business"),
    },
    {
      id: "where",
      kind: "text",
      optional: true,
      say: () => "Where are you based?",
      aside: () => "Helps Nic with local search and time zones.",
      placeholder: "Town or city",
      autoComplete: "address-level2",
      max: 120,
      line: (a) => (a.where ? { k: "Based in", v: a.where } : null),
    },
    {
      id: "site",
      kind: "single",
      say: () => "Do you have a website right now?",
      options: [
        { id: "yes", label: org ? "Yes, we do" : "Yes, I do" },
        { id: "social", label: "Just social media" },
        { id: "none", label: "Not yet, this is the first" },
      ],
      line: (a) => {
        const s = idOf(a.site);
        if (!s) return null;
        if (s === "none") return { k: "Current site", v: "None yet, this is the first" };
        if (s === "social") return { k: "Online now", v: a.social_url ? bare(a.social_url) : "Social media only" };
        const where = a.site_url ? bare(a.site_url) : "Yes";
        const issues = a.site_issues ? answerText(SITE_ISSUES, a.site_issues, a, ctx).toLowerCase() : "";
        return { k: "Current site", v: issues ? `${where} (${issues})` : where };
      },
    },
    {
      id: "site_url",
      kind: "text",
      optional: true,
      when: (a) => idOf(a.site) === "yes",
      say: () => "What's the address? Nic will take a look.",
      placeholder: org ? "yourorganization.org" : "yourbusiness.com",
      inputMode: "url",
      max: 200,
    },
    SITE_ISSUES,
    {
      id: "social_url",
      kind: "text",
      optional: true,
      when: (a) => idOf(a.site) === "social",
      say: () => "Which page should Nic peek at?",
      placeholder: "instagram.com/yourpage",
      inputMode: "url",
      max: 200,
    },
    {
      id: "goals",
      kind: "multi",
      say: () => "What should the new site do for you?",
      aside: () => "Pick as many as you like.",
      options: org
        ? [
            { id: "credible", label: "Look credible" },
            { id: "find", label: "Help people find us" },
            { id: "explain", label: "Explain what we do" },
            { id: "events", label: "Promote events" },
            { id: "donate", label: "Take donations" },
            { id: "news", label: "Share news" },
            { id: "members", label: "Serve our members" },
            { id: "other", label: "Something else", other: true, placeholder: "What else?" },
          ]
        : [
            { id: "pro", label: "Look professional" },
            { id: "find", label: "Help new customers find me" },
            { id: "show", label: "Show what I offer" },
            { id: "book", label: "Take bookings" },
            { id: "sell", label: "Sell online" },
            { id: "news", label: "Share news or a blog" },
            { id: "leads", label: "Get more enquiries" },
            { id: "other", label: "Something else", other: true, placeholder: "What else?" },
          ],
      line: said("Wants it to"),
    },
    {
      id: "pages",
      kind: "multi",
      say: () => "Which pages are you picturing?",
      aside: () => "Rough is fine. Nic will help shape it.",
      options: (a) => [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "services", label: org ? "What we do" : "Services" },
        idOf(a.kind) === "food" && { id: "menu", label: "Menu" },
        { id: "gallery", label: "Gallery" },
        (org || has(a.goals, "events")) && { id: "events", label: "Events" },
        { id: "blog", label: org ? "News" : "Blog" },
        { id: "faq", label: "FAQ" },
        { id: "contact", label: "Contact" },
        has(a.goals, "sell") && { id: "shop", label: "Shop" },
        has(a.goals, "book") && { id: "booking", label: "Booking" },
        has(a.goals, "donate") && { id: "donate", label: "Donate" },
        { id: "unsure", label: "Not sure yet", only: true },
      ],
      line: (a, c) => {
        if (!a.pages) return null;
        const n = (a.pages.ids || []).filter((id) => id !== "unsure").length;
        const v = answerText(c.step, a.pages, a, c);
        return { k: "Pages", v: n > 1 ? `${v} (${n})` : v };
      },
    },
    {
      id: "features",
      kind: "multi",
      optional: true,
      when: (a) => track(a) !== "custom",
      say: (a) =>
        track(a) === "wordpress"
          ? "Anything it needs to *do*? WordPress plugins can handle a lot."
          : "Anything it needs to *do*, beyond showing pages?",
      options: [
        { id: "forms", label: "Contact forms" },
        { id: "booking", label: "Online booking" },
        { id: "store", label: "Online store" },
        { id: "newsletter", label: "Newsletter sign-up" },
        { id: "events", label: "Events calendar" },
        { id: "reviews", label: "Show reviews" },
        { id: "insta", label: "Instagram feed" },
        { id: "members", label: "Members-only area" },
        { id: "langs", label: "More than one language" },
        { id: "none", label: "Just the pages", only: true },
      ],
      line: said("Must-haves"),
    },
    {
      id: "custom_what",
      kind: "long",
      when: (a) => track(a) === "custom",
      say: () => "Tell me about the custom bit. What should it do?",
      aside: () => "Plain words are perfect. No tech talk needed.",
      placeholder: "e.g. Customers log in, book a class, and pay online.",
      max: 2000,
      line: (a) => (a.custom_what ? { k: "The custom bit", v: a.custom_what } : null),
    },
    {
      id: "custom_parts",
      kind: "multi",
      optional: true,
      when: (a) => track(a) === "custom",
      say: () => "Which of these are involved?",
      aside: () => "Pick any that apply.",
      options: [
        { id: "accounts", label: "User accounts" },
        { id: "payments", label: "Payments" },
        { id: "dash", label: "Dashboards or reports" },
        { id: "connect", label: "Connects to other tools" },
        { id: "wp", label: "Custom WordPress" },
        { id: "app", label: "A standalone web app" },
        { id: "unsure", label: "Not sure yet", only: true },
      ],
      line: said("Involves"),
    },
    {
      id: "content",
      kind: "multi",
      say: () => "What have you already got?",
      aside: () => "Totally fine if it's none of it.",
      options: [
        { id: "logo", label: "A logo", ticket: "Logo" },
        { id: "brand", label: "Brand colors", ticket: "Brand colors" },
        { id: "words", label: "Written words", ticket: "Written copy" },
        { id: "photos", label: "Good photos", ticket: "Photos" },
        { id: "domain", label: "A domain name", ticket: "Domain" },
        { id: "none", label: "None of it yet", only: true },
      ],
      line: (a, c) => {
        if (!a.content) return null;
        if (has(a.content, "none")) return { k: "Has ready", v: "Starting from scratch" };
        return { k: "Has ready", v: answerText(c.step, a.content, a, c) };
      },
    },
    {
      id: "editor",
      kind: "single",
      optional: true,
      when: (a) => track(a) === "wordpress",
      say: () => "Who'll keep it up to date after launch?",
      options: [
        { id: "me", label: "Me" },
        { id: "team", label: org ? "Someone on our team" : "Someone on my team" },
        { id: "nic", label: "I'd rather Nic did it" },
        { id: "unsure", label: "Not sure yet" },
      ],
      line: said("Updates by"),
    },
    {
      id: "timeline",
      kind: "single",
      say: () => "When would you love to launch?",
      options: [
        { id: "asap", label: "As soon as possible" },
        { id: "month", label: "Within a month" },
        { id: "months", label: "In 1 to 3 months" },
        { id: "date", label: "By a certain date", other: true, placeholder: "When, and what's happening?" },
        { id: "relaxed", label: "No rush" },
      ],
      line: (a, c) => {
        const v = a.timeline;
        if (!v) return null;
        if (v.id === "date" && v.text) return { k: "Timeline", v: `By ${v.text}` };
        return { k: "Timeline", v: answerText(c.step, v, a, c) };
      },
    },
    {
      id: "budget",
      kind: "single",
      optional: true,
      say: (a) => {
        const t = track(a);
        const o = findOffering(t);
        if (t === "static" || t === "wordpress") return `${o.name} builds start at *${o.price}*. Where does your budget sit?`;
        if (t === "custom") return "Custom work is quoted per project. Do you have a budget in mind?";
        return "Do you have a rough budget in mind?";
      },
      aside: () => "This just helps Nic suggest the right fit. You'll always see a flat price before anything starts.",
      options: (a) => {
        const t = track(a);
        if (t === "static")
          return [
            { id: "base", label: "Around $500" },
            { id: "mid", label: "$500 to $1,000" },
            { id: "high", label: "$1,000 or more" },
            { id: "tight", label: "Tighter than that" },
            { id: "unsure", label: "Not sure yet" },
          ];
        if (t === "wordpress")
          return [
            { id: "base", label: "Around $1,500" },
            { id: "mid", label: "$1,500 to $3,000" },
            { id: "high", label: "$3,000 or more" },
            { id: "tight", label: "Tighter than that" },
            { id: "unsure", label: "Not sure yet" },
          ];
        if (t === "custom")
          return [
            { id: "low", label: "Under $5,000" },
            { id: "mid", label: "$5,000 to $15,000" },
            { id: "high", label: "$15,000 or more" },
            { id: "unsure", label: "Not sure yet" },
          ];
        return [
          { id: "low", label: "Under $1,000" },
          { id: "mid", label: "$1,000 to $3,000" },
          { id: "high", label: "$3,000 or more" },
          { id: "unsure", label: "Not sure yet" },
        ];
      },
      line: said("Budget"),
    },
    notesStep("Sites you love, worries, big ideas… or skip it."),
    heardStep,
    reviewStep(),
  ];
}

/* ---------------- agency partnerships ---------------- */

const SHAPES = {
  "per-project": { say: "*per-project builds*", ticket: "Per-project builds" },
  retainer: { say: "*overflow & retainer* work", ticket: "Overflow & retainer" },
  "app-dev": { say: "*custom & app development*", ticket: "Custom & app dev" },
  unsure: { ticket: "Not sure yet" },
};

function partnerFlow(ctx) {
  const shape = (a) => idOf(a.shape) || ctx.start;
  return [
    {
      id: "intro",
      kind: "passive",
      line: (a) =>
        shape(a) ? { k: "Partnership", v: SHAPES[shape(a)]?.ticket || shape(a), price: "rates set together" } : null,
    },
    nameStep,
    reachStep,
    paceStep("A few answers help Nic come back with real terms. Either way is fine."),
    {
      id: "shape",
      kind: "single",
      when: (a) => !ctx.start || "shape" in a,
      say: (a) => ("shape" in a ? "What kind of help are you after?" : "First up: what kind of help are you after?"),
      options: [
        { id: "per-project", label: "A build, start to finish", sub: "Per project" },
        { id: "retainer", label: "Overflow or a retainer", sub: "Ongoing" },
        { id: "app-dev", label: "A custom app or tricky build", sub: "Custom & app dev" },
        { id: "unsure", label: "Not sure yet", sub: "Nic will suggest one" },
      ],
    },
    {
      id: "org",
      kind: "text",
      optional: true,
      skipLabel: "It's just me",
      say: () => "Great! What's the agency called?",
      placeholder: "Agency name",
      autoComplete: "organization",
      max: 120,
    },
    {
      id: "specialty",
      kind: "single",
      say: (a) => (a.org ? `What's *${a.org}* known for?` : "What's your specialty?"),
      options: [
        { id: "design", label: "Design & branding" },
        { id: "digital", label: "Full-service digital" },
        { id: "marketing", label: "Marketing & SEO" },
        { id: "web", label: "Web design" },
        { id: "freelance", label: "I'm a freelance designer" },
        { id: "other", label: "Something else", other: true, placeholder: "In a few words?" },
      ],
      line: said("Specialty"),
    },
    {
      id: "portfolio",
      kind: "text",
      optional: true,
      say: () => "Where can Nic see your work?",
      placeholder: "youragency.com",
      inputMode: "url",
      max: 200,
      line: (a) => (a.portfolio ? { k: "Portfolio", v: bare(a.portfolio) } : null),
    },
    {
      id: "stack",
      kind: "multi",
      say: () => "What do your clients' sites usually run on?",
      aside: () => "Pick any that apply.",
      options: [
        { id: "wordpress", label: "WordPress" },
        { id: "static", label: "Static or Next.js" },
        { id: "apps", label: "Custom web apps" },
        { id: "depends", label: "Depends on the project", only: true },
      ],
      line: said("Platforms"),
    },
    {
      id: "handoff",
      kind: "single",
      say: () => "How do designs usually arrive?",
      options: [
        { id: "figma", label: "Figma" },
        { id: "xd", label: "Adobe XD" },
        { id: "sketch", label: "Sketch" },
        { id: "flat", label: "PDFs or flat files" },
        { id: "help", label: "We'd want design help too" },
      ],
      line: said("Designs in"),
    },
    {
      id: "volume",
      kind: "single",
      say: () => "How much work are we talking?",
      options: [
        { id: "one", label: "One project for now" },
        { id: "few", label: "1 or 2 builds a month" },
        { id: "lots", label: "3 or more a month" },
        { id: "waves", label: "It comes in waves" },
      ],
      line: said("Volume"),
    },
    {
      id: "on_deck",
      kind: "single",
      say: () => "Is there a project on deck right now?",
      options: [
        { id: "ready", label: "Yes, ready to go" },
        { id: "soon", label: "One's coming up" },
        { id: "bench", label: "No, just lining up help" },
      ],
      line: (a, c) => {
        if (!a.on_deck) return null;
        const v = answerText(c.step, a.on_deck, a, c);
        return { k: "On deck", v: a.deadline ? `${v}, ships ${a.deadline}` : v };
      },
    },
    {
      id: "deadline",
      kind: "text",
      optional: true,
      when: (a) => ["ready", "soon"].includes(idOf(a.on_deck)),
      say: () => "When does it need to ship?",
      placeholder: "e.g. mid-November",
      max: 120,
      // folded into "On deck"
    },
    {
      id: "whitelabel",
      kind: "single",
      say: () => "How should Nic show up to your clients?",
      options: [
        { id: "invisible", label: "Fully invisible" },
        { id: "ours", label: "As our developer" },
        { id: "either", label: "Either is fine" },
      ],
      line: said("Shows up as"),
    },
    notesStep("Process, tools, quirks, anything that helps… or skip it."),
    heardStep,
    reviewStep(),
  ];
}

/* ---------------- care plans for organizations ---------------- */

const PLAN_PLATFORM = {
  id: "platform",
  kind: "single",
  optional: true,
  when: (a) => idOf(a.site) === "yes",
  say: () => "Do you know what it's built with?",
  options: [
    { id: "wordpress", label: "WordPress" },
    { id: "builder", label: "Squarespace or Wix" },
    { id: "other", label: "Something else" },
    { id: "unsure", label: "No idea", ticket: "not sure what it's built with" },
  ],
  // folded into "Current site"
};

function planFlow(ctx) {
  const plan = (a) => idOf(a.plan) || ctx.start;
  const planLine = (id) => {
    if (id === "unsure") return { k: "Plan", v: "Not sure yet", price: "Nic will suggest one" };
    const t = findOffering(id);
    return { k: "Plan", v: t?.name || id, price: priceLabel(t) };
  };
  return [
    {
      id: "intro",
      kind: "passive",
      line: (a) => (plan(a) ? planLine(plan(a)) : null),
    },
    nameStep,
    reachStep,
    paceStep("A few answers help Nic suggest the right plan. Either way is fine."),
    {
      id: "plan",
      kind: "single",
      when: (a) => !ctx.start || "plan" in a,
      say: (a) => ("plan" in a ? "Which sounds closest to what you need?" : "First up: which sounds closest to what you need?"),
      options: () =>
        carePlans
          .map((t) => ({
            id: t.id,
            label: { essentials: "Just keep our site safe & updated", steady: "Some edits & updates now and then", "part-time": "Lots of changes, new pages & features" }[t.id] || t.name,
            sub: `${t.name} · ${priceLabel(t)}`,
          }))
          .concat({ id: "unsure", label: "Not sure yet", sub: "Nic will suggest one" }),
    },
    {
      id: "org",
      kind: "text",
      say: () => "Great! What's the organization called?",
      placeholder: "Organization name",
      autoComplete: "organization",
      max: 120,
    },
    {
      id: "kind",
      kind: "single",
      say: (a) => (a.org ? `And what kind of organization is *${a.org}*?` : "And what kind of organization is it?"),
      options: ORG_KINDS,
      line: said("Organization"),
    },
    {
      id: "site",
      kind: "single",
      say: () => "Do you have a website now?",
      options: [
        { id: "yes", label: "Yes, we do" },
        { id: "no", label: "Not yet" },
      ],
      line: (a) => {
        const s = idOf(a.site);
        if (!s) return null;
        if (s === "no") return { k: "Current site", v: "None yet" };
        const bits = [a.site_url ? bare(a.site_url) : "Yes"];
        if (a.platform) bits.push(answerText(PLAN_PLATFORM, a.platform, a, ctx));
        return { k: "Current site", v: bits.join(" · ") };
      },
    },
    {
      id: "site_url",
      kind: "text",
      optional: true,
      when: (a) => idOf(a.site) === "yes",
      say: () => "What's the address? Nic will take a look.",
      placeholder: "yourorganization.org",
      inputMode: "url",
      max: 200,
    },
    PLAN_PLATFORM,
    {
      id: "caretaker",
      kind: "single",
      optional: true,
      when: (a) => idOf(a.site) === "yes",
      say: () => "Who looks after it today?",
      options: [
        { id: "volunteer", label: "A volunteer" },
        { id: "staff", label: "Someone on staff" },
        { id: "outside", label: "An outside agency or freelancer" },
        { id: "nobody", label: "Honestly, nobody" },
      ],
      line: said("Looked after by"),
    },
    {
      id: "needs",
      kind: "multi",
      say: () => "What does the site need most?",
      aside: () => "Pick as many as you like.",
      options: (a) => [
        { id: "safe", label: "Kept updated & secure" },
        { id: "edits", label: "Regular content edits" },
        { id: "events", label: "Event pages" },
        { id: "forms", label: "Forms & sign-ups" },
        { id: "donations", label: "Donations" },
        { id: "campaigns", label: "Pages for campaigns" },
        idOf(a.site) === "no" ? { id: "newsite", label: "A brand-new site" } : { id: "redesign", label: "A redesign" },
        { id: "other", label: "Something else", other: true, placeholder: "What else?" },
      ],
      line: said("Needs"),
    },
    {
      id: "hours",
      kind: "single",
      say: () => "How much web work comes up in a typical month?",
      options: [
        { id: "none", label: "None, just keep it running" },
        { id: "little", label: "A little, the odd edit or fix" },
        { id: "some", label: "Some, regular updates and new pages" },
        { id: "lots", label: "A lot, there's always something" },
        { id: "unsure", label: "Hard to say" },
      ],
      line: said("Monthly work"),
    },
    {
      id: "decider",
      kind: "single",
      optional: true,
      say: () => "Who decides on something like this?",
      options: [
        { id: "me", label: "Me" },
        { id: "director", label: "Our director" },
        { id: "board", label: "A board or committee" },
      ],
      line: said("Decided by"),
    },
    {
      id: "timeline",
      kind: "single",
      say: () => "When would you like help to start?",
      options: [
        { id: "asap", label: "As soon as possible" },
        { id: "month", label: "Within a month" },
        { id: "later", label: "Later this year" },
        { id: "exploring", label: "Just exploring for now" },
      ],
      line: said("Start"),
    },
    {
      id: "budget",
      kind: "single",
      optional: true,
      say: () => "Do you have a monthly budget in mind?",
      aside: () => "This just helps Nic suggest the right plan. You'll always see a flat monthly price first.",
      options: [
        { id: "low", label: "Under $100 a month" },
        { id: "mid", label: "$100 to $300" },
        { id: "high", label: "$300 to $600" },
        { id: "more", label: "More than that" },
        { id: "check", label: "We'd need to check" },
      ],
      line: said("Budget"),
    },
    notesStep("Deadlines, worries, what's broken… or skip it."),
    heardStep,
    reviewStep(),
  ];
}

/* ---------------- Anty's hello ---------------- */

const HELLO = "Hey! I'm Anty, Nic's helper.";

/** What Anty says before the first question, and the small print under it. */
function greetingFor(ctx) {
  const t = ctx.offering;
  if (ctx.group === "partner") {
    return {
      say: HELLO,
      aside: t
        ? `Interested in ${SHAPES[t.id].say}? Great. I'll write it all up for Nic, and nothing's agreed here.`
        : "I'll write up how your agency works for Nic, and nothing's agreed here.",
    };
  }
  if (ctx.group === "plan") {
    return {
      say: HELLO,
      aside: t
        ? `Thinking about the *${t.name}* plan? Great. I'll write it all up for Nic, and nothing's signed up here.`
        : "I'll write it all up for Nic, and nothing's signed up here.",
      unsure: t ? { key: "plan", label: "I'm not sure which plan fits" } : null,
    };
  }
  const hook = { static: "A *static site*? Nice and speedy.", wordpress: "A *WordPress build*? Lovely.", custom: "Something *custom*? Ooh." }[
    t?.id
  ];
  return {
    say: HELLO,
    aside: `${hook ? `${hook} ` : ""}I'll write it all up for Nic, and nothing's bought here.`,
    unsure: t ? { key: "track", label: "I'm not sure what I need" } : null,
  };
}

/* ---------------- progress and what comes after ---------------- */

// Progress is shown in four fixed parts, so branching questions never stretch
// a total the visitor has already seen.
const STAGES = {
  build: {
    labels: ["About you", "The site", "The details", "Wrap-up"],
    of: {
      name: 0, reach: 0, pace: 0, track: 0, org: 0, kind: 0, where: 0,
      site: 1, site_url: 1, site_issues: 1, social_url: 1, goals: 1, pages: 1, features: 1, custom_what: 1, custom_parts: 1,
      content: 2, editor: 2, timeline: 2, budget: 2,
      notes: 3, heard: 3, review: 3,
    },
  },
  partner: {
    labels: ["About you", "The work", "Timing", "Wrap-up"],
    of: {
      name: 0, reach: 0, pace: 0, shape: 0, org: 0, specialty: 0, portfolio: 0,
      stack: 1, handoff: 1, volume: 1,
      on_deck: 2, deadline: 2, whitelabel: 2,
      notes: 3, heard: 3, review: 3,
    },
  },
  plan: {
    labels: ["About you", "Your site", "The help", "Wrap-up"],
    of: {
      name: 0, reach: 0, pace: 0, plan: 0, org: 0, kind: 0,
      site: 1, site_url: 1, platform: 1, caretaker: 1, needs: 1,
      hours: 2, decider: 2, timeline: 2, budget: 2,
      notes: 3, heard: 3, review: 3,
    },
  },
};

// Shown under the send button: the promise, in order, in the way they asked to hear back.
const backBy = (a) => ({ email: "emails you", call: "calls you", text: "texts you" })[idOf(a.reach)] || "gets back to you";

const NEXT = {
  build: (a) => [
    "You send it from your email app, and Nic reads it himself.",
    `He ${backBy(a)} with a plan and a flat price, usually within a day.`,
    "You decide. Nothing is bought until you say yes.",
  ],
  partner: (a) => [
    "You send it from your email app, and Nic reads it himself.",
    `He ${backBy(a)} with how he'd work with you and his rates, usually within a day.`,
    "You decide. Nothing is agreed until you say yes.",
  ],
  plan: (a) => [
    "You send it from your email app, and Nic reads it himself.",
    `He ${backBy(a)} with the plan he'd suggest and its flat monthly price, usually within a day.`,
    "You decide. Nothing starts until you say yes.",
  ],
};

/* ---------------- choosing a flow ---------------- */

/**
 * Resolve the flow for an entry. A start id decides it outright (a care plan
 * means an organization, a partnership means an agency); otherwise the page's
 * audience does.
 */
export function flowFor({ start, audience }) {
  const offering = start ? findOffering(start) : null;
  let aud = audience || "business";
  if (offering?.group === "partner") aud = "agency";
  if (offering?.group === "plan") aud = "org";
  const group = offering?.group || (aud === "agency" ? "partner" : aud === "org" ? "plan" : "build");
  const ctx = { audience: aud, start: offering ? start : null, offering, group };
  const steps = group === "partner" ? partnerFlow(ctx) : group === "plan" ? planFlow(ctx) : buildFlow(ctx);
  return { key: `${group}:${aud}`, group, ctx, steps, greeting: greetingFor(ctx), stages: STAGES[group], next: NEXT[group] };
}

/** The steps that apply, given the answers so far (passive ones only write lines). */
export function activeSteps(flow, answers) {
  return flow.steps.filter((s) => !s.when || s.when(answers, flow.ctx));
}

/** The questions Anty actually asks, in order. */
export function askedSteps(flow, answers) {
  return activeSteps(flow, answers).filter((s) => s.kind !== "passive");
}

/** Every ticket line the answers have earned, in script order. */
export function ticketLines(flow, answers) {
  const lines = [];
  for (const step of activeSteps(flow, answers)) {
    if (!step.line) continue;
    const l = step.line(answers, { ...flow.ctx, step });
    if (l && l.v) lines.push({ id: step.id, ...l });
  }
  return lines;
}

/** The answer that holds the tier, plan, or partnership for this flow. */
export function tierKey(flow) {
  return flow.group === "partner" ? "shape" : flow.group === "plan" ? "plan" : "track";
}

/** A short headline for the email subject. */
export function ticketSummary(flow, answers) {
  const id = idOf(answers[tierKey(flow)]) || flow.ctx.start;
  if (flow.group === "partner") return SHAPES[id]?.ticket && id !== "unsure" ? SHAPES[id].ticket : "Agency partnership";
  if (flow.group === "plan") return id && id !== "unsure" ? `${findOffering(id)?.name} plan` : "Care plan";
  return BUILD_NOUN[id] || "New project";
}
