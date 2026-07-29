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
              <Link href="/pricing" className="btn btn-primary">
                See pricing →
              </Link>
              <Link href="/services" className="hero-link">
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

      {/* ---------------- TWO PILLARS (small business FIRST) ---------------- */}
      <section className="section">
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Two ways to work together</span>
            <h2>
              Most folks want a website.
              <br className="hide-mobile" /> Some agencies want a builder.
            </h2>
          </Reveal>

          <div className="pillars">
            <Reveal className="pillar pillar-a">
              <div className="ic" aria-hidden="true">
                <Icon name="restaurant" />
              </div>
              <h3>Full-Service Web Development</h3>
              <p className="lead" style={{ fontSize: "1.05rem" }}>
                Working with a business directly? I take the whole thing off your
                plate — design, build, launch, and the friendly support after.
                Three clear tiers so you only pay for what you need.
              </p>
              <ul>
                <li>Cheap, fast static sites with free hosting</li>
                <li>WordPress when you want to edit content yourself</li>
                <li>Custom apps with fly.io &amp; CI/CD</li>
                <li>One person — me — from first email to launch</li>
              </ul>
              <Link href="/services#full-service" className="more">
                See full-service work <span>→</span>
              </Link>
            </Reveal>

            <Reveal className="pillar pillar-b" delay={100}>
              <div className="ic" aria-hidden="true">
                <Icon name="handshake" />
              </div>
              <h3>Agency Partner Program</h3>
              <p className="lead" style={{ fontSize: "1.05rem" }}>
                Run an agency? You design it, I build it. A dependable,
                white-label development partner for teams who need clean, on-time
                work without hiring in-house.
              </p>
              <ul>
                <li>Pixel-faithful builds from your designs</li>
                <li>Works quietly behind your brand</li>
                <li>WordPress, static, or custom stacks</li>
                <li>Overflow help when your team is slammed</li>
              </ul>
              <Link href="/services#agency" className="more">
                Explore the partner program <span>→</span>
              </Link>
            </Reveal>
          </div>
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

      {/* ---------------- PRICING PREVIEW ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Three baskets to choose from</span>
            <h2>Straightforward pricing</h2>
            <p className="lead">
              No mystery quotes for the small stuff. Pick the size that fits, and
              your only recurring cost is usually just the domain.
            </p>
          </Reveal>

          <div className="tiers">
            <Reveal className="tier">
              <span className="kicker">The Picnic Basket</span>
              <span className="name">Static</span>
              <div className="price">
                <span className="from">from</span>
                <span className="amt">$500</span>
              </div>
              <p className="desc">
                A fast, modern, hand-built site. Perfect for a small business that
                needs to look sharp and load instantly.
              </p>
              <ul>
                <li>Custom, mobile-friendly design</li>
                <li>Up to ~5 pages</li>
                <li className="muted">No CMS editing</li>
              </ul>
              <div className="tier-cta">
                <Link href="/pricing#static" className="btn btn-ghost">
                  Details
                </Link>
              </div>
              <p className="host-note">
                <Icon name="leaf" /> Free hosting · you pay only for a domain
              </p>
            </Reveal>

            <Reveal className="tier featured" delay={90}>
              <span className="badge">Best for most</span>
              <span className="kicker">The Spread</span>
              <span className="name">WordPress</span>
              <div className="price">
                <span className="from">from</span>
                <span className="amt">$1,500</span>
              </div>
              <p className="desc">
                Everything in Static, plus a WordPress CMS so you can edit pages,
                post updates, and grow on your own.
              </p>
              <ul>
                <li>Editable content &amp; blog</li>
                <li>Custom WordPress theme</li>
                <li>Plugins &amp; integrations</li>
              </ul>
              <div className="tier-cta">
                <Link href="/pricing#wordpress" className="btn btn-primary">
                  Details
                </Link>
              </div>
              <p className="host-note">Managed hosting options available</p>
            </Reveal>

            <Reveal className="tier" delay={180}>
              <span className="kicker">The Whole Feast</span>
              <span className="name">Custom</span>
              <div className="price">
                <span className="amt quote">Let&apos;s talk</span>
              </div>
              <p className="desc">
                Custom WordPress or a standalone application — deployed on fly.io
                with CI/CD and everything wired up properly.
              </p>
              <ul>
                <li>Bespoke features &amp; apps</li>
                <li>fly.io deploys + CI/CD</li>
                <li>Ongoing support</li>
              </ul>
              <div className="tier-cta">
                <Link href="/pricing#custom" className="btn btn-ghost">
                  Details
                </Link>
              </div>
              <p className="host-note">Scoped &amp; quoted to fit your project</p>
            </Reveal>
          </div>

          <p className="price-foot">
            Not sure which fits?{" "}
            <Link href="/contact" style={{ color: "var(--tomato-deep)", fontWeight: 800 }}>
              Tell me about your project →
            </Link>
          </p>
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

      {/* ---------------- CTA ---------------- */}
      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Let&apos;s spread out a plan.</h2>
            <p>
              Small site, big app, or a steady hand for your agency — tell me
              what you&apos;re building and I&apos;ll help you get there.
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
