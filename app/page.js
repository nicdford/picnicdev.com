export const metadata = {
  title: { absolute: "picnicdev — friendly web development" },
  description: "picnicdev builds fast, affordable websites. Say hi at nic@picnicdev.com.",
};

const EMAIL = "nic@picnicdev.com";

export default function Landing() {
  return (
    <section className="landing">
      <div className="landing-card">
        <span className="landing-mark" aria-hidden="true">
          <BasketMark />
        </span>
        <h1 className="landing-word">
          picnic<span className="dev">dev</span>
        </h1>
        <p className="landing-tag">Friendly web development. New site coming soon.</p>
        <a className="btn btn-primary landing-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </div>
      <div className="landing-seam gingham" aria-hidden="true" />
    </section>
  );
}

function BasketMark() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path d="M3 9h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 9Z" fill="#fff" opacity="0.95" />
      <path d="M3 9h18" stroke="#c1381f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 9a4 4 0 0 1 8 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 12v5M12 12v5M15 12v5" stroke="#c1381f" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
