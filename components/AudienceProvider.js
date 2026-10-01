"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AUDIENCE_HOMES, audienceForPath } from "./audiences";

const AudienceContext = createContext(null);

/**
 * Holds the current audience ("business" | "agency" | "org") and keeps it in sync with:
 *  - the <html data-audience> attribute (drives CSS reskin site-wide, set pre-paint
 *    by the no-flash script in the root layout);
 *  - localStorage (so the choice persists across pages and visits);
 *  - the canonical home routes (see AUDIENCE_HOMES).
 */
export function AudienceProvider({ children }) {
  const pathname = usePathname();
  const [audience, setAudienceState] = useState("business");

  const apply = useCallback((next) => {
    setAudienceState(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.audience = next;
    }
    try {
      localStorage.setItem("pd-audience", next);
    } catch {
      /* storage may be unavailable; not fatal */
    }
  }, []);

  // On mount, adopt whatever the pre-paint script already resolved.
  useEffect(() => {
    const fromDom = document.documentElement.dataset.audience;
    setAudienceState(fromDom in AUDIENCE_HOMES ? fromDom : "business");
  }, []);

  // Each home URL is the source of truth for its audience.
  useEffect(() => {
    const fromPath = audienceForPath(pathname);
    if (fromPath) apply(fromPath);
  }, [pathname, apply]);

  return (
    <AudienceContext.Provider value={{ audience, setAudience: apply }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) return { audience: "business", setAudience: () => {} };
  return ctx;
}
