"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { CategoryNav } from "@/components/work/CategoryNav";

/**
 * Tracks the single active project across both CategoryNav sidebars.
 * One IntersectionObserver watches every project element from both
 * software and research, so exactly one activeSlug is highlighted at a
 * time. Among items intersecting the reading band at once, the one
 * earliest in page order wins.
 */
export function WorkSidebar({ software, research }: { software: Project[]; research: Project[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const slugs = [...software, ...research].map((p) => p.slug);
    const items = slugs.map((slug) => document.getElementById(slug)).filter((el): el is HTMLElement => el !== null);
    if (items.length === 0) return;

    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        setActiveSlug(slugs.find((slug) => intersecting.has(slug)) ?? null);
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [software, research]);

  return (
    <div className="sticky top-24 flex flex-col gap-10">
      <CategoryNav kind="software" projects={software} activeSlug={activeSlug} />
      <CategoryNav kind="research" projects={research} activeSlug={activeSlug} />
    </div>
  );
}
