import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata = {
  title: "About",
  description:
    "picnicdev is a small, friendly web development studio helping small businesses and agencies ship great websites — from cheap static sites to custom applications.",
};

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal className="eyebrow" as="span">About picnicdev</Reveal>
          <Reveal as="h1" delay={60}>
            Web development
            <br />
            <span className="serif-italic">should feel easy.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            picnicdev is a small studio with a simple belief: building a website
            shouldn&apos;t be stressful, overpriced, or full of jargon. Just good
            work, laid out plainly — like a good picnic.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="feature-row">
            <Reveal className="feature-visual v-honey">
              <span className="emoji" aria-hidden="true"><Icon name="basket" /></span>
              <div className="gingham strip-b" aria-hidden="true" />
            </Reveal>
            <Reveal delay={80} className="prose">
              <h2>Why "picnicdev"?</h2>
              <p>
                A picnic is unfussy and welcoming. You spread out a blanket, lay
                out what matters, and enjoy it — no white tablecloths required.
                That&apos;s how I want web development to feel: approachable,
                honest, and genuinely pleasant to be part of.
              </p>
              <p>
                picnicdev the studio is new — but I&apos;m not. I&apos;ve spent
                years building websites, from stacks of WordPress sites to custom
                applications and everything between. picnicdev is where I bring
                that experience to small businesses and fellow agencies, minus the
                big-agency overhead.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="head center">
            <span className="eyebrow">How I work</span>
            <h2>A few things I believe</h2>
          </Reveal>
          <div className="values">
            <Reveal className="value">
              <span className="em" aria-hidden="true"><Icon name="money" /></span>
              <h3>Fair, honest prices</h3>
              <p>
                Flat pricing where I can, a clear number before we start, and no
                surprise invoices. A $500 site should cost $500.
              </p>
            </Reveal>
            <Reveal className="value" delay={70}>
              <span className="em" aria-hidden="true"><Icon name="bolt" /></span>
              <h3>Fast &amp; lightweight</h3>
              <p>
                I reach for the simplest tool that does the job well. Often that
                means a static site that&apos;s cheap to host and quick to load.
              </p>
            </Reveal>
            <Reveal className="value" delay={140}>
              <span className="em" aria-hidden="true"><Icon name="hand" /></span>
              <h3>One real human</h3>
              <p>
                You work directly with me. No account managers, no phone trees —
                just quick, clear answers to your emails.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats">
            <Reveal className="stat">
              <div className="big">$500</div>
              <div className="lbl">Static sites, start to finish</div>
            </Reveal>
            <Reveal className="stat" delay={80}>
              <div className="big">$0</div>
              <div className="lbl">Hosting on static builds</div>
            </Reveal>
            <Reveal className="stat" delay={160}>
              <div className="big">2</div>
              <div className="lbl">Ways to work: direct or white-label</div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section cta-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="cta-box">
            <div className="gingham blanket-top" aria-hidden="true" />
            <h2>Let&apos;s build something good.</h2>
            <p>
              Whether it&apos;s a one-page site or a full application, I&apos;d
              love to hear what you&apos;re working on.
            </p>
            <Link href="/contact" className="btn btn-honey">
              Say hello <Icon name="basket" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
