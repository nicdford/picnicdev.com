"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useAudience } from "../AudienceProvider";
import Intake from "./Intake";

const IntakeContext = createContext({ open: () => {} });

/**
 * Hosts Anty's ticket stand as a modal over whatever page the visitor is on.
 * IntakeLink calls `open({ start })`; the stand takes the page's audience
 * when no tier is named.
 */
export function IntakeProvider({ children }) {
  const { audience } = useAudience();
  const [entry, setEntry] = useState(null);

  const open = useCallback(
    ({ start = null, opener = null } = {}) => setEntry({ start, audience, opener, n: Date.now() }),
    [audience]
  );
  const done = useCallback(() => setEntry(null), []);

  return (
    <IntakeContext.Provider value={{ open }}>
      {children}
      {entry && <IntakeDialog key={entry.n} entry={entry} onDone={done} />}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  return useContext(IntakeContext);
}

/**
 * A native modal <dialog>: the browser traps focus, inerts the page, and
 * handles Escape. Opening pushes a history entry so the phone's Back button
 * closes the stand instead of leaving the site.
 */
function IntakeDialog({ entry, onDone }) {
  const ref = useRef(null);
  const pushed = useRef(false);
  const closing = useRef(false);

  const finish = useCallback(() => {
    const d = ref.current;
    if (d?.open) d.close();
    document.documentElement.classList.remove("intake-open");
    onDone();
    if (entry.opener?.isConnected) entry.opener.focus({ preventScroll: true });
  }, [entry, onDone]);

  const requestClose = useCallback(
    (fromHistory = false) => {
      if (closing.current) return;
      closing.current = true;
      if (pushed.current && !fromHistory) {
        pushed.current = false;
        window.history.back();
      }
      const d = ref.current;
      if (!d || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
      d.classList.add("is-closing");
      window.setTimeout(finish, 170);
    },
    [finish]
  );

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    document.documentElement.classList.add("intake-open");
    if (!pushed.current) {
      try {
        window.history.pushState({ ...(window.history.state || {}), pdIntake: true }, "");
        pushed.current = true;
      } catch {
        /* history unavailable: Back just leaves the page as before */
      }
    }
    const onPop = () => {
      if (!pushed.current) return;
      pushed.current = false;
      requestClose(true);
    };
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.documentElement.classList.remove("intake-open");
    };
  }, [requestClose]);

  return (
    <dialog
      ref={ref}
      className="intake-dialog"
      aria-labelledby="intake-title"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
    >
      <Intake entry={entry} mode="dialog" titleId="intake-title" onClose={() => requestClose()} />
    </dialog>
  );
}
