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
        <dt className={TYPE.meta}>Role</dt>
        <dd className="mt-1 font-sans text-ink">{project.role}</dd>
      </div>
      <div>
        <dt className={TYPE.meta}>Timeline</dt>
        <dd className="mt-1 font-sans text-ink">{project.timeline}</dd>
      </div>

      {project.kind === "software" ? (
        <div>
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
        <dd className="mt-1 flex flex-wrap gap-4">
          {project.kind === "software" ? (
            <>
              {project.links.repo && (
                <a href={project.links.repo} className={`underline underline-offset-2 ${accentClass}`}>
                  Repo
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} className={`underline underline-offset-2 ${accentClass}`}>
                  Live demo
                </a>
              )}
            </>
          ) : (
            <>
              {project.links.paper && (
                <a href={project.links.paper} className={`underline underline-offset-2 ${accentClass}`}>
                  Paper
                </a>
              )}
              {project.links.code && (
                <a href={project.links.code} className={`underline underline-offset-2 ${accentClass}`}>
                  Code
                </a>
              )}
            </>
          )}
        </dd>
      </div>
    </dl>
  );
}
