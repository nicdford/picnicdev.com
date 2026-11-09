import BasketMark from "./BasketMark";
import { CONTACT_EMAIL } from "@/lib/contact";

// The standalone holding card. Only the GitHub Pages export serves it at /,
// since Pages can't run the rest of the site (see .github/workflows/pages.yml).
export default function Landing() {
  return (
    <section className="landing">
      <div className="landing-card">
        <span className="landing-mark" aria-hidden="true">
          <BasketMark size={70} />
        </span>
        <h1 className="landing-word">
          picnic<span className="dev">dev</span>
        </h1>
        <p className="landing-tag">Friendly web development. New site coming soon.</p>
        <a className="btn btn-primary landing-email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
      <div className="landing-seam gingham" aria-hidden="true" />
    </section>
  );
}
