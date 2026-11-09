"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AudienceSwitcher from "./AudienceSwitcher";
import BasketMark from "./BasketMark";
import IntakeLink from "./intake/IntakeLink";

// The header slides away while the page scrolls down and comes back on any
// scroll up. It stays put near the top of the page; CSS keeps it in view while
// keyboard focus is inside it.
function useTuck() {
  const [tucked, setTucked] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    let frame = 0;
    last.current = Math.max(0, window.scrollY);
    function check() {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const dy = y - last.current;
      if (y < 80) setTucked(false);
      else if (dy > 6) setTucked(true);
      else if (dy < -6) setTucked(false);
      else return; // ignore jitter; measure from here next time
      last.current = y;
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(check);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return tucked;
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const tucked = useTuck();

  return (
    <>
      <header className="nav" data-tucked={tucked || undefined}>
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="picnicdev home">
            <span className="dot" aria-hidden="true">
              <BasketMark />
            </span>
            <span className="brand-word">
              Picnic <span className="dev">Dev</span>
            </span>
          </Link>

          <span className="nav-switch-wrap">
            {!isHome && <AudienceSwitcher />}
          </span>

          <nav className="nav-links" aria-label="Main">
            <IntakeLink aria-current={pathname === "/contact" ? "page" : undefined}>
              Contact
            </IntakeLink>
          </nav>
        </div>
      </header>
      {/* Phones: below the sticky header, so it scrolls away with the page */}
      {!isHome && (
        <div className="nav-switch-bar">
          <AudienceSwitcher compact />
        </div>
      )}
    </>
  );
}
