import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";

export const metadata = {
  title: { absolute: "picnicdev — affordable websites for small businesses" },
  description:
    "Fast, affordable websites for small businesses, built by one experienced developer. Static sites from $500 with free hosting, plus WordPress and custom development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "picnicdev — affordable websites for small businesses",
    description:
      "Static sites from $500 with free hosting, plus WordPress and custom development. You work directly with one developer, start to finish.",
    url: "https://picnicdev.com/",
  },
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

const faqs = [
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
];

export default function Home() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Reveal as="h1" delay={60}>
              Great websites,
              <br />
              <span className="accent serif-italic">without the fuss.</span>
            </Reveal>
            <Reveal as="p" className="hero-lead" delay={120}>
              picnicdev is just me — Nic. I build fast, affordable websites for
              small businesses, and I&apos;m the one you talk to from first hello
              to launch day. No account managers, no outsourcing, no runaround.
            </Reveal>
            <Reveal className="hero-cta" delay={180}>
              <Link href="#pricing" className="btn btn-primary">
                See pricing →
              </Link>
              <Link href="#services" className="hero-link">
                or see how it works
              </Link>
            </Reveal>
          </div>

          {/* Poster grid: Nic's intro panel + flat-outline picnic-food tiles */}
          <Reveal className="hero-dev" delay={140}>
            <HeroPanels variant="business" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- CAPABILITIES (honestly labeled) ---------------- */}
      <div className="strip">
        <div className="strip-inner">
          <span className="pill">
            <Icon name="globe" /> Static Sites
          </span>
          <span className="pill">
            <Icon name="storefront" /> WordPress Sites
          </span>
          <span className="pill">
            <Icon name="chefhat" /> Custom web apps
          </span>
          <span className="pill">
            <Icon name="rocket" /> CI/CD &amp; Automation
          </span>
          <span className="pill">
            <Icon name="handshake" /> Staff Augmentation
          </span>
        </div>
      </div>

      {/* ---------------- FULL-SERVICE (was /services#full-service) ---------------- */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="feature-row">
            <Reveal className="feature-visual v-sage">
              <span className="emoji" aria-hidden="true"><Icon name="restaurant" /></span>
              <div className="gingham strip-b" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Full-Service Development</span>
              <h2>Your whole website, handled.</h2>
              <p className="lead">
                I take the entire thing off your plate — design, build, launch,
                and the friendly support after. Three clear tiers so you only pay
                for what you need.
              </p>
              <ul className="check-list">
                <li>
                  <strong>Static</strong> — from $500, free hosting, lightning fast
                </li>
                <li>
                  <strong>WordPress</strong> — from $1,500, edit your own content
                </li>
                <li>
                  <strong>Custom</strong> — apps, integrations, fly.io &amp; CI/CD
                </li>
                <li>One point of contact from first email to launch day</li>
              </ul>
              <Link href="#pricing" className="btn btn-primary" style={{ marginTop: "1.6rem" }}>
                See the three tiers →
              </Link>
            </Reveal>
          </div>

          <p className="cross-note">
            <Icon name="handshake" /> Running an agency and looking for a
            white-label builder?{" "}
            <Link href="/for-agencies">See the partner program →</Link>
          </p>
        </div>
      </section>

      {/* ---------------- MEET NIC — honest promise (proof substitute) ---------------- */}
      <section className="section promise-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="promise-grid">
            <Reveal className="promise-photo">
              <div className="photo-frame">
                <img src="/nic.jpg" alt="Nic Ford, founder of picnicdev" width="800" height="800" />
                <div className="gingham" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal className="promise-copy" delay={80}>
              <span className="eyebrow">Meet your developer</span>
              <h2>No big agency. Just me, and a promise.</h2>
              <p className="lead">
                picnicdev is new, so I won&apos;t pretend to show you a wall of
                logos I don&apos;t have yet. Instead, here&apos;s what you can
                count on when you hire me — in plain writing.
              </p>
              <ul className="promise-list">
                <li>
                  One flat price, up front
                  <span>Agreed before I start. No surprise invoices, ever.</span>
                </li>
                <li>
                  You talk to me directly
                  <span>The person quoting your site is the one building it.</span>
                </li>
                <li>
                  Free hosting on static sites
                  <span>Your only recurring cost is usually just a domain.</span>
                </li>
                <li>
                  You own everything
                  <span>The code, the content, the accounts — all yours.</span>
                </li>
              </ul>
              <p className="promise-sign">— Nic</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- PRICING (was /pricing) ---------------- */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Three baskets, one honest price</span>
            <h2>
              Pricing that <span className="serif-italic">makes sense.</span>
            </h2>
            <p className="lead">
              Flat pricing for the common stuff, a real conversation for the
              custom stuff. Free hosting on static sites means your recurring
              costs stay close to zero.
            </p>
          </Reveal>

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

      {/* ---------------- WHAT'S ALWAYS INCLUDED (was /pricing) ---------------- */}
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

      {/* ---------------- PROCESS ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">How a project goes</span>
            <h2>Easy from hello to launch</h2>
          </Reveal>
          <div className="steps">
            {[
              { n: "1", h: "Say hi", p: "Tell me what you need. I'll reply with a plan and a flat, honest price." },
              { n: "2", h: "Design", p: "We nail down look and content. No surprises, no jargon." },
              { n: "3", h: "Build", p: "I develop it fast and show you progress along the way." },
              { n: "4", h: "Launch", p: "We go live, and I'm here for tweaks and questions after." },
            ].map((s, i) => (
              <Reveal className="step" key={s.n} delay={i * 80}>
                <div className="n">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ (was /pricing) ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Good questions</span>
            <h2>Before you ask</h2>
          </Reveal>
          <div className="faq">
            {faqs.map((f) => (
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

      {/* ---------------- UNDER THE HOOD (was /services) ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Under the hood</span>
            <h2>The kit I cook with</h2>
            <p className="lead">
              Modern where it matters, boring where it should be. The right tool
              for the job — not whatever&apos;s trendy this week.
            </p>
          </Reveal>
          <div className="values">
            <Reveal className="value">
              <span className="em" aria-hidden="true"><Icon name="globe" /></span>
              <h3>Static &amp; JAMstack</h3>
              <p>
                Hand-built HTML/CSS and modern frameworks like Next.js. Fast,
                secure, and cheap (or free) to host.
              </p>
            </Reveal>
            <Reveal className="value" delay={80}>
              <span className="em" aria-hidden="true"><Icon name="puzzle" /></span>
              <h3>WordPress</h3>
              <p>
                Years of WordPress builds — custom themes, plugins, and
                editor-friendly setups your team can actually use.
              </p>
            </Reveal>
            <Reveal className="value" delay={160}>
              <span className="em" aria-hidden="true"><Icon name="rocket" /></span>
              <h3>Apps &amp; DevOps</h3>
              <p>
                Standalone application development with fly.io deployments, CI/CD
                pipelines, and everything wired up to ship safely.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Let&apos;s spread out a plan.</h2>
            <p>
              Tell me what you&apos;re building — a small site, a shop, or
              something custom — and I&apos;ll help you get there.
            </p>
            <Link href="/contact" className="btn btn-honey">
              Start a project <Icon name="basket" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
