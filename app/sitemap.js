export const dynamic = "force-static";

const BASE = "https://picnicdev.com";

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/for-business", priority: 0.9 },
    { path: "/for-agencies", priority: 0.9 },
    { path: "/for-organizations", priority: 0.9 },
    { path: "/contact", priority: 0.6 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
