// Where finished tickets live. libSQL speaks to a local SQLite file in
// development (file:.data/intake.db, the default) and to Turso, or a file on
// a mounted volume, in production: set INTAKE_DATABASE_URL (and
// INTAKE_DATABASE_TOKEN for Turso).

import { createClient } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";

export const STATUSES = ["new", "replied", "won", "closed"];

let client = null;
let ready = null;

function db() {
  if (!client) {
    const url = process.env.INTAKE_DATABASE_URL || "file:.data/intake.db";
    if (url.startsWith("file:")) {
      mkdirSync(path.dirname(path.resolve(url.slice("file:".length))), { recursive: true });
    }
    client = createClient({ url, authToken: process.env.INTAKE_DATABASE_TOKEN || undefined });
  }
  return client;
}

function schema() {
  if (!ready) {
    ready = db()
      .batch(
        [
          `CREATE TABLE IF NOT EXISTS tickets (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            updated_at TEXT,
            status TEXT NOT NULL DEFAULT 'new',
            grp TEXT NOT NULL,
            audience TEXT NOT NULL,
            start TEXT,
            summary TEXT NOT NULL,
            name TEXT NOT NULL,
            org TEXT,
            email TEXT NOT NULL,
            phone TEXT,
            prefers TEXT,
            lines TEXT NOT NULL,
            answers TEXT NOT NULL,
            page TEXT,
            notified INTEGER NOT NULL DEFAULT 0
          )`,
          "CREATE INDEX IF NOT EXISTS tickets_created ON tickets (created_at DESC)",
        ],
        "write"
      )
      .catch((err) => {
        ready = null;
        throw err;
      });
  }
  return ready;
}

function toTicket(row) {
  if (!row) return null;
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    group: row.grp,
    audience: row.audience,
    start: row.start,
    summary: row.summary,
    name: row.name,
    org: row.org,
    email: row.email,
    phone: row.phone,
    prefers: row.prefers,
    lines: JSON.parse(row.lines || "[]"),
    answers: JSON.parse(row.answers || "{}"),
    page: row.page,
    notified: !!row.notified,
  };
}

export async function saveTicket(t) {
  await schema();
  await db().execute({
    sql: `INSERT INTO tickets
      (id, created_at, status, grp, audience, start, summary, name, org, email, phone, prefers, lines, answers, page)
      VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      t.id,
      t.createdAt,
      t.group,
      t.audience,
      t.start,
      t.summary,
      t.name,
      t.org || null,
      t.email,
      t.phone || null,
      t.prefers,
      JSON.stringify(t.lines),
      JSON.stringify(t.answers),
      t.page || null,
    ],
  });
}

export async function markNotified(id) {
  await schema();
  await db().execute({ sql: "UPDATE tickets SET notified = 1 WHERE id = ?", args: [id] });
}

export async function listTickets({ status } = {}) {
  await schema();
  const rs = STATUSES.includes(status)
    ? await db().execute({ sql: "SELECT * FROM tickets WHERE status = ? ORDER BY created_at DESC LIMIT 500", args: [status] })
    : await db().execute("SELECT * FROM tickets ORDER BY created_at DESC LIMIT 500");
  return rs.rows.map(toTicket);
}

export async function countTickets() {
  await schema();
  const rs = await db().execute("SELECT status, COUNT(*) AS n FROM tickets GROUP BY status");
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  for (const r of rs.rows) counts[r.status] = Number(r.n);
  counts.all = STATUSES.reduce((sum, s) => sum + counts[s], 0);
  return counts;
}

export async function getTicket(id) {
  await schema();
  const rs = await db().execute({ sql: "SELECT * FROM tickets WHERE id = ?", args: [id] });
  return toTicket(rs.rows[0]);
}

export async function setTicketStatus(id, status) {
  if (!STATUSES.includes(status)) throw new Error(`Unknown status: ${status}`);
  await schema();
  await db().execute({
    sql: "UPDATE tickets SET status = ?, updated_at = ? WHERE id = ?",
    args: [status, new Date().toISOString(), id],
  });
}
