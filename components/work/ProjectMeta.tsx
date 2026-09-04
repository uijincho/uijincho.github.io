import type { Project } from "@/lib/projects";
import { KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { TYPE } from "@/lib/design/type-scale";

/**
 * The kind-specific metadata block. Branches on project.kind because
 * software and research projects genuinely need different fields —
 * stack vs lab/collaborators, repo/demo vs paper/code.
 */
export function ProjectMeta({ project }: { project: Project }) {
  const accentClass = KIND_ACCENT_TEXT[project.kind];

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-rule py-6 sm:grid-cols-3">
      <div>
        <dt className={TYPE.meta}>Timeline</dt>
        <dd className="mt-1 font-sans text-ink">{project.timeline}</dd>
      </div>

      {project.kind === "software" ? (
        // col-span-2 of the 3-column sm+ grid = 2/3 width, freed up by
        // dropping Role above (Timeline takes the remaining 1/3). Also
        // full-width on the 2-column mobile grid, which reads fine for a
        // comma-joined stack list.
        <div className="col-span-2">
          <dt className={TYPE.meta}>Stack</dt>
          <dd className="mt-1 font-sans text-ink">{project.stack.join(", ")}</dd>
        </div>
      ) : (
        <>
          <div>
            <dt className={TYPE.meta}>Lab</dt>
            <dd className="mt-1 font-sans text-ink">{project.lab}</dd>
          </div>
          <div className="col-span-2 sm:col-span-3">
            <dt className={TYPE.meta}>Collaborators</dt>
            <dd className="mt-1 font-sans text-ink">{project.collaborators.join(", ")}</dd>
          </div>
        </>
      )}

      <div className="col-span-2 sm:col-span-3">
        <dt className={TYPE.meta}>Links</dt>
        <dd className="mt-1 flex flex-wrap gap-6">
          {project.kind === "software" ? (
            <>
              <MetaLink href={project.links.repo} accentClass={accentClass} label="Repo" />
              <MetaLink href={project.links.demo} accentClass={accentClass} label="Live demo" />
            </>
          ) : (
            <>
              <MetaLink href={project.links.paper} accentClass={accentClass} label="Paper" />
              <MetaLink href={project.links.code} accentClass={accentClass} label="Code" />
            </>
          )}
        </dd>
      </div>
    </dl>
  );
}

/** Mono uppercase, track color, ↗ suffix — the spec's link treatment. */
function MetaLink({ href, accentClass, label }: { href?: string; accentClass: string; label: string }) {
  if (!href) return null;
  return (
    <a href={href} className={`inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide ${accentClass}`}>
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
