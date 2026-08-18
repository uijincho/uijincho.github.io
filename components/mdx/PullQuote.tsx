import type { ReactNode } from "react";

/**
 * MDX component: <PullQuote>...</PullQuote> — large Newsreader italic,
 * hairline rule above and below.
 *
 * MDX wraps block content inside a JSX component's children in its own
 * <p> (via the global `p` override in mdx-components.tsx), which would
 * otherwise fight this component's sizing. The [&>p]:... overrides force
 * that nested <p> to match rather than compete.
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
