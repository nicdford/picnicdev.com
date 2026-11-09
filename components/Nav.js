"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AudienceSwitcher from "./AudienceSwitcher";
import BasketMark from "./BasketMark";
import IntakeLink from "./intake/IntakeLink";

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="picnicdev home">
            <span className="dot" aria-hidden="true">
              <BasketMark />
            </span>
            <span className="brand-word">
              picnic<span className="dev">dev</span>
            </span>
          </Link>

          <span className="nav-switch-wrap">
            <AudienceSwitcher />
          </span>

          <nav className="nav-links" aria-label="Main">
            <IntakeLink aria-current={pathname === "/contact" ? "page" : undefined}>
              Contact
            </IntakeLink>
          </nav>
        </div>
      </header>
      {/* Phones: below the sticky header, so it scrolls away with the page */}
      <div className="nav-switch-bar">
        <AudienceSwitcher compact />
      </div>
    </>
  );
}
