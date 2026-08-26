/**
 * Canonical site origin — the one place this is defined. Used by
 * `metadataBase` (app/layout.tsx), app/sitemap.ts, app/robots.ts, and the
 * JSON-LD Person schema on the landing page, so it's never hardcoded
 * twice and left to drift.
 *
 * Reads NEXT_PUBLIC_SITE_URL if set (configure this in Vercel's project
 * env vars — see the [[portfolio-site-project]] memory: deploy target is
 * Vercel, not GitHub Pages, so despite the repo's github.io name the real
 * production domain may not be this fallback). CONFIRM THE ACTUAL DOMAIN
 * before relying on the sitemap/OG/JSON-LD URLs this produces.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uijincho.github.io";

export const SITE_NAME = "Uijin Cho";
