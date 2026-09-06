import Link from "next/link";
import type { Project, ProjectKind } from "@/lib/projects";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { TYPE } from "@/lib/design/type-scale";
import { FlatFrame } from "@/components/frames/FlatFrame";

/**
 * One track's worth of entries in the /work index right column. Carries
 * `data-kind` so the mobile WorkFilter can hide the whole section.
 *
 * Each entry is a row: text (index, category, title, summary, tags) on
 * the left, a thumbnail on the right (stacked below on mobile).
 */
export function ProjectSection({ kind, projects }: { kind: ProjectKind; projects: Project[] }) {
  const headingId = `section-${kind}`;

  return (
    <section data-kind={kind} aria-labelledby={headingId}>
      <h2 id={headingId} className={`scroll-mt-24 ${TYPE.meta} ${KIND_ACCENT_TEXT[kind]}`}>
        {KIND_LABEL[kind]}
      </h2>
      <ol className="mt-6 flex flex-col gap-16">
        {projects.map((p, i) => (
          <li key={p.slug} id={p.slug} className="scroll-mt-24">
            <Link href={`/projects/${p.slug}`} className="group flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
              <div className="md:flex-1">
                <div className="flex items-baseline gap-3">
                  <span className={`font-mono text-sm ${KIND_ACCENT_TEXT[kind]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`${TYPE.meta} ${KIND_ACCENT_TEXT[kind]}`}>{KIND_LABEL[kind]}</span>
                </div>
                <h3 className={`${TYPE.heading} mt-1 text-ink group-hover:underline`}>{p.title}</h3>
                <p className={`${TYPE.body} mt-2 max-w-[60ch] text-ink-muted`}>{p.summary}</p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ink-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:w-72 md:flex-none">
                <FlatFrame
                  src={p.thumbnail}
                  alt={`${p.title} — preview`}
                  width={180}
                  height={112}
                  fluid
                  whiteBg
                  className="w-full"
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
