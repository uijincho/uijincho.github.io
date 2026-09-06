import type { ReactNode } from "react";

type CalloutKind = "note" | "caveat";

/**
 * MDX component: <Callout kind="note|caveat">...</Callout> — tinted
 * block, 3px left border, mono uppercase label. Neutral color
 * (--color-ink-muted), not an accent.
 */
export function Callout({ kind, children }: { kind: CalloutKind; children: ReactNode }) {
  return (
    <div className="my-8 border-l-[3px] border-ink-muted bg-raised py-4 pl-4 pr-4">
      <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">{kind}</p>
      <div className="mt-2 [&>*:first-child]:mt-0">{children}</div>
    </div>
  );
}
