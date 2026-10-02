"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, passwordMatches, signedIn, startSession } from "@/lib/inbox-auth";
import { STATUSES, setTicketStatus } from "@/lib/intake-store";

const attempts = new Map(); // best effort, per server instance
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export async function signIn(_prev, formData) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return { error: "Too many tries. Give it fifteen minutes." };

  if (!passwordMatches(formData.get("password"))) {
    attempts.set(ip, [...recent, now]);
    return { error: "That's not the password." };
  }
  attempts.delete(ip);
  await startSession();
  redirect("/inbox");
}

export async function signOut() {
  await endSession();
  redirect("/inbox/login");
}

// Bound per button: updateStatus.bind(null, id, status)
export async function updateStatus(id, status) {
  if (!(await signedIn())) redirect("/inbox/login");
  if (typeof id !== "string" || !id || !STATUSES.includes(status)) return;
  await setTicketStatus(id, status);
  revalidatePath("/inbox");
  revalidatePath(`/inbox/${id}`);
}
