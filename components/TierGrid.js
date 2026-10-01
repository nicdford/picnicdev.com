import Link from "next/link";
import Reveal from "./Reveal";
import Icon from "./Icon";

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
    variant: "",
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
    muted: [],
    cta: "Start a WordPress build",
    variant: "featured",
  },
  {
    id: "custom",
    kicker: "The Whole Feast",
    name: "Custom",
    from: "",
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
    muted: [],
    cta: "Scope a custom project",
    variant: "",
  },
];

/**
 * Row of pricing cards. Each tier may set `per` (e.g. "/mo") after the price,
 * and `contactTier` to control which option the contact form pre-selects
 * (defaults to the tier's name).
 */
export default function TierGrid({ tiers }) {
  return (
    <div className="tiers">
      {tiers.map((t, i) => (
        <Reveal
          className={`tier ${t.variant}`}
          key={t.id}
          id={t.id}
          delay={i * 90}
        >
          {t.badge && <span className="badge">{t.badge}</span>}
          <span className="kicker">{t.kicker}</span>
          <span className="name">{t.name}</span>
          <div className="price">
            {t.from && <span className="from">{t.from}</span>}
            <span className={`amt ${t.quote ? "quote" : ""}`}>{t.price}</span>
            {t.per && <span className="from">{t.per}</span>}
          </div>
          <p className="desc">{t.desc}</p>
          <ul>
            {t.features.map((f) =>
              typeof f === "string" ? (
                <li key={f}>{f}</li>
              ) : (
                <li key={f.label}>
                  <Icon name={f.icon} /> {f.label}
                </li>
              )
            )}
            {t.muted.map((f) => (
              <li className="muted" key={f}>
                {f}
              </li>
            ))}
          </ul>
          <div className="tier-cta">
            <Link
              href={`/contact?tier=${encodeURIComponent(t.contactTier || t.name)}`}
              className={`btn ${t.variant === "featured" ? "btn-primary" : "btn-ghost"}`}
            >
              {t.cta}
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
