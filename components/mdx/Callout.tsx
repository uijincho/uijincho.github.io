import type { ReactNode } from "react";

type CalloutKind = "note" | "caveat";

/**
 * MDX component: <Callout kind="note|caveat">...</Callout> — tinted
 * block, 3px left border, mono uppercase label. Deliberately neutral:
 * --color-ink-muted only, never an accent — both accents are reserved for
 * track identity (software/research), and a callout isn't either one.
 * This is where honest limitations go (kind="caveat"), so it must read as
 * neutral commentary, not as belonging to a track.
 *
 * Body content renders through the normal global `p`/`ul`/etc overrides
 * (mdx-components.tsx) — same serif prose as the rest of the article, just
 * boxed. [&>*:first-child]:mt-0 cancels the paragraph's own top margin so
 * it doesn't add extra space right under the label.
 */
export function Callout({ kind, children }: { kind: CalloutKind; children: ReactNode }) {
  return (
    <div className="my-8 border-l-[3px] border-ink-muted bg-raised py-4 pl-4 pr-4">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">{kind}</p>
      <div className="mt-2 [&>*:first-child]:mt-0">{children}</div>
    </div>
  );
}
