import Icon from "./Icon";
import IntakeLink from "./intake/IntakeLink";

export { buildTiers } from "./offerings";

function Price({ t }) {
  return (
    <div className="price">
      {t.from && <span className="from">{t.from}</span>}
      <span className={`amt${t.quote ? " quote" : ""}`}>{t.price}</span>
      {t.per && <span className="from">{t.per}</span>}
    </div>
  );
}

/**
 * Row of pricing cards. A tier may omit `price` (quoted work), set `per`
 * (e.g. "/mo") after the price, and list `muted` features it doesn't include.
 * `variant: "featured"` paints the card pink; `variant: "banner"` instead runs
 * its badge as a yellow band across the top and raises the card above its row.
 * Each card's button opens Anty's ticket stand already set to that tier.
 */
export default function TierGrid({ tiers }) {
  return (
    <div className="tiers">
      {tiers.map((t) => (
        <div className={`tier ${t.variant || ""}`} key={t.id} id={t.id}>
          {t.badge &&
            (t.variant === "banner" ? (
              <span className="tier-band">{t.badge}</span>
            ) : (
              <span className="badge">{t.badge}</span>
            ))}
          <span className="kicker">{t.kicker}</span>
          <span className="name">{t.name}</span>
          {t.price && <Price t={t} />}
          <p className="desc">{t.desc}</p>
          <ul>
            {t.features.map((f) =>
              typeof f === "string" ? (
                <li key={f}>{f}</li>
              ) : (
                <li key={f.label}>
                  <Icon name={f.icon} /> {f.label}
                </li>
              )
            )}
            {(t.muted || []).map((f) => (
              <li className="muted" key={f}>
                {f}
              </li>
            ))}
          </ul>
          <IntakeLink
            start={t.id}
            className={`btn${t.variant === "featured" ? " btn-primary" : ""}`}
          >
            {t.cta}
          </IntakeLink>
        </div>
      ))}
    </div>
  );
}

/** The same tiers as a compact list, for pages where they're secondary. */
export function TierRows({ tiers }) {
  return (
    <div className="tier-rows">
      {tiers.map((t) => (
        <div className="tier-row" key={t.id}>
          <div>
            <span className="kicker">{t.kicker}</span>
            <span className="name">{t.name}</span>
          </div>
          <Price t={t} />
          <p className="desc">{t.desc}</p>
          <IntakeLink start={t.id} className="text-link">
            {t.cta}
          </IntakeLink>
        </div>
      ))}
    </div>
  );
}
