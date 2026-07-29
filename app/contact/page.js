import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Start a project with picnicdev. Tell me about your website or app and I'll reply with a plan and an honest price.",
};

export default function Contact() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <Reveal className="eyebrow" as="span">Start a project</Reveal>
          <Reveal as="h1" delay={60}>
            Let&apos;s <span className="serif-italic">unpack it.</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={120}>
            Tell me a little about what you need. I read every message myself and
            reply with a plan and a straight-up price — usually within a day.
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="wrap">
          <div className="contact-grid">
            <Reveal>
              <Suspense fallback={<p>Loading form…</p>}>
                <ContactForm />
              </Suspense>
            </Reveal>

            <Reveal className="contact-side" delay={100}>
              <div className="contact-card">
                <h3><Icon name="mail" /> Email me directly</h3>
                <p>
                  Prefer your own inbox? Reach me anytime at{" "}
                  <a className="mail" href="mailto:hello@picnicdev.com">
                    hello@picnicdev.com
                  </a>
                  .
                </p>
              </div>
              <div className="contact-card">
                <h3><Icon name="handshake" /> For agencies</h3>
                <p>
                  Interested in the white-label partner program? Mention your
                  agency and the kind of work you need covered.
                </p>
              </div>
              <div className="contact-card">
                <h3><Icon name="hourglass" /> What happens next</h3>
                <p>
                  I&apos;ll reply with a few questions if needed, a suggested
                  approach, and a clear, flat price. No pressure, no sales spiel.
                </p>
              </div>
              <div className="contact-card gingham-card">
                <h3><Icon name="basket" /> Not sure what you need?</h3>
                <p>
                  That&apos;s completely fine — just describe your business and
                  what you&apos;re hoping for. I&apos;ll help you figure out the
                  right fit.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
