export const dynamic = "force-static";

export default function robots() {
  // staging builds keep crawlers out entirely (see next.config.mjs)
  if (process.env.SITE_NOINDEX) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/inbox", "/api/"],
    },
    sitemap: "https://picnicdev.com/sitemap.xml",
  };
}
