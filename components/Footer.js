import Link from "next/link";
import IntakeLink from "./intake/IntakeLink";
import { CONTACT_EMAIL } from "@/lib/contact";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="gingham blanket-line" aria-hidden="true" />
      <div className="footer-inner">
        <div>
          <Link href="/" className="brand" aria-label="picnicdev home">
            <span className="brand-word">
              picnic<span className="dev">dev</span>
            </span>
          </Link>
          <p className="about-blurb">
            Friendly, no-nonsense web development for small businesses,
            organizations, and the agencies that serve them. Good work, fair
            prices, easy to reach.
          </p>
        </div>

        <div className="fcol">
          <h2>Explore</h2>
          <Link href="/">Home</Link>
          <IntakeLink>Contact</IntakeLink>
        </div>

        <div className="fcol">
          <h2>What we do</h2>
          <Link href="/for-business#static">Static sites</Link>
          <Link href="/for-business#wordpress">WordPress builds</Link>
          <Link href="/for-business#custom">Custom & app dev</Link>
          <Link href="/for-organizations#plans">Monthly care plans</Link>
          <Link href="/for-agencies">Agency partners</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} picnicdev. Made in Boise, Idaho, with care (and a little butter).</span>
        <span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </span>
      </div>
    </footer>
  );
}
