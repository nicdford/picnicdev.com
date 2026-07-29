import Link from "next/link";

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
            Friendly, no-nonsense web development for small businesses and the
            agencies that serve them. Good work, fair prices, easy to reach.
          </p>
        </div>

        <div className="fcol">
          <h4>Explore</h4>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="fcol">
          <h4>What we do</h4>
          <Link href="/#static">Static sites</Link>
          <Link href="/#wordpress">WordPress builds</Link>
          <Link href="/#custom">Custom & app dev</Link>
          <Link href="/for-agencies">Agency partners</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} picnicdev. Built with care (and a little butter).</span>
        <span>
          <a href="mailto:hello@picnicdev.com">hello@picnicdev.com</a>
        </span>
      </div>
    </footer>
  );
}
