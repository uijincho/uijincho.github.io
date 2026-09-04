import Link from "next/link";
import type { Project } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";

export function ProjectPager({ prev, next }: { prev?: Project; next?: Project }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Project navigation" className="mt-16 flex justify-between border-t border-rule pt-8">
      {prev ? (
        <Link href={`/projects/${prev.slug}`} className="group flex flex-col">
          <span className={TYPE.meta}>← Previous</span>
          <span className={`mt-2 font-mono text-xs uppercase tracking-wide ${KIND_ACCENT_TEXT[prev.kind]}`}>
            {KIND_LABEL[prev.kind]}
          </span>
          <span className="mt-1 font-display text-base font-bold tracking-[-0.02em] text-ink group-hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end text-right">
          <span className={TYPE.meta}>Next →</span>
          <span className={`mt-2 font-mono text-xs uppercase tracking-wide ${KIND_ACCENT_TEXT[next.kind]}`}>
            {KIND_LABEL[next.kind]}
          </span>
          <span className="mt-1 font-display text-base font-bold tracking-[-0.02em] text-ink group-hover:underline">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
