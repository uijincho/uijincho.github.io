import { getProjectsByKind } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { CategoryNav } from "@/components/work/CategoryNav";
import { ProjectSection } from "@/components/work/ProjectSection";
import { WorkFilter } from "@/components/work/WorkFilter";

/**
 * The actual /work index content: sticky per-track table of contents
 * (CategoryNav, desktop only) beside the full project listing
 * (ProjectSection per track, WorkFilter collapsing it to a horizontal
 * filter row on mobile). Pulled out of app/work/page.tsx so the same
 * body can be embedded directly on the landing page (Zone 2 — the hero
 * scrolls straight into this, no separate /work navigation required)
 * as well as served at its own route.
 */
export function WorkIndexBody() {
  const software = getProjectsByKind("software");
  const research = getProjectsByKind("research");

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16">
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
    </div>
  );
}
