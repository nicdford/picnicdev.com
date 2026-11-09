import BasketMark from "@/components/BasketMark";

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
          <BasketMark size={70} />
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
