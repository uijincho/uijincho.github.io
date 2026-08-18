import type { Project, ProjectKind } from "@/lib/projects";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { TYPE } from "@/lib/design/type-scale";

/**
 * Desktop-only sticky sidebar: a numbered table of contents per track.
 * Clicking scrolls to that entry via a plain #hash anchor — this is
 * navigation, not filtering (that's WorkFilter's job, mobile-only).
 */
export function CategoryNav({ kind, projects }: { kind: ProjectKind; projects: Project[] }) {
  return (
    <nav aria-label={`${KIND_LABEL[kind]} projects`}>
      <h2 className={`${TYPE.meta} ${KIND_ACCENT_TEXT[kind]}`}>{KIND_LABEL[kind]}</h2>
      <ol className="mt-3 flex flex-col gap-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a href={`#${p.slug}`} className="font-mono text-xs text-ink-muted hover:text-ink">
              {String(i + 1).padStart(2, "0")} {p.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
