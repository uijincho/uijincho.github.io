import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

// Required for `output: "export"`.
export const dynamic = "force-static";

// Default export becomes /sitemap.xml at build time: static routes plus
// one entry per project slug.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/projects", "/about"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
  }));

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
