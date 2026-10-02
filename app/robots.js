export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/inbox", "/api/"],
    },
    sitemap: "https://picnicdev.com/sitemap.xml",
  };
}
