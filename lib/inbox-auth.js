// One password guards Nic's inbox (INBOX_PASSWORD). Signing in sets an
// HMAC-signed, httpOnly cookie scoped to /inbox; changing the password signs
// every session out. Every inbox page and action checks it on the server.

import { cookies } from "next/headers";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "pd_inbox";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function key() {
  const p = process.env.INBOX_PASSWORD;
  if (!p) return null;
  return createHash("sha256").update(`picnicdev-inbox\u0000${process.env.INBOX_SECRET || ""}\u0000${p}`).digest();
}

const sign = (issued) => createHmac("sha256", key()).update(`inbox.v1.${issued}`).digest("base64url");

export function inboxConfigured() {
  return !!process.env.INBOX_PASSWORD;
}

export function passwordMatches(input) {
  const p = process.env.INBOX_PASSWORD;
  if (!p || typeof input !== "string") return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(p).digest();
  return timingSafeEqual(a, b);
}

export async function startSession() {
  const issued = Date.now().toString(36);
  (await cookies()).set(COOKIE, `${issued}.${sign(issued)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/inbox",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).set(COOKIE, "", { path: "/inbox", maxAge: 0 });
}

export async function signedIn() {
  if (!key()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [issued, sig] = value.split(".");
  if (!issued || !sig) return false;
  const age = Date.now() - parseInt(issued, 36);
  if (!(age >= 0 && age < MAX_AGE * 1000)) return false;
  const want = Buffer.from(sign(issued));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}
