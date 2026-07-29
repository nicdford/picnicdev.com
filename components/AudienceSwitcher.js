"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAudience } from "./AudienceProvider";
import Icon from "./Icon";

/**
 * Segmented control that flips the whole site between "small business" and
 * "agency" — like a light/dark toggle. On the home routes it swaps the URL
 * client-side (no reload) so each audience keeps its own SEO-friendly page;
 * everywhere else it just updates the persisted preference and the page
 * reskins via CSS.
 *
 * The two labels aren't the same length ("Small business" vs "Agency"), so
 * the selected color lives directly on each button's own background rather
 * than a separately-sized overlay — that way the color can never fall short
 * of (or spill past) the text it's behind, regardless of label length.
 */
export default function AudienceSwitcher({ compact = false }) {
  const { audience, setAudience } = useAudience();
  const router = useRouter();
  const pathname = usePathname();

  // Prefetch both home routes so switching feels instant.
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/for-agencies");
  }, [router]);

  function choose(next) {
    if (next === audience) return;
    setAudience(next); // instant CSS reskin + persistence
    const onHome = pathname === "/" || pathname === "/for-agencies";
    if (onHome) {
      router.push(next === "agency" ? "/for-agencies" : "/", { scroll: false });
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
        <button
          type="button"
          data-role="business"
          className={`aud-opt${audience === "business" ? " on" : ""}`}
          aria-pressed={audience === "business"}
          onClick={() => choose("business")}
        >
          <Icon name="storefront" /> Small business
        </button>
        <button
          type="button"
          data-role="agency"
          className={`aud-opt${audience === "agency" ? " on" : ""}`}
          aria-pressed={audience === "agency"}
          onClick={() => choose("agency")}
        >
          <Icon name="handshake" /> Agency
        </button>
      </div>
    </div>
  );
}
