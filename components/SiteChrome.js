"use client";

import { usePathname } from "next/navigation";

// The marketing nav and footer, everywhere except Nic's private inbox and
// the standalone holding page at /.
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/inbox") || pathname === "/") return null;
  return children;
}
