import { getProjectsByKind } from "@/lib/projects";
import { HandwrittenName } from "@/components/hero/HandwrittenName";
import { TYPE } from "@/lib/design/type-scale";

/**
 * TODO: replace with a designed mobile hero. Stopgap fallback: name,
 * statement, and track links, stacked (not the desktop notebook spread).
 */
export function MobileHeroTodo() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;

  return (
    <section aria-label="Introduction" className="flex flex-col items-center bg-base px-6 py-16 text-center">
      <p className={TYPE.meta}>Portfolio 2026</p>
      {/* Rendered as "p", not "h1" — NotebookHero already holds the page's h1. */}
      <HandwrittenName as="p" />
      <p className={`${TYPE.body} mt-4 max-w-[40ch] text-ink`}>
        Software engineer and researcher building at the intersection of both.
      </p>
      <div className="mt-8 flex gap-6">
        <a href="#section-software" className="font-mono text-xs uppercase tracking-wide text-accent">
          Software ({softwareCount})
        </a>
        <a href="#section-research" className="font-mono text-xs uppercase tracking-wide text-support">
          Research ({researchCount})
        </a>
      </div>
    </section>
  );
}
