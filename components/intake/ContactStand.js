"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAudience } from "../AudienceProvider";
import { findOffering } from "../offerings";
import Intake from "./Intake";

// Old links carried the contact form's tier names (`?tier=WordPress`).
const LEGACY = {
  Static: "static",
  WordPress: "wordpress",
  Custom: "custom",
  "Care plan: Essentials": "essentials",
  "Care plan: Steady": "steady",
  "Care plan: Part-time dev": "part-time",
};

/** The stand inline on /contact, for direct visits, new tabs, and old links. */
export default function ContactStand() {
  const params = useSearchParams();
  const { audience } = useAudience();
  const raw = params.get("start") || LEGACY[params.get("tier")] || null;
  const start = raw && findOffering(raw) ? raw : null;
  const aud = params.get("tier") === "Agency partner" ? "agency" : audience;
  const entry = useMemo(() => ({ start, audience: aud }), [start, aud]);
  return <Intake key={`${start}:${aud}`} entry={entry} mode="page" titleId="contact-stand" />;
}
