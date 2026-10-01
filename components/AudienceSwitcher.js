"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAudience } from "./AudienceProvider";
import { AUDIENCE_HOMES, audienceForPath } from "./audiences";
import Icon from "./Icon";

const OPTIONS = [
  { id: "business", icon: "storefront", label: "Small business" },
  { id: "agency", icon: "handshake", label: "Agency" },
  { id: "org", icon: "hand", label: "Organization" },
];

/**
 * Segmented control that flips the whole site between "small business",
 * "agency", and "organization" — like a light/dark toggle. On the home routes
 * it swaps the URL client-side (no reload) so each audience keeps its own
 * SEO-friendly page; everywhere else it just updates the persisted preference
 * and the page reskins via CSS.
 *
 * The labels aren't the same length ("Small business" vs "Agency"), so
 * the selected color lives directly on each button's own background rather
 * than a separately-sized overlay — that way the color can never fall short
 * of (or spill past) the text it's behind, regardless of label length.
 */
export default function AudienceSwitcher({ compact = false }) {
  const { audience, setAudience } = useAudience();
  const router = useRouter();
  const pathname = usePathname();

  // Prefetch every home route so switching feels instant.
  useEffect(() => {
    Object.values(AUDIENCE_HOMES).forEach((href) => router.prefetch(href));
  }, [router]);

  function choose(next) {
    if (next === audience) return;
    setAudience(next); // instant CSS reskin + persistence
    if (audienceForPath(pathname)) {
      router.push(AUDIENCE_HOMES[next], { scroll: false });
    }
  }

  const labelId = `aud-label-${compact ? "compact" : "main"}`;

  return (
    <div className={`aud-field${compact ? " aud-field--compact" : ""}`}>
      <span className="aud-label" id={labelId}>
        Who are you?
      </span>
      <div
        className={`aud-switch${compact ? " aud-switch--compact" : ""}`}
        role="group"
        aria-labelledby={labelId}
      >
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            data-role={o.id}
            className={`aud-opt${audience === o.id ? " on" : ""}`}
            aria-pressed={audience === o.id}
            onClick={() => choose(o.id)}
          >
            <Icon name={o.icon} /> {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
