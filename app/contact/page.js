import { Suspense } from "react";
import ContactStand from "@/components/intake/ContactStand";

export const metadata = {
  title: "Start a project",
  description:
    "Start a project with picnicdev. Anty writes up your website or app on a ticket, and Nic replies himself with a plan and a flat price, usually within a day.",
  alternates: { canonical: "/contact" },
};

// Most visitors meet Anty's stand as a modal over the page they're on. This
// route keeps the same stand for direct visits, new tabs, and old links.
export default function Contact() {
  return (
    <section className="section contact-page">
      <div className="wrap">
        <div className="head">
          <h1>
            Let&apos;s write up <span className="serif-italic accent">your project.</span>
          </h1>
          <p className="lead">
            My helper Anty jots the details onto a ticket for me. I read every one
            myself and reply with a plan and a flat price, usually within a day.
            Rather just email? Reach me at{" "}
            <a className="text-link" href="mailto:hello@picnicdev.com">
              hello@picnicdev.com
            </a>
            .
          </p>
        </div>
        <Suspense fallback={<div className="stand stand--page stand--loading" aria-hidden="true" />}>
          <ContactStand />
        </Suspense>
        <noscript>
          <p className="lead">
            Anty&apos;s stand needs JavaScript. Email{" "}
            <a className="text-link" href="mailto:hello@picnicdev.com">
              hello@picnicdev.com
            </a>{" "}
            and tell me about your project instead.
          </p>
        </noscript>
      </div>
    </section>
  );
}
