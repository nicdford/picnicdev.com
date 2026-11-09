"use client";

import { usePathname } from "next/navigation";

// The marketing nav and footer, everywhere except Nic's private inbox and,
// in the GitHub Pages export (`holding`), the standalone holding card at /.
export default function SiteChrome({ holding = false, children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/inbox") || (holding && pathname === "/")) return null;
  return children;
}
