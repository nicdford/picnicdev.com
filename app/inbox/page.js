import Link from "next/link";
import { redirect } from "next/navigation";
import Anty from "@/components/intake/Anty";
import { inboxConfigured, signedIn } from "@/lib/inbox-auth";
import { mailConfigured } from "@/lib/intake-mail";
import { STATUSES, countTickets, listTickets } from "@/lib/intake-store";
import { STATUS_LABEL, lineValue, shortDate } from "./format";

export const dynamic = "force-dynamic";

export default async function Inbox({ searchParams }) {
  if (!inboxConfigured()) return <Locked />;
  if (!(await signedIn())) redirect("/inbox/login");

  const { status: asked } = await searchParams;
  const status = asked === "all" || STATUSES.includes(asked) ? asked : "new";

  let tickets = [];
  let counts = null;
  let failed = false;
  try {
    [tickets, counts] = await Promise.all([
      listTickets({ status: status === "all" ? null : status }),
      countTickets(),
    ]);
  } catch (err) {
    console.error("[inbox] could not read tickets", err);
    failed = true;
  }

  return (
    <main className="ib-main">
      <div className="ib-title">
        <h1>Tickets</h1>
        {!mailConfigured() && (
          <p className="ib-note">
            Email alerts are off. Set <code>RESEND_API_KEY</code> to get each ticket in your inbox too.
          </p>
        )}
      </div>

      <nav className="ib-filters" aria-label="Filter tickets">
        {[...STATUSES, "all"].map((s) => (
          <Link
            key={s}
            href={s === "new" ? "/inbox" : `/inbox?status=${s}`}
            className="ib-filter"
            aria-current={s === status ? "page" : undefined}
          >
            {STATUS_LABEL[s]}
            {counts && <span className="ib-count">{counts[s]}</span>}
          </Link>
        ))}
      </nav>

      {failed ? (
        <p className="ib-empty-text">
          Couldn&apos;t reach the ticket database. Check <code>INTAKE_DATABASE_URL</code> and the server log.
        </p>
      ) : tickets.length ? (
        <ol className="ib-list">
          {tickets.map((t) => {
            const when = lineValue(t, "Timeline") || lineValue(t, "Start");
            const budget = lineValue(t, "Budget");
            return (
              <li key={t.id}>
                <Link href={`/inbox/${t.id}`} className="ib-row">
                  <time className="ib-date" dateTime={t.createdAt}>
                    {shortDate(t.createdAt)}
                  </time>
                  <span className="ib-who">
                    <b>{t.name}</b>
                    {t.org && <span>{t.org}</span>}
                  </span>
                  <span className="ib-what">
                    <b>{t.summary}</b>
                    {(budget || when) && <span>{[budget, when].filter(Boolean).join(" · ")}</span>}
                  </span>
                  <span className={`ib-status ib-status--${t.status}`}>{STATUS_LABEL[t.status]}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="ib-empty">
          <Anty mood="idle" className="ib-empty-anty" />
          <p className="ib-empty-text">
            {status === "new"
              ? counts?.all
                ? "Nothing new. Everything's been answered."
                : "No tickets yet. When someone sends one from Anty's stand, it lands here."
              : `No ${STATUS_LABEL[status].toLowerCase()} tickets.`}
          </p>
        </div>
      )}
    </main>
  );
}

function Locked() {
  return (
    <main className="ib-main ib-narrow">
      <h1>The inbox is locked</h1>
      <p className="ib-note">
        Set <code>INBOX_PASSWORD</code> in the environment to open it. Tickets are still being saved and emailed.
      </p>
    </main>
  );
}
