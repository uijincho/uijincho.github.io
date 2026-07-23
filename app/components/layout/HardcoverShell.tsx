import type { ReactNode } from "react";

interface HardcoverShellProps {
  children: ReactNode;
}

/**
 * Static outer cover frame — rendered around the flip book on every route,
 * not just Landing. Deliberately NOT part of react-pageflip's turning
 * mechanics (it never rotates, never re-renders on flip): just a fixed-
 * margin border sized larger than the page block on all sides, so a strip
 * of "cover" is always visible peeking out around the interior pages, the
 * way a real hardcover's square edge extends past its paper block.
 *
 * TODO: bg-neutral-800 is a placeholder cover-cloth color — swap in the
 * final riso-palette treatment once that's locked in.
 */
export function HardcoverShell({ children }: HardcoverShellProps) {
  return (
    <div className="border border-black bg-neutral-800 p-5 shadow-xl">
      {children}
    </div>
  );
}
