import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Ticket from "@/components/intake/Ticket";
import Icon from "@/components/Icon";
import { inboxConfigured, signedIn } from "@/lib/inbox-auth";
import { STATUSES, getTicket } from "@/lib/intake-store";
import { updateStatus } from "../actions";
import { STATUS_LABEL, STATUS_TONE, longDate, shortDate } from "../format";

export const dynamic = "force-dynamic";

const PAGES = { "/": "Small business home", "/for-agencies": "Agency home", "/for-organizations": "Organization home", "/contact": "Contact page" };

export default async function TicketPage({ params }) {
  if (!inboxConfigured()) redirect("/inbox");
  if (!(await signedIn())) redirect("/inbox/login");
  const { id } = await params;
  const t = await getTicket(id);
  if (!t) notFound();

  const first = t.name.split(/\s+/)[0];
  const subject = `Your picnicdev ticket: ${t.summary}`;
  const tel = (t.phone || "").replace(/[^\d+]/g, "");
  // the way they asked to hear back comes first
  const ways = [
    t.email && {
      id: "email",
      label: "Reply by email",
      href: `mailto:${t.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi ${first},\n\nThanks for the ticket! `)}`,
    },
    tel && { id: "call", label: `Call ${t.phone}`, href: `tel:${tel}` },
    tel && { id: "text", label: `Text ${t.phone}`, href: `sms:${tel}` },
  ].filter(Boolean);
  ways.sort((a, b) => (b.id === t.prefers) - (a.id === t.prefers));
  const PREFERS = { email: "Email", call: "A phone call", text: "A text message" };

  return (
    <main className="ib-main">
      <Link href="/inbox" className="st-link ib-back">
        <Icon name="back" /> All tickets
      </Link>

      <div className="ib-detail">
        <Ticket
          date={shortDate(t.createdAt)}
          name={t.name}
          org={t.org}
          lines={t.lines}
          stamp={{ text: STATUS_LABEL[t.status], tone: STATUS_TONE[t.status] }}
        />

        <aside className="ib-side" aria-label="Reply and status">
          <h1>
            {t.name}
            {t.org && <span>{t.org}</span>}
          </h1>
          <div className="ib-actions">
            {ways.map((w, i) =>
              i === 0 ? (
                <a key={w.id} className="btn btn-primary" href={w.href}>
                  {w.label} <Icon name="next" />
                </a>
              ) : (
                <a key={w.id} className="st-link" href={w.href}>
                  {w.label}
                </a>
              )
            )}
          </div>

          <form className="ib-statuses-form">
            <p className="ib-label" id="status-label">
              Status
            </p>
            <div className="ib-statuses" role="group" aria-labelledby="status-label">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="submit"
                  formAction={updateStatus.bind(null, t.id, s)}
                  className="ib-status-opt"
                  data-tone={STATUS_TONE[s]}
                  aria-pressed={t.status === s}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
            </div>
          </form>

          <dl className="ib-meta">
            <div>
              <dt>Received</dt>
              <dd>{longDate(t.createdAt)}</dd>
            </div>
            {t.email && (
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${t.email}`}>{t.email}</a>
                </dd>
              </div>
            )}
            {t.phone && (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${tel}`}>{t.phone}</a>
                </dd>
              </div>
            )}
            <div>
              <dt>Prefers</dt>
              <dd>{PREFERS[t.prefers] || "Email"}</dd>
            </div>
            <div>
              <dt>Started from</dt>
              <dd>{PAGES[t.page] || t.page || "Unknown"}</dd>
            </div>
            <div>
              <dt>Emailed to you</dt>
              <dd>{t.notified ? "Yes" : "No (stored only)"}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </main>
  );
}
