import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Services",
  description:
    "Two ways to work with picnicdev: a white-label agency partner program, and full-service website development for small businesses — static, WordPress, and custom app development.",
};

export default function Services() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal className="eyebrow" as="span">What I do</Reveal>
          <Reveal as="h1" delay={60}>
            Two services,
            <span className="serif-italic accent-text"> one reliable partner.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            Whether you&apos;re a business that needs a whole website or an agency
            that needs a dependable builder, picnicdev keeps it friendly, fast,
            and fairly priced.
          </Reveal>
        </div>
      </section>

      {/* Offerings reorder to lead with the visitor's chosen audience selection */}
      <div className="svc-offerings">
      {/* ---------- FULL SERVICE (small business first) ---------- */}
      <section className="section" id="full-service" style={{ paddingTop: "1.5rem" }}>
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
                Working with a business directly? I take the entire thing off your
                plate — design, build, launch, and the friendly support after.
                Pick from three clear tiers.
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
              <Link href="/pricing" className="btn btn-primary" style={{ marginTop: "1.6rem" }}>
                See the three tiers →
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- AGENCY PARTNER ---------- */}
      <section className="section" id="agency" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feature-row flip">
            <Reveal className="feature-visual v-honey">
              <span className="emoji" aria-hidden="true"><Icon name="handshake" /></span>
              <div className="gingham strip-b" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow">Agency Partner Program</span>
              <h2>You design it. I build it.</h2>
              <p className="lead">
                Think of me as your on-call development team. Agencies bring the
                brand, the strategy, and the design — I turn it into clean,
                well-built, on-time websites under your name.
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
        </div>
      </section>
      </div>

      {/* ---------- CAPABILITIES ---------- */}
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

      {/* ---------- CTA ---------- */}
      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Have something in mind?</h2>
            <p>
              Send over the details — a design, a rough idea, or just a question.
              I&apos;ll point you to the right basket.
            </p>
            <Link href="/contact" className="btn btn-honey">
              Get in touch <Icon name="basket" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
