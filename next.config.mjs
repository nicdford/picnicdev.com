/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages serves static files only, so the Pages workflow builds a
  // static export of the holding page (see .github/workflows/pages.yml).
  ...(process.env.PAGES_EXPORT ? { output: "export" } : {}),
};

export default nextConfig;
