import Link from "next/link";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";
import TierGrid from "@/components/TierGrid";
import { buildTiers } from "@/components/offerings";
import Steps from "@/components/Steps";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: { absolute: "picnicdev — affordable websites for small businesses" },
  description:
    "Fast, affordable websites for small businesses, built by one experienced developer. Static sites from $500 with free hosting, plus WordPress and custom development.",
  alternates: { canonical: "/for-business" },
  openGraph: {
    title: "picnicdev — affordable websites for small businesses",
    description:
      "Static sites from $500 with free hosting, plus WordPress and custom development. You work directly with one developer, start to finish.",
    url: "https://picnicdev.com/for-business",
  },
};

const steps = [
  { h: "Say hi", p: "Tell me what you need. I'll reply with a plan and a flat, honest price." },
  { h: "Design", p: "We nail down look and content. No surprises, no jargon." },
  { h: "Build", p: "I develop it fast and show you progress along the way." },
  { h: "Launch", p: "We go live, and I'm here for tweaks and questions after." },
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
    a: (
      <>
        Yes — that&apos;s the Agency Partner Program. You handle design and client
        relationships; I handle development under your brand. Great for overflow
        work or when you don&apos;t have an in-house dev.{" "}
        <Link href="/for-agencies" className="text-link">
          See the partner program
        </Link>
      </>
    ),
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
            <h1>
              Great websites,
              <br />
              <span className="accent serif-italic">without the fuss.</span>
            </h1>
            <p className="hero-lead">
              picnicdev is just me — Nic. I build fast, affordable websites for
              small businesses, and I&apos;m the one you talk to from first hello
              to launch day. No account managers, no outsourcing, no runaround.
            </p>
            <div className="hero-cta">
              <Link href="#pricing" className="btn btn-primary">
                See pricing →
              </Link>
              <Link href="#how-it-works" className="text-link">
                or see how it works
              </Link>
            </div>
          </div>
          <HeroPanels />
        </div>
      </section>

      {/* ---------------- MEET NIC — honest promise (proof substitute) ---------------- */}
      <section className="section">
        <div className="wrap promise">
          <div>
            <h2>No big agency. Just me, and a promise.</h2>
            <p className="lead">
              picnicdev is new, so I won&apos;t pretend to show you a wall of
              logos I don&apos;t have yet. Instead, here&apos;s what you can
              count on when you hire me — in plain writing.
            </p>
          </div>
          <div>
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
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">Three baskets, one honest price</span>
            <h2>
              Pricing that <span className="serif-italic">makes sense.</span>
            </h2>
            <p className="lead">
              Flat pricing for the common stuff, a real conversation for the
              custom stuff. Free hosting on static sites means your recurring
              costs stay close to zero.
            </p>
          </div>

          <TierGrid tiers={buildTiers} />

          <div className="tier-foot">
            <p className="includes">
              <strong>Every basket includes</strong>
              <span>
                <Icon name="phone" /> Mobile-first design
              </span>
              <span>
                <Icon name="search" /> SEO basics
              </span>
              <span>
                <Icon name="chat" /> A real human who answers
              </span>
            </p>
            <p className="fineprint">
              Prices are starting points — final quotes depend on scope, but
              I&apos;ll always tell you the number up front.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="section" id="how-it-works">
        <div className="wrap">
          <div className="head">
            <h2>Easy from hello to launch</h2>
          </div>
          <Steps steps={steps} />
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section">
        <div className="wrap">
          <div className="head">
            <h2>Before you ask</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand
        title="Let's spread out a plan."
        text="Tell me what you're building — a small site, a shop, or something custom — and I'll help you get there."
        label="Start a project"
        icon="basket"
      />
    </>
  );
}
