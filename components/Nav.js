"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AudienceSwitcher from "./AudienceSwitcher";
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

function BasketMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 9h18l-1.6 9.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8L3 9Z"
        fill="#fff"
        opacity="0.95"
      />
      <path d="M3 9h18" stroke="#c1381f" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M8 9a4 4 0 0 1 8 0"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M9 12v5M12 12v5M15 12v5" stroke="#c1381f" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}
