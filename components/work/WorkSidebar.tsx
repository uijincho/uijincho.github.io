"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { CategoryNav } from "@/components/work/CategoryNav";

/**
 * Owns the ONE shared "you are here" pick across both tracks' CategoryNav
 * sidebars. A single IntersectionObserver watches every project <li> from
 * BOTH software and research (ProjectSection gives each one id={slug}),
 * so there is exactly one activeSlug for the whole sidebar — never one per
 * track. Letting each CategoryNav run its own observer (the earlier
 * approach) could highlight a software row and a research row at once
 * whenever both trailed into the reading band near a section boundary;
 * hoisting the observer up here and threading a single `activeSlug` down
 * as a prop is what actually guarantees "one highlighted project total."
 *
 * Among items simultaneously intersecting the reading band, the one
 * earliest in page order (software first, then research — matching
 * render order below) wins, rather than whichever the browser happens to
 * report first in the observer callback.
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
