import { redirect } from "next/navigation";
import { inboxConfigured, signedIn } from "@/lib/inbox-auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function Login() {
  if (!inboxConfigured()) redirect("/inbox");
  if (await signedIn()) redirect("/inbox");
  return (
    <main className="ib-main ib-narrow">
      <h1>Nic&apos;s tickets</h1>
      <p className="ib-note">The tickets Anty collects at the stand. Password, please.</p>
      <LoginForm />
    </main>
  );
}
