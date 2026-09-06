import type { ReactNode } from "react";

/**
 * MDX component: <PullQuote>...</PullQuote> — large Newsreader italic,
 * hairline rule above and below. The [&>p]:... overrides force MDX's
 * auto-wrapped nested <p> to match this component's own sizing.
 */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote
      className="my-8 border-y border-rule py-6 font-serif text-2xl leading-snug text-ink italic
        [&>p]:mt-0 [&>p]:font-serif [&>p]:text-2xl [&>p]:leading-snug [&>p]:text-ink [&>p]:italic"
    >
      {children}
    </blockquote>
  );
}
