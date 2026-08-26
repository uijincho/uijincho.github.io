import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Next.js convention: this file's default export becomes /robots.txt.
// Nothing on this site is gated — no auth, no draft content served at a
// real route — so it's a plain allow-all pointing at the sitemap above.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
