import Link from "next/link";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";
import TierGrid from "@/components/TierGrid";
import Steps from "@/components/Steps";
import CtaBand from "@/components/CtaBand";
import IntakeLink from "@/components/intake/IntakeLink";
import { partnerTiers } from "@/components/offerings";

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

const steps = [
  { h: "Kickoff", p: "You share designs, scope, and deadlines. I confirm a plan and a price." },
  { h: "Build", p: "I develop it clean and faithful, showing progress as I go." },
  { h: "Review", p: "You review it under your brand. I revise fast, no ego." },
  { h: "Handoff", p: "Delivered on time, documented, and ready for your client." },
];

export default function ForAgencies() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              You design it.
              <br />
              <span className="accent serif-italic">I build it.</span>
            </h1>
            <p className="hero-lead">
              picnicdev is your behind-the-scenes development partner. You bring
              the brand, the strategy, and the design — I turn it into clean,
              on-time, pixel-faithful websites under your name. No hand-offs, no
              drama.
            </p>
            <div className="hero-cta">
              <IntakeLink className="btn btn-primary">
                Start a partnership →
              </IntakeLink>
              <Link href="#how-it-works" className="text-link">
                or see how it works
              </Link>
            </div>
          </div>
          <HeroPanels />
        </div>
      </section>

      {/* ---------------- MEET NIC ---------------- */}
      <section className="section">
        <div className="wrap promise">
          <div>
            <h2>One senior dev, on your team.</h2>
            <p className="lead">
              You get a single, experienced developer who communicates like a
              colleague and treats your deadlines as sacred. Here&apos;s what
              working together looks like.
            </p>
          </div>
          <div>
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
                Faithful, clean builds
                <span>From Figma, XD, or flat files to semantic code your team can pick up.</span>
              </li>
              <li>
                Real capacity
                <span>Overflow help exactly when your pipeline spikes.</span>
              </li>
            </ul>
            <p className="promise-sign">— Nic</p>
          </div>
        </div>
      </section>

      {/* ---------------- WAYS I PLUG IN ---------------- */}
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Three ways to work together</span>
            <h2>However you need me</h2>
            <p className="lead">
              Project rates and partnership terms are set together, based on scope
              and how often you need me. No mystery — you&apos;ll always see the
              number up front.
            </p>
          </div>

          <TierGrid tiers={partnerTiers} />

          <div className="tier-foot">
            <p className="fineprint">
              Not sure which fits your agency?{" "}
              <IntakeLink className="text-link">
                Tell me about your pipeline →
              </IntakeLink>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section" id="how-it-works">
        <div className="wrap">
          <div className="head">
            <h2>Smooth from kickoff to handoff</h2>
          </div>
          <Steps steps={steps} />
        </div>
      </section>

      {/* ---------------- UNDER THE HOOD ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <h2>The kit I cook with</h2>
            <p className="lead">
              Modern where it matters, boring where it should be. The right tool
              for the job — not whatever&apos;s trendy this week.
            </p>
          </div>
          <div className="kit">
            <div>
              <h3>
                <Icon name="globe" /> Static &amp; JAMstack
              </h3>
              <p>
                Hand-built HTML/CSS and modern frameworks like Next.js. Fast,
                secure, and cheap (or free) to host.
              </p>
            </div>
            <div>
              <h3>
                <Icon name="puzzle" /> WordPress
              </h3>
              <p>
                Years of WordPress builds — custom themes, plugins, and
                editor-friendly setups your team can actually use.
              </p>
            </div>
            <div>
              <h3>
                <Icon name="rocket" /> Apps &amp; DevOps
              </h3>
              <p>
                Standalone application development with fly.io deployments, CI/CD
                pipelines, and everything wired up to ship safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a developer you can count on?"
        text="Send over a design or tell me about your pipeline, and let's talk about a partnership that makes your deadlines easier."
        label="Start a partnership"
        icon="handshake"
      />
    </>
  );
}
