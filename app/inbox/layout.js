import "./inbox.css";
import Link from "next/link";
import { signedIn } from "@/lib/inbox-auth";
import { signOut } from "./actions";

export const metadata = {
  title: "Tickets",
  robots: { index: false, follow: false },
};

// Nic's private inbox for the tickets Anty collects. Not linked from the site.
export default async function InboxLayout({ children }) {
  const inside = await signedIn();
  return (
    <div className="inbox">
      <header className="ib-head">
        <div className="ib-head-inner">
          <Link href="/inbox" className="ib-brand">
            <span className="brand-word">
              picnic<span className="dev">dev</span>
            </span>
            <span className="ib-brand-tag">Tickets</span>
          </Link>
          {inside && (
            <form action={signOut}>
              <button type="submit" className="st-link">
                Sign out
              </button>
            </form>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
