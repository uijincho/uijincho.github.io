import type { Project, ProjectKind } from "@/lib/projects";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { TYPE } from "@/lib/design/type-scale";

/**
 * Desktop-only sticky sidebar: a numbered table of contents per track.
 * Clicking scrolls to that entry via a #hash anchor.
 *
 * Hover and the scroll-driven active item share the same highlight fill.
 * `activeSlug` is computed by the parent WorkSidebar (a single
 * IntersectionObserver watching both tracks), so this component stays a
 * plain presentational piece with no state of its own.
 */
export function CategoryNav({
  kind,
  projects,
  activeSlug,
}: {
  kind: ProjectKind;
  projects: Project[];
  activeSlug: string | null;
}) {
  return (
    <nav aria-label={`${KIND_LABEL[kind]} projects`}>
      <a href={`#section-${kind}`} className={`${TYPE.meta} ${KIND_ACCENT_TEXT[kind]} hover:text-ink`}>
        <h2 className="inline">{KIND_LABEL[kind]}</h2>
      </a>
      <ol className="mt-3 flex flex-col gap-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a
              href={`#${p.slug}`}
              aria-current={activeSlug === p.slug ? "true" : undefined}
              className={`-mx-2 block rounded px-2 py-1 font-mono text-xs uppercase transition-colors duration-150 ${
                activeSlug === p.slug ? "bg-support/15 text-ink-muted" : "text-ink-muted hover:bg-support/15 hover:text-ink-muted"
              }`}
            >
              {/* Display text only; the href keeps the real hyphenated slug. */}
              {String(i + 1).padStart(2, "0")} {p.slug.replace(/-/g, " ")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
