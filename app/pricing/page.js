import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing: static sites from $500 with free hosting, WordPress builds from $1,500, and custom application development quoted to fit — deployed on fly.io with CI/CD.",
};

const tiers = [
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

export default function Pricing() {
  return (
    <>
      <section className="page-head">
        <div className="wrap center">
          <Reveal className="eyebrow" as="span" style={{ justifyContent: "center" }}>
            Three baskets, one honest price
          </Reveal>
          <Reveal as="h1" delay={60}>
            Pricing that <span className="serif-italic">makes sense.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            Flat pricing for the common stuff, a real conversation for the custom
            stuff. Free hosting on static sites means your recurring costs stay
            close to zero.
          </Reveal>
          <div data-aud="agency">
            <Reveal
              as="p"
              className="lead"
              delay={160}
              style={{ marginTop: "1rem", fontWeight: 700 }}
            >
              Running an agency? These are my direct-client rates. For white-label
              build rates and retainers,{" "}
              <Link
                href="/for-agencies"
                style={{ color: "var(--tomato-deep)", fontWeight: 800 }}
              >
                see the partnership options →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="tiers">
            {tiers.map((t, i) => (
              <Reveal
                className={`tier ${t.variant}`}
                key={t.id}
                id={t.id}
                delay={i * 90}
                style={{ scrollMarginTop: "90px" }}
              >
                {t.badge && <span className="badge">{t.badge}</span>}
                <span className="kicker">{t.kicker}</span>
                <span className="name">{t.name}</span>
                <div className="price">
                  {t.from && <span className="from">{t.from}</span>}
                  <span className={`amt ${t.quote ? "quote" : ""}`}>{t.price}</span>
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
                    href={`/contact?tier=${t.name}`}
                    className={`btn ${t.variant === "featured" ? "btn-primary" : "btn-ghost"}`}
                  >
                    {t.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="price-foot">
            Prices are starting points — final quotes depend on scope, but
            I&apos;ll always tell you the number up front. No surprise invoices,
            ever.
          </p>
        </div>
      </section>

      {/* What's always included */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Every basket includes</span>
            <h2>The good stuff, standard</h2>
          </Reveal>
          <div className="values">
            <Reveal className="value">
              <span className="em" aria-hidden="true"><Icon name="phone" /></span>
              <h3>Mobile-first</h3>
              <p>Every build looks great on phones, tablets, and desktops.</p>
            </Reveal>
            <Reveal className="value" delay={70}>
              <span className="em" aria-hidden="true"><Icon name="search" /></span>
              <h3>SEO basics</h3>
              <p>Clean markup, metadata, and fast loads so you can be found.</p>
            </Reveal>
            <Reveal className="value" delay={140}>
              <span className="em" aria-hidden="true"><Icon name="chat" /></span>
              <h3>A real human</h3>
              <p>You email me, I answer. No ticket queues, no runaround.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Good questions</span>
            <h2>Before you ask</h2>
          </Reveal>
          <div className="faq">
            {[
              {
                q: "How is hosting really free?",
                a: "Static sites are just files, so I can host them on modern static platforms with generous free tiers. For most small business sites that means $0/month — you just keep your domain registered (usually around $15/year).",
              },
              {
                q: "What's the difference between Static and WordPress?",
                a: "A static site is hand-built and super fast, but you can't log in and edit it yourself — you send me changes. WordPress adds a content editor so you can update pages and write posts on your own. If you'll change content often, WordPress is worth the jump.",
              },
              {
                q: "When would I need the Custom tier?",
                a: "When you need real functionality: a web app, user accounts, custom integrations, dashboards, or anything beyond a standard site. These run on fly.io with CI/CD so deploys are safe and repeatable. We scope and quote it together.",
              },
              {
                q: "Do you work with other agencies?",
                a: "Yes — that's the Agency Partner Program. You handle design and client relationships; I handle development under your brand. Great for overflow work or when you don't have an in-house dev.",
              },
              {
                q: "What are the ongoing costs?",
                a: "For a static site, usually just your domain. WordPress needs hosting (I can manage it or you can). Custom apps have hosting costs based on usage. I'll spell out any recurring costs before we start.",
              },
            ].map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="chev" aria-hidden="true">+</span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Ready when you are.</h2>
            <p>Tell me which basket looks right and a bit about your project.</p>
            <Link href="/contact" className="btn btn-honey">
              Start a project <Icon name="basket" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
