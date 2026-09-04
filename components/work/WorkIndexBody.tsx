import { getProjectsByKind } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { CategoryNav } from "@/components/work/CategoryNav";
import { ProjectSection } from "@/components/work/ProjectSection";
import { WorkFilter } from "@/components/work/WorkFilter";

import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

/**
 * The actual /work index content: sticky per-track table of contents
 * (CategoryNav, desktop only) beside the full project listing
 * (ProjectSection per track, WorkFilter collapsing it to a horizontal
 * filter row on mobile). Pulled out of app/work/page.tsx so the same
 * body can be embedded directly on the landing page (Zone 2 — the hero
 * scrolls straight into this, no separate /work navigation required)
 * as well as served at its own route.
 *
 * Two nested widths, not one: the OUTER div (max-w-[90rem]) is the wide
 * frame — full breathing room on large monitors, per an earlier explicit
 * "make the work div 20% wider" request. The INNER div (max-w-5xl) is
 * the actual editorial column — sidebar (180px) + gap-16 (64px) + the
 * project listing itself, which tops out well under 5xl's remaining
 * width even at its widest (a 60ch summary line is ~605px). Without
 * this inner cap, the listing's 1fr content column stretched to fill
 * whatever the outer frame left over (over 1100px at wide viewports),
 * and since thumbnails/text don't grow to fill it, everything visible
 * clustered on the left with dead space trailing off to the right —
 * the outer div was centered the whole time, but nothing about that is
 * visible when its content doesn't reach anywhere near its edges.
 * Capping and centering the actual content block (h1 included, so the
 * heading lines up with the grid beneath it) is what makes the page
 * read as centered rather than left-justified at wide viewports.
 */
export function WorkIndexBody() {
  const software = getProjectsByKind("software");
  const research = getProjectsByKind("research");

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className={`${mono.className} text-[36px] leading-none tracking-tight text-accent`}>selected projects</h1>

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
    </div>
  );
}
