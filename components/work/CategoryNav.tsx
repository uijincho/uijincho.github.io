import type { Project, ProjectKind } from "@/lib/projects";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { TYPE } from "@/lib/design/type-scale";

/**
 * Desktop-only sticky sidebar: a numbered table of contents per track.
 * Clicking scrolls to that entry via a plain #hash anchor — this is
 * navigation, not filtering (that's WorkFilter's job, mobile-only).
 *
 * Item states: hover and the scroll-driven active item share one
 * treatment, a full-row --color-support (brick) fill with the row's text
 * (index number + title, both inside the same <a>) flipped to
 * --color-base for contrast. Deliberately identical for both triggers —
 * no tint-vs-solid split — and deliberately brick regardless of track, so
 * hovering/scrolling a SOFTWARE row never shows maroon. Track identity
 * still lives in the category header and rest-state index-number color
 * (KIND_ACCENT_TEXT); this fill is a separate, track-agnostic "you are
 * here" signal layered on top. Replaces an earlier spec (a bordered box
 * tinted ~9% with that category's color) — both the border/tint and the
 * per-track coloring are gone, not just the opacity number.
 *
 * `activeSlug` is owned by WorkSidebar, not this component — a single
 * IntersectionObserver up there watches BOTH tracks' items together so
 * there is exactly one highlighted project across software+research
 * combined, never one per CategoryNav. This component stays a plain
 * (server-renderable) presentational piece; it doesn't need "use client"
 * itself since it holds no state of its own.
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
              {/* Display only — the href above keeps the real slug (with
                  hyphens) since it must match ProjectSection's `id={p.slug}`
                  anchor exactly. */}
              {String(i + 1).padStart(2, "0")} {p.slug.replace(/-/g, " ")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
