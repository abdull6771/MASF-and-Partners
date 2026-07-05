// Post-build step (runs automatically via `npm run build`):
//   1. Writes dist/sitemap.xml and dist/robots.txt for the public routes.
//   2. Replaces the placeholder domain in dist/index.html (og:url, og:image,
//      JSON-LD) with VITE_SITE_URL when it is set.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PLACEHOLDER = "https://masfpartners.example";
const ROUTES = ["/", "/about", "/services", "/projects", "/capabilities", "/compliance", "/contact"];

const distDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
if (!existsSync(distDir)) {
  console.error("postbuild: dist/ not found — run `vite build` first.");
  process.exit(1);
}

const siteUrl = (process.env.VITE_SITE_URL || PLACEHOLDER).replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${siteUrl}${route === "/" ? "/" : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
).join("\n")}
</urlset>
`;
writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;
writeFileSync(resolve(distDir, "robots.txt"), robots);

const indexPath = resolve(distDir, "index.html");
const html = readFileSync(indexPath, "utf8");
writeFileSync(indexPath, html.replaceAll(PLACEHOLDER, siteUrl));

if (siteUrl === PLACEHOLDER) {
  console.warn(
    "postbuild: VITE_SITE_URL is not set — sitemap/robots/og tags use the placeholder domain. " +
      "Set VITE_SITE_URL to the production domain before deploying."
  );
} else {
  console.log(`postbuild: sitemap.xml, robots.txt and meta tags written for ${siteUrl}`);
}
