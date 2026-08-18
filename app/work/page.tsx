import type { Metadata } from "next";
import { getProjectsByKind } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { CategoryNav } from "@/components/work/CategoryNav";
import { ProjectSection } from "@/components/work/ProjectSection";
import { WorkFilter } from "@/components/work/WorkFilter";

export const metadata: Metadata = {
  title: "Work — Uijin Cho",
  description: "Software engineering and research projects.",
};

// Real editorial index, replacing the Stage 2 plain-list proof-of-life.
// Two-column: a sticky per-track table of contents on desktop
// (CategoryNav, navigation via #hash anchors), collapsing to a horizontal
// filter row on mobile (WorkFilter, actual show/hide via CSS).
export default function WorkIndex() {
  const software = getProjectsByKind("software");
  const research = getProjectsByKind("research");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className={`${TYPE.displayLg} text-ink`}>Work</h1>

      <div className="mt-12 md:grid md:grid-cols-[180px_1fr] md:gap-16">
        <aside className="hidden md:block">
          <div className="sticky top-24 flex flex-col gap-10">
            <CategoryNav kind="software" projects={software} />
            <CategoryNav kind="research" projects={research} />
          </div>
        </aside>

        <WorkFilter>
          <div className="flex flex-col gap-20">
            <ProjectSection kind="software" projects={software} />
            <ProjectSection kind="research" projects={research} />
          </div>
        </WorkFilter>
      </div>
    </main>
  );
}
