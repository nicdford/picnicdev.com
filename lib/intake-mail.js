// Emails each new ticket to Nic through Resend's HTTP API (no SDK needed).
// Set RESEND_API_KEY, INTAKE_NOTIFY_TO, and INTAKE_NOTIFY_FROM (an address on
// a domain verified in Resend). Without a key, tickets are only stored.

import { CONTACT_EMAIL } from "./contact";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function mailConfigured() {
  return !!process.env.RESEND_API_KEY;
}

export async function notifyNic(t, { inboxUrl } = {}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false };

  const to = process.env.INTAKE_NOTIFY_TO || CONTACT_EMAIL;
  const from = process.env.INTAKE_NOTIFY_FROM || "Anty at picnicdev <onboarding@resend.dev>";
  const who = [t.name, t.org].filter(Boolean).join(" · ");
  const subject = `New ticket: ${who} (${t.summary})`;
  const reply =
    t.prefers === "call" ? `Prefers a call: ${t.phone}` : t.prefers === "text" ? `Prefers a text: ${t.phone}` : `Prefers email: ${t.email}`;
  const ask = t.callback ? "Skipped the questions: they'd like you to reach out." : null;

  const text = [
    `Ticket for Nic, from ${who}`,
    "",
    ...t.lines.map((l) => `${l.k}: ${l.v}${l.price ? ` (${l.price})` : ""}`),
    "",
    reply,
    ask,
    inboxUrl ? `Open it in the inbox: ${inboxUrl}` : "",
    "",
    t.email ? "Reply to this email to answer them directly." : null,
  ]
    .filter((x) => x !== null)
    .join("\n");

  const rows = t.lines
    .map(
      (l) => `<tr>
        <td style="padding:8px 12px;border-bottom:2px solid #d5def3;font:700 11px/1.6 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#4a3f33;vertical-align:top;white-space:nowrap">${esc(l.k)}</td>
        <td style="padding:8px 12px;border-bottom:2px solid #d5def3;font:15px/1.45 Arial,sans-serif;color:#161311">${esc(l.v)}${
          l.price ? ` <strong style="white-space:nowrap">· ${esc(l.price)}</strong>` : ""
        }</td>
      </tr>`
    )
    .join("");

  const html = `<div style="background:#f7ecd8;padding:24px">
    <table role="presentation" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#fffdf6;border:3px solid #161311;border-radius:12px;border-collapse:separate;overflow:hidden">
      <tr><td colspan="2" style="background:#bf350e;color:#fff;padding:10px 12px;font:800 12px Arial,sans-serif;letter-spacing:.09em;text-transform:uppercase">Ticket for Nic</td></tr>
      <tr><td colspan="2" style="padding:12px;border-bottom:2px solid #161311;font:800 18px Arial,sans-serif;color:#161311">${esc(who)}</td></tr>
      ${rows}
      <tr><td colspan="2" style="padding:12px;font:14px/1.5 Arial,sans-serif;color:#4a3f33">${esc(reply)}${
        inboxUrl ? ` · <a href="${esc(inboxUrl)}" style="color:#1f47a8">Open in the inbox</a>` : ""
      }${ask ? `<br>${esc(ask)}` : ""}${t.email ? `<br>Reply to this email to answer ${esc(t.name)} directly.` : ""}</td></tr>
    </table>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], ...(t.email ? { reply_to: t.email } : {}), subject, text, html }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend answered ${res.status}: ${await res.text().catch(() => "")}`);
  return { sent: true };
}
