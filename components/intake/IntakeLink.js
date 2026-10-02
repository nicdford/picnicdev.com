"use client";

import { usePathname } from "next/navigation";
import { useIntake } from "./IntakeProvider";

/**
 * A real link to /contact that, with JavaScript, opens Anty's ticket stand
 * over the current page instead. `start` names the tier, plan, or partnership
 * the visitor picked (an id from offerings.js); leave it off for a general
 * hello and the stand follows the page's audience.
 *
 * Modified clicks (new tab, etc.) and visits to /contact itself keep the
 * plain link behavior.
 */
export default function IntakeLink({ start, children, ...rest }) {
  const { open } = useIntake();
  const pathname = usePathname();
  const href = start ? `/contact?start=${encodeURIComponent(start)}` : "/contact";

  function onClick(e) {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      pathname === "/contact"
    ) {
      return;
    }
    e.preventDefault();
    open({ start: start || null, opener: e.currentTarget });
  }

  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
