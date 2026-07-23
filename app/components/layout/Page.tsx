import { forwardRef, type ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  /** Rendered as a sibling of the scrollable content, not inside it — see
   * the overflow note below. */
  tabs?: ReactNode;
  /** Which edge `tabs` occupies, so the content box can inset far enough
   * not to sit under them. Omit for pages with no tabs (Landing). */
  tabSide?: "left" | "right";
  className?: string;
  /**
   * Marks this leaf as the front endpaper (Landing only). Instead of a
   * white sheet with its own border, the leaf itself bleeds -inset-3 past
   * its nominal page rect in the same placeholder color as
   * BackEndpaper — matching that layer's oversize/color exactly means the
   * two align seamlessly into one continuous sheet instead of reading as
   * a white page with a sliver of yellow border peeking out behind it.
   */
  endpaper?: boolean;
}

// pl-10/pr-10 (40px) comfortably clears TabColumn's ~24px on-page width
// (32px tab minus its ~8px protrusion) with room to spare — see
// TabColumn.tsx for the protrusion math.
const insetClassFor = (tabSide?: "left" | "right") =>
  tabSide === "left" ? "py-6 pl-10 pr-6" : tabSide === "right" ? "py-6 pr-10 pl-6" : "p-6";

/**
 * A single physical page inside the flip book. react-pageflip clones each
 * direct child of HTMLFlipBook and attaches a ref to its underlying DOM
 * node (which it then measures and positions directly at runtime), so
 * this has to be a plain forwardRef div — not a bare function component.
 *
 * bg-white is load-bearing, not a color choice: react-pageflip flips this
 * element in 3D, and a transparent page would show the ripple background
 * through it mid-flip instead of reading as a sheet of paper.
 *
 * The outer div (the actual ref target / .stf__item) intentionally has no
 * overflow utility of its own — CSS forces overflow-x to computed 'auto'
 * on any box with overflow-y set to non-'visible', so if the scrolling
 * behavior lived on this element, TabColumn's protruding tabs (positioned
 * absolute, translated past this box's edge) would get clipped by that
 * forced horizontal overflow. Scrolling instead lives on the inner content
 * div, leaving the outer edge free for `tabs` to poke past into the
 * HardcoverShell's margin.
 */
export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  { children, tabs, tabSide, className = "", endpaper = false },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`relative h-full w-full ${endpaper ? "" : "border border-black bg-white"} ${className}`}
    >
      {endpaper && <div aria-hidden="true" className="absolute -inset-3 bg-amber-100" />}
      {tabs}
      {/*
        `relative` here is conditional on `endpaper`, not universal — it's
        only needed to paint above the endpaper's oversized bg layer above
        (both positioned, stacked in DOM order; without it the later-but-
        unpositioned content div would paint under that bg div instead of
        over it). `endpaper` and `tabs` are never both set on the same
        Page, but making this content div positioned unconditionally
        regressed tab clickability: a positioned/z-index:auto descendant
        always paints (and hit-tests) above an unpositioned in-flow one
        regardless of DOM order, so on tabbed pages this div — despite its
        padding leaving tabs visually clear — still silently intercepted
        clicks over most of each tab's box (confirmed via elementFromPoint:
        only the ~8px sliver actually outside this div's own rect, past
        the page edge, was ever reachable). Scoping `relative` to
        `endpaper` only restores the plain (non-positioned, step-3) stacking
        that lets the tabs' own absolute positioning (step-6) paint and
        hit-test above it, like before the endpaper change.
      */}
      <div className={`h-full w-full overflow-y-auto ${endpaper ? "relative" : ""} ${insetClassFor(tabSide)}`}>
        {children}
      </div>
    </div>
  );
});
