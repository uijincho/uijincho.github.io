import { getProjectsByKind } from "@/lib/projects";
import { HandwrittenName } from "@/components/hero/HandwrittenName";
import { TYPE } from "@/lib/design/type-scale";

/**
 * TODO — replace with a real designed mobile hero. Per spec: "I will
 * design a separate mobile hero. Do not attempt to scale the spread
 * down." This is the minimum bar in the meantime: a simple stacked
 * fallback (name, statement, track links), not the notebook spread —
 * hover doesn't exist on touch, so the desktop stack's affordance has no
 * mobile equivalent yet anyway.
 */
export function MobileHeroTodo() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;

  return (
    <section aria-label="Introduction" className="flex flex-col items-center bg-base px-6 py-16 text-center">
      <p className={TYPE.meta}>Portfolio 2026</p>
      {/* Not the page's h1 — NotebookHero (rendered alongside this,
          toggled purely by CSS, see HandwrittenName's `as` prop doc)
          already is. Same visual identity mark, not a second heading. */}
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
