import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { saveTicket, markNotified } from "@/lib/intake-store";
import { notifyNic } from "@/lib/intake-mail";

// Receives a finished ticket from Anty's stand: stores it, then emails Nic.
// Either one is enough to count as delivered; if both fail the stand offers
// to send the same ticket by email instead, so a lead is never lost.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 32 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
// plain addresses only: nothing that could ride along into a mailto: link (?, &, #, quotes, brackets…).
// Keep in step with EMAIL_RE in components/intake/Intake.js.
const EMAIL_RE = /^[^\s@?&#/\\"<>,;:()[\]]+@[^\s@?&#/\\"<>,;:()[\]]+\.[^\s@?&#/\\"<>,;:()[\]]{2,}$/;
// the inbox link in Nic's email comes from config, never from request headers
const SITE_URL = (process.env.SITE_URL || "https://picnicdev.com").replace(/\/$/, "");
const hits = new Map(); // best effort, per server instance

function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  if (hits.size > 5000) hits.clear();
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// strip control characters (keeping newlines and tabs), trim, cap
const clean = (v, max = 200) =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
        .trim()
        .slice(0, max)
    : "";

function normalize(b) {
  const lines = (Array.isArray(b.lines) ? b.lines : [])
    .slice(0, 40)
    .map((l) => {
      const line = { k: clean(l?.k, 40), v: clean(l?.v, 2000) };
      const price = clean(l?.price, 60);
      return price ? { ...line, price } : line;
    })
    .filter((l) => l.k && l.v);
  const answers = b.answers && typeof b.answers === "object" && !Array.isArray(b.answers) ? b.answers : {};
  return {
    group: ["build", "partner", "plan"].includes(b.group) ? b.group : "build",
    audience: ["business", "agency", "org"].includes(b.audience) ? b.audience : "business",
    start: clean(b.start, 40) || null,
    summary: clean(b.summary, 80) || "New project",
    name: clean(b.name, 80),
    org: clean(b.org, 120),
    email: clean(b.email, 200),
    phone: clean(b.phone, 40),
    prefers: ["email", "call", "text"].includes(b.prefers) ? b.prefers : "email",
    callback: b.callback === true,
    lines,
    answers,
    page: clean(b.page, 200),
  };
}

const fail = (status, error) => NextResponse.json({ ok: false, error }, { status });

export async function POST(request) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const origin = request.headers.get("origin");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return fail(403, "Tickets can only be sent from picnicdev.");
    } catch {
      return fail(403, "Tickets can only be sent from picnicdev.");
    }
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (tooMany(ip)) return fail(429, "That's a lot of tickets. Try again in a few minutes.");

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return fail(413, "That ticket is too long to carry.");
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400, "That ticket didn't make sense.");
  }

  // the hidden field only bots fill in: thank them and drop it
  if (clean(body?.website)) return NextResponse.json({ ok: true });

  const t = normalize(body || {});
  if (!t.name) return fail(422, "The ticket needs a name.");
  if (t.email && !EMAIL_RE.test(t.email)) return fail(422, "That email address doesn't look right.");
  const digits = t.phone.replace(/\D/g, "").length;
  if (t.phone && digits < 7) return fail(422, "That phone number looks too short.");
  if (!t.email && !t.phone) return fail(422, "The ticket needs a way for Nic to reach you.");
  if (t.prefers === "email" && !t.email) t.prefers = "call";
  if (t.prefers !== "email" && !t.phone) t.prefers = "email";
  t.id = randomUUID();
  t.createdAt = new Date().toISOString();

  let stored = false;
  let mailed = false;
  try {
    await saveTicket(t);
    stored = true;
  } catch (err) {
    console.error("[intake] could not store ticket", err);
  }
  try {
    ({ sent: mailed } = await notifyNic(t, { inboxUrl: stored ? `${SITE_URL}/inbox/${t.id}` : null }));
  } catch (err) {
    console.error("[intake] could not email ticket", err);
  }
  if (stored && mailed) await markNotified(t.id).catch(() => {});

  if (!stored && !mailed) return fail(503, "The ticket couldn't be delivered.");
  return NextResponse.json({ ok: true, id: t.id });
}
