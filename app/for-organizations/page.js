import Link from "next/link";
import Icon from "@/components/Icon";
import HeroPanels from "@/components/HeroPanels";
import TierGrid, { TierRows } from "@/components/TierGrid";
import { buildTiers, carePlans } from "@/components/offerings";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export const metadata = {
  title: "Websites & care plans for nonprofits and local organizations",
  description:
    "A part-time developer for nonprofits and local organizations. Monthly care plans with hosting, maintenance, and a developer you can rely on for updates, new pages, and events — no full-time hire needed.",
  alternates: { canonical: "/for-organizations" },
  openGraph: {
    title: "picnicdev — websites & care plans for nonprofits and local organizations",
    description:
      "Hosting, maintenance, and a developer for your updates, new pages, and events, for one flat monthly price. You work directly with one experienced developer.",
    url: "https://picnicdev.com/for-organizations",
  },
};

const faqs = [
  {
    q: "What can we ask you for?",
    a: "Anything your site needs: content updates, new pages, event pages, forms, small features, fixes, and troubleshooting. Steady covers the everyday edits; Part-time dev adds new pages and features. Hosting, updates, backups, and monitoring are part of every plan.",
  },
  {
    q: "What if something bigger comes up?",
    a: "Each plan covers the kind of work it describes, month to month. For something bigger, like a redesign or a whole new section, tell me what's coming and I'll quote it before I start. You'll never get a bill you didn't agree to first.",
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
    a: "If you have a full-time job's worth of web work, you should. Most organizations have a little every month: not enough for a hire, but too much to keep asking a volunteer. A care plan fills that gap.",
  },
];

export default function ForOrganizations() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Your developer,
              <br />
              <span className="accent serif-italic">without the payroll.</span>
            </h1>
            <p className="hero-lead">
              picnicdev is just me — Nic. I build and look after websites for
              nonprofits and local organizations. Hosting, updates, and a developer
              you can rely on for edits, new pages, and events, for one flat
              monthly price.
            </p>
            <div className="hero-cta">
              <Link href="#plans" className="btn btn-primary">
                See care plans →
              </Link>
              <Link href="#pricing" className="text-link">
                or see build pricing
              </Link>
            </div>
          </div>
          <HeroPanels />
        </div>
      </section>

      {/* ---------------- CARE PLANS ---------------- */}
      <section className="section" id="plans">
        <div className="wrap">
          <div className="head">
            <span className="eyebrow">
              <Icon name="wordpress" /> WordPress care plans
            </span>
            <h2>
              Hosting, upkeep, <span className="serif-italic">and a developer.</span>
            </h2>
            <p className="lead">
              Your WordPress site still needs someone who knows how it works: to keep it
              updated, add an event page, fix a broken form. Every plan
              includes hosting, updates, backups, and monitoring. You pick how much
              help you need: none, some, or a lot.
            </p>
          </div>

          <TierGrid tiers={carePlans} />
        </div>
      </section>

      {/* ---------------- BUILD PRICING ---------------- */}
      <section className="section" id="pricing">
        <div className="wrap">
          <div className="head">
            <h2>Need a new site first?</h2>
            <p className="lead">
              A flat, up-front price to build or rebuild your site. Launch it,
              then move onto a care plan to keep it in good shape.
            </p>
          </div>

          <TierRows tiers={buildTiers} />

          <div className="tier-foot">
            <p className="fineprint">
              Prices are starting points — final quotes depend on scope, but
              I&apos;ll always tell you the number up front. No surprise invoices,
              ever.
            </p>
          </div>
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
        title="Let's keep your site in good hands."
        text="Tell me about your organization and what your website needs, and I'll suggest the plan that fits."
        label="Find my plan"
        icon="basket"
      />
    </>
  );
}
