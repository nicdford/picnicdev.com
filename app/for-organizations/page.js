import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";
import TierGrid, { buildTiers } from "@/components/TierGrid";

export const metadata = {
  title: "Websites & care plans for nonprofits and local organizations",
  description:
    "A part-time developer for nonprofits and local organizations. Monthly care plans with hosting, maintenance, and a few hours of real development time — no full-time hire needed.",
  alternates: { canonical: "/for-organizations" },
  openGraph: {
    title: "picnicdev — websites & care plans for nonprofits and local organizations",
    description:
      "Hosting, maintenance, and a few developer hours a month, for one flat monthly price. You work directly with one experienced developer.",
    url: "https://picnicdev.com/for-organizations",
  },
};

// Monthly all-inclusive plans. PLACEHOLDER prices and hours — set real numbers
// before launch.
const carePlans = [
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
    muted: [],
    cta: "Start Essentials",
    contactTier: "Care plan: Essentials",
    variant: "",
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
    muted: [],
    cta: "Start Steady",
    contactTier: "Care plan: Steady",
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
    muted: [],
    cta: "Start Part-time dev",
    contactTier: "Care plan: Part-time dev",
    variant: "",
  },
];

const faqs = [
  {
    q: "What counts toward my monthly hours?",
    a: "Anything that needs a developer: content updates, new pages, forms, small features, fixes, and troubleshooting. Hosting, updates, backups, and monitoring are part of every plan and never come out of your hours.",
  },
  {
    q: "What if we need more time one month?",
    a: "Tell me what's coming up and I'll quote the extra time before I start. You'll never get a bill you didn't agree to first.",
  },
  {
    q: "Can we start with a new site and then move onto a plan?",
    a: "Yes, and that's the most common path. I build the site from one of the build tiers, launch it, and a care plan keeps it running and improving after.",
  },
  {
    q: "We already have a website. Can you look after it?",
    a: "Usually, yes. I'll take a look first to make sure it's in a state I can host and maintain responsibly, and tell you plainly if anything needs fixing before we start.",
  },
  {
    q: "Why not just hire someone?",
    a: "If you have 40 hours of web work every week, you should. Most organizations have a few hours a month, which isn't enough for a hire but is too much to keep asking a volunteer. A care plan fills that gap.",
  },
];

export default function ForOrganizations() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Reveal as="h1" delay={60}>
              Your developer,
              <br />
              <span className="accent serif-italic">without the payroll.</span>
            </Reveal>
            <Reveal as="p" className="hero-lead" delay={120}>
              picnicdev is just me — Nic. I build and look after websites for
              nonprofits and local organizations. Hosting, updates, and a few hours
              of real developer time each month, for one flat monthly price.
            </Reveal>
            <Reveal className="hero-cta" delay={180}>
              <Link href="#plans" className="btn btn-primary">
                See care plans →
              </Link>
              <Link href="#pricing" className="hero-link">
                or see build pricing
              </Link>
            </Reveal>
          </div>

          <Reveal className="hero-dev" delay={140}>
            <HeroPanels variant="org" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <div className="strip">
        <div className="strip-inner">
          <span className="pill">
            <Icon name="leaf" /> Hosting included
          </span>
          <span className="pill">
            <Icon name="bolt" /> Updates &amp; backups
          </span>
          <span className="pill">
            <Icon name="clock" /> Monthly dev hours
          </span>
          <span className="pill">
            <Icon name="storefront" /> WordPress Sites
          </span>
          <span className="pill">
            <Icon name="globe" /> Static Sites
          </span>
        </div>
      </div>

      {/* ---------------- WHY A CARE PLAN ---------------- */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="feature-row">
            <Reveal className="feature-visual v-sage">
              <span className="emoji" aria-hidden="true"><Icon name="hand" /></span>
              <div className="gingham strip-b" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Monthly Care Plans</span>
              <h2>The developer you don&apos;t need full-time.</h2>
              <p className="lead">
                Your website still needs someone who knows how it works: to keep
                it updated, add the event page, fix the broken form. A care plan
                gives you that person for a few hours a month, with hosting and
                maintenance already covered.
              </p>
              <ul className="check-list">
                <li>
                  <strong>Hosting &amp; maintenance</strong> — updates, backups,
                  and monitoring, all included
                </li>
                <li>
                  <strong>Developer hours</strong> — a set block of real dev time
                  every month
                </li>
                <li>
                  <strong>One flat price</strong> — the same bill every month
                </li>
                <li>One point of contact who already knows your site</li>
              </ul>
              <Link href="#plans" className="btn btn-primary" style={{ marginTop: "1.6rem" }}>
                See the three plans →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- MEET NIC ---------------- */}
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
              <h2>One developer who knows your site.</h2>
              <p className="lead">
                Staff and volunteers change. Your website shouldn&apos;t have to
                be re-explained every time they do. Here&apos;s what you can count
                on.
              </p>
              <ul className="promise-list">
                <li>
                  One flat monthly price
                  <span>Hosting, maintenance, and your hours in a single bill.</span>
                </li>
                <li>
                  You talk to me directly
                  <span>No ticket queue. The person answering is the one doing the work.</span>
                </li>
                <li>
                  Plain-language updates
                  <span>You&apos;ll know what I did and why, without the jargon.</span>
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

      {/* ---------------- CARE PLANS ---------------- */}
      <section className="section" id="plans" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Monthly care plans</span>
            <h2>
              Hosting, upkeep, <span className="serif-italic">and a developer.</span>
            </h2>
            <p className="lead">
              Pick the amount of developer time that fits your year. Hosting,
              updates, backups, and monitoring are included in every plan.
            </p>
          </Reveal>

          <TierGrid tiers={carePlans} />

          <p className="price-foot">
            Need a new site first? Start with a build below, then move onto a plan
            once it&apos;s live.
          </p>
        </div>
      </section>

      {/* ---------------- BUILD PRICING ---------------- */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Need a new site?</span>
            <h2>
              Build pricing that <span className="serif-italic">makes sense.</span>
            </h2>
            <p className="lead">
              A flat, up-front price to build or rebuild your site. Pair it with a
              care plan and it stays in good shape after launch.
            </p>
          </Reveal>

          <TierGrid tiers={buildTiers} />

          <p className="price-foot">
            Prices are starting points — final quotes depend on scope, but
            I&apos;ll always tell you the number up front. No surprise invoices,
            ever.
          </p>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">How a plan works</span>
            <h2>Easy from hello to every month after</h2>
          </Reveal>
          <div className="steps">
            {[
              { n: "1", h: "Say hi", p: "Tell me about your organization and your site. I'll recommend a plan that fits." },
              { n: "2", h: "Settle in", p: "I move your site onto managed hosting and give it a full once-over." },
              { n: "3", h: "Ask away", p: "Email me what you need. I handle it from your monthly hours." },
              { n: "4", h: "Stay in the loop", p: "Each month you see where your hours went and what's coming next." },
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

      {/* ---------------- FAQ ---------------- */}
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

      {/* ---------------- CTA ---------------- */}
      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Let&apos;s keep your site in good hands.</h2>
            <p>
              Tell me about your organization and what your website needs, and
              I&apos;ll suggest the plan that fits.
            </p>
            <Link href="/contact" className="btn btn-honey">
              Find my plan <Icon name="basket" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
