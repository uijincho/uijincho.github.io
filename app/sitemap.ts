import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

// Next.js convention: this file's default export becomes /sitemap.xml at
// build time. Static routes plus one entry per project slug — pulled from
// the same getAllProjects() the /work index and [slug] page already use,
// so a new .mdx file under content/projects automatically shows up here
// too, no second place to remember to update.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/work", "/about"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
