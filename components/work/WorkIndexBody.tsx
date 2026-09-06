import { getProjectsByKind } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { WorkSidebar } from "@/components/work/WorkSidebar";
import { ProjectSection } from "@/components/work/ProjectSection";
import { WorkFilter } from "@/components/work/WorkFilter";

import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

/**
 * The /work index content: sticky per-track table of contents
 * (WorkSidebar, desktop only) beside the full project listing
 * (ProjectSection per track, collapsed to a filter row on mobile via
 * WorkFilter). Shared between the /work route and the landing page.
 *
 * Two nested widths: the outer div is a wide frame for large monitors;
 * the inner div caps and centers the actual editorial column so content
 * doesn't cluster to the left at wide viewports.
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
            <WorkSidebar software={software} research={research} />
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
