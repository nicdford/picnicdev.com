import Icon from "../Icon";

/**
 * The ticket for Nic: a printed pad sheet with a red band, one ruled line per
 * answer, and the published starting price on the tier line. Anty's stand
 * fills it live, and the finished sheet is what the visitor emails to Nic.
 *
 * Pass `onEdit` to make each line a button that reopens its question.
 * `fresh` names the line that was just written, so it plays the write-in.
 * `stamp` ({ text, date }) brings the rubber stamp down on the sheet.
 */
export default function Ticket({
  date,
  name,
  org,
  lines,
  blank = 0,
  fresh = null,
  freshKey = 0,
  onEdit,
  footer,
  stamp = null,
  clip = false,
  id,
  className = "",
}) {
  const who = [name, org].filter(Boolean).join(" · ");
  return (
    <article id={id} className={`ticket ${className}`.trim()} aria-label="Ticket for Nic">
      {clip && (
        // the bulldog clip that holds the sheet to Nic's board
        <svg className="tk-clip" viewBox="0 0 64 30" aria-hidden="true" focusable="false">
          <path d="M19 15V7a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v8" fill="none" stroke="#161311" strokeWidth="3.5" />
          <rect x="5" y="12" width="54" height="16" rx="4" fill="#161311" />
          <rect x="12" y="16.5" width="40" height="3" rx="1.5" fill="#fffdf6" opacity="0.45" />
        </svg>
      )}
      <header className="tk-band">
        <span>Ticket for Nic</span>
        {date && <time>{date}</time>}
      </header>

      <div className={`tk-for${fresh === "for" ? " is-fresh" : ""}`} key={fresh === "for" ? `for-${freshKey}` : "for"}>
        <span className="tk-k">For</span>
        <span className="tk-who">{who || <span className="tk-empty">Your name goes here</span>}</span>
      </div>

      <ol className="tk-lines">
        {lines.map((l, i) => {
          const lineId = l.id || `${l.k}-${i}`; // stored tickets keep labels, not step ids
          const isFresh = fresh != null && fresh === l.id;
          const body = (
            <>
              <span className="tk-k">{l.k}</span>
              <span className={`tk-v${l.price ? " tk-v--priced" : ""}`}>
                <span className="tk-text">{l.v}</span>
                {l.price && (
                  <>
                    <span className="tk-dots" aria-hidden="true" />
                    <span className="tk-price">{l.price}</span>
                  </>
                )}
              </span>
              {onEdit && (
                <span className="tk-edit" aria-hidden="true">
                  <Icon name="pencil" />
                </span>
              )}
            </>
          );
          return (
            <li
              key={isFresh ? `${lineId}-${freshKey}` : lineId}
              className={`tk-line${isFresh ? " is-fresh" : ""}`}
              data-line={lineId}
            >
              {onEdit ? (
                <button type="button" className="tk-row" onClick={() => onEdit(l.id)}>
                  <span className="sr-only">Change </span>
                  {body}
                </button>
              ) : (
                <div className="tk-row">{body}</div>
              )}
            </li>
          );
        })}
        {Array.from({ length: blank }, (_, i) => (
          <li key={`blank-${i}`} className="tk-blank" aria-hidden="true" />
        ))}
      </ol>

      {(footer || stamp) && (
        // the stamp gets its own corner of the tear-off strip, so it never sits on any copy
        <footer className={`tk-foot${stamp ? " has-stamp" : ""}`}>
          {footer && <span className="tk-foot-text">{footer}</span>}
          {stamp && (
            <p className="tk-stamp" role="status">
              {stamp.text || "Ready for Nic"}
              {stamp.date && <small>{stamp.date}</small>}
            </p>
          )}
        </footer>
      )}
    </article>
  );
}
