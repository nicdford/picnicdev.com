/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only, so the Pages workflow builds a
  // static export of the holding page (see .github/workflows/pages.yml).
  ...(process.env.PAGES_EXPORT ? { output: "export" } : {}),
  // Staging builds (fly.staging.toml) set SITE_NOINDEX so search engines
  // never pick up the preview copy of the site.
  ...(process.env.SITE_NOINDEX
    ? {
        async headers() {
          return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
        },
      }
    : {}),
};

export default nextConfig;
