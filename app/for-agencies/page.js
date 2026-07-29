import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";

export const metadata = {
  title: "White-label web development for agencies",
  description:
    "A dependable white-label development partner for agencies. You design it, I build it — pixel-faithful WordPress, static, and custom sites under your brand, on time.",
  alternates: { canonical: "/for-agencies" },
  openGraph: {
    title: "picnicdev — white-label web development for agencies",
    description:
      "You design it, I build it. A reliable, invisible dev partner for agencies — WordPress, static, and custom builds under your brand.",
    url: "https://picnicdev.com/for-agencies",
  },
};

export default function ForAgencies() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Reveal as="h1" delay={60}>
              You design it.
              <br />
              <span className="accent serif-italic">I build it.</span>
            </Reveal>
            <Reveal as="p" className="hero-lead" delay={120}>
              picnicdev is your behind-the-scenes development partner. You bring
              the brand, the strategy, and the design — I turn it into clean,
              on-time, pixel-faithful websites under your name. No hand-offs, no
              drama.
            </Reveal>
            <Reveal className="hero-cta" delay={180}>
              <Link href="/contact" className="btn btn-primary">
                Start a partnership →
              </Link>
              <Link href="#services" className="hero-link">
                or see how it works
              </Link>
            </Reveal>
          </div>

          {/* Poster grid: Nic's intro panel + flat-outline picnic-food tiles */}
          <Reveal className="hero-dev" delay={140}>
            <HeroPanels variant="agency" />
          </Reveal>
        </div>
      </section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <div className="strip">
        <div className="strip-inner">
          <span className="pill">
            <Icon name="puzzle" /> WordPress &amp; custom themes
          </span>
          <span className="pill">
            <Icon name="globe" /> Static &amp; JAMstack
          </span>
          <span className="pill">
            <Icon name="target" /> Pixel-faithful from Figma
          </span>
          <span className="pill">
            <Icon name="rocket" /> CI/CD &amp; Automation
          </span>
        </div>
      </div>

      {/* ---------------- PARTNER PROGRAM (was /services#agency) ---------------- */}
      <section className="section" id="services">
        <div className="wrap">
          <div className="feature-row flip">
            <Reveal className="feature-visual v-honey">
              <span className="emoji" aria-hidden="true"><Icon name="handshake" /></span>
              <div className="gingham strip-b" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Agency Partner Program</span>
              <h2>Your on-call development team.</h2>
              <p className="lead">
                Agencies bring the brand, the strategy, and the design — I turn
                it into clean, well-built, on-time websites under your name.
              </p>
              <ul className="check-list">
                <li>White-label: I stay invisible, you stay the hero</li>
                <li>Faithful builds from Figma, XD, or flat designs</li>
                <li>WordPress, static, or custom — your call</li>
                <li>Staff augmentation for overflow &amp; deadlines</li>
                <li>Clear communication and predictable timelines</li>
              </ul>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: "1.6rem" }}>
                Become a partner →
              </Link>
            </Reveal>
          </div>

          <p className="cross-note">
            <Icon name="storefront" /> Here as a business owner instead?{" "}
            <Link href="/">See direct-client pricing →</Link>
          </p>
        </div>
      </section>

      {/* ---------------- HOW THE PARTNERSHIP WORKS ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">How the partnership works</span>
            <h2>A dev team you don&apos;t have to hire.</h2>
            <p className="lead">
              Plug me in when you need capacity, expertise, or just a reliable
              pair of hands. I work the way your studio already works.
            </p>
          </Reveal>

          <div className="values">
            <Reveal className="value">
              <span className="em" aria-hidden="true"><Icon name="tag" /></span>
              <h3>White-label by default</h3>
              <p>
                I stay invisible. Your client only ever sees your brand — I&apos;m
                just the engine room behind it.
              </p>
            </Reveal>
            <Reveal className="value" delay={80}>
              <span className="em" aria-hidden="true"><Icon name="waves" /></span>
              <h3>Overflow &amp; staff aug</h3>
              <p>
                Extra hands when your pipeline spikes or a deadline looms — without
                the cost and commitment of a full-time hire.
              </p>
            </Reveal>
            <Reveal className="value" delay={160}>
              <span className="em" aria-hidden="true"><Icon name="target" /></span>
              <h3>Faithful builds</h3>
              <p>
                From Figma, XD, or flat files to clean, semantic, on-brand code —
                exactly the way you designed it.
              </p>
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
              <h2>One senior dev, on your team.</h2>
              <p className="lead">
                You get a single, experienced developer who communicates like a
                colleague and treats your deadlines as sacred. Here&apos;s what
                working together looks like.
              </p>
              <ul className="promise-list">
                <li>
                  I hit deadlines
                  <span>Predictable timelines and clear comms, every build.</span>
                </li>
                <li>
                  You own the client
                  <span>I stay white-label and invisible — you&apos;re the hero.</span>
                </li>
                <li>
                  Clean, maintainable code
                  <span>Semantic, documented, easy for your team to pick up.</span>
                </li>
                <li>
                  Real capacity
                  <span>Overflow help exactly when your pipeline spikes.</span>
                </li>
              </ul>
              <p className="promise-sign">— Nic</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- WAYS I PLUG IN ---------------- */}
      <section className="section" id="pricing" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">Three ways to work together</span>
            <h2>However you need me</h2>
            <p className="lead">
              Project rates and partnership terms are set together, based on scope
              and how often you need me. No mystery — you&apos;ll always see the
              number up front.
            </p>
          </Reveal>

          <div className="tiers">
            <Reveal className="tier">
              <span className="kicker">The à la carte</span>
              <span className="name">Per-project builds</span>
              <p className="desc" style={{ marginTop: "0.9rem" }}>
                You send designs, I return a built, tested, on-brand site. Scoped
                and priced per project.
              </p>
              <ul>
                <li>WordPress, static, or custom</li>
                <li>Pixel-faithful to your design</li>
                <li>Delivered ready for your client</li>
              </ul>
              <div className="tier-cta">
                <Link href="/contact?tier=Agency partner" className="btn btn-ghost">
                  Discuss a build
                </Link>
              </div>
            </Reveal>

            <Reveal className="tier featured" delay={90}>
              <span className="badge">Most partners pick this</span>
              <span className="kicker">The standing table</span>
              <span className="name">Overflow &amp; retainer</span>
              <p className="desc" style={{ marginTop: "0.9rem" }}>
                Reserve ongoing development capacity for busy months and tight
                deadlines — a dependable extra seat on your team.
              </p>
              <ul>
                <li>Priority turnaround</li>
                <li>Set hours or builds per month</li>
                <li>One familiar developer</li>
              </ul>
              <div className="tier-cta">
                <Link href="/contact?tier=Agency partner" className="btn btn-primary">
                  Talk terms
                </Link>
              </div>
            </Reveal>

            <Reveal className="tier" delay={180}>
              <span className="kicker">The whole feast</span>
              <span className="name">Custom &amp; app dev</span>
              <p className="desc" style={{ marginTop: "0.9rem" }}>
                Complex builds and web applications — deployed on fly.io with CI/CD
                and everything wired up properly.
              </p>
              <ul>
                <li>Bespoke features &amp; apps</li>
                <li>fly.io deploys + CI/CD</li>
                <li>Staging &amp; production</li>
              </ul>
              <div className="tier-cta">
                <Link href="/contact?tier=Agency partner" className="btn btn-ghost">
                  Scope a project
                </Link>
              </div>
            </Reveal>
          </div>

          <p className="price-foot">
            Not sure which fits your agency?{" "}
            <Link href="/contact" style={{ color: "var(--tomato-deep)", fontWeight: 800 }}>
              Tell me about your pipeline →
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">How we work together</span>
            <h2>Smooth from kickoff to handoff</h2>
          </Reveal>
          <div className="steps">
            {[
              { n: "1", h: "Kickoff", p: "You share designs, scope, and deadlines. I confirm a plan and a price." },
              { n: "2", h: "Build", p: "I develop it clean and faithful, showing progress as I go." },
              { n: "3", h: "Review", p: "You review it under your brand. I revise fast, no ego." },
              { n: "4", h: "Handoff", p: "Delivered on time, documented, and ready for your client." },
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
            <h2>Need a builder you can count on?</h2>
            <p>
              Send over a design or tell me about your pipeline, and let&apos;s
              talk about a partnership that makes your deadlines easier.
            </p>
            <Link href="/contact" className="btn btn-honey">
              Start a partnership <Icon name="handshake" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
