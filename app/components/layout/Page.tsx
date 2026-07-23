import { forwardRef, type ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
}

/**
 * A single physical page inside the flip book. react-pageflip clones each
 * direct child of HTMLFlipBook and attaches a ref to its underlying DOM
 * node (which it then measures and positions directly at runtime), so
 * this has to be a plain forwardRef div — not a bare function component.
 *
 * bg-white is load-bearing, not a color choice: react-pageflip flips this
 * element in 3D, and a transparent page would show the ripple background
 * through it mid-flip instead of reading as a sheet of paper.
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, className = "" },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`h-full w-full overflow-y-auto border border-black bg-white p-6 ${className}`}
    >
      {children}
    </div>
  );
});
