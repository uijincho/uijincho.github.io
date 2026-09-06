import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

const NAME = "~uijincho";

interface HandwrittenNameProps {
  /**
   * The landing page renders both NotebookHero (desktop) and
   * MobileHeroTodo (mobile) unconditionally — only CSS `hidden`/`md:hidden`
   * decides which one is visible at a given viewport, neither is
   * conditionally mounted. Since both render this component, defaulting
   * this tag to "h1" in both places would put two real `<h1>` elements in
   * the same document (audit requirement: one h1 per page — and this isn't
   * just an accessibility-tree nuance, since one of the two is always
   * `display:none` and thus excluded from the a11y tree either way, it's
   * that the raw markup itself would carry two, which is what "one h1 per
   * page" means literally). NotebookHero is the canonical desktop hero, so
   * it keeps the real "h1"; MobileHeroTodo (an explicitly-labeled TODO
   * stopgap, not a permanent second hero) passes "p" instead — same visual
   * treatment, not a second page-level heading.
   */
  as?: "h1" | "p";
}

/**
 * The page's h1 (or, on the mobile fallback, a visually-identical <p> —
 * see the `as` prop above) — this name is the landing page's primary
 * heading.
 *
 * The wrapping element holds the real, complete text at all times via a sr-only span —
 * that's unconditionally correct, with or without JS, and it's what SEO,
 * LCP, and assistive tech actually see. Layered on top is a decorative,
 * aria-hidden sibling that runs a page-load typing effect (see
 * .identity-typewriter / .identity-cursor in globals.css) purely by
 * animating its own already-complete text's revealed width — it never
 * mutates textContent, so the heading's real content is never briefly
 * empty or partial. No aria-live on the animated layer: it carries no
 * accessible meaning and must never be announced mid-animation.
 *
 * Width (and height) are reserved up front by an `invisible` placeholder
 * in normal flow (sets the wrapper's own box — and therefore where the
 * cursor's `align-bottom` sibling lines up — to exactly the text's real
 * size), with the animated layer stacked on top via `absolute inset-0`,
 * so its width growing underneath doesn't shift anything else on the page
 * and it never contributes its own size back into that layout.
 *
 * That absolute positioning matters for a second reason, not just the
 * reveal: the animated layer also needs `overflow-hidden` (so the width
 * animation actually clip-reveals text instead of resizing an inert box)
 * plus a few extra px of height below the text — with `leading-none`
 * (line-height: 1), JetBrains Mono's line box is exactly one em, but the
 * glyphs' own descenders (the tail of the "j") paint a bit below that,
 * invisible under plain overflow:visible but cut off once overflow-hidden
 * clips to the box's rect. `h-11` (44px, vs. the text's real 36px) gives
 * that room. If this extra height were a normal-flow box (e.g. padding-
 * bottom on an in-flow span) it would grow the WRAPPER's own box too —
 * exactly what happened one pass earlier: the wrapper grew 8px taller,
 * and since the cursor sibling also aligns to the bottom of the line box,
 * it silently followed, ending up 8px below the name instead of flush
 * with it. `position: absolute` is what avoids that: an absolutely
 * positioned box is removed from normal flow, so it can be taller than
 * the placeholder that actually defines the wrapper's size without either
 * the wrapper or the cursor ever finding out.
 *
 * (Also tried `overflow-x-hidden overflow-y-visible` to only clip
 * horizontally, before landing on the absolute+h-11 approach: per the CSS
 * Overflow spec, a non-"visible" x paired with "visible" y doesn't stay
 * visible, it computes to "auto" — which still clipped flush content and,
 * worse, drew a native scrollbar-arrow widget over the text.)
 *
 * The typewriter's steps(9) and the "9ch" width in globals.css are
 * intentionally hardcoded to match NAME's fixed length, not derived — see
 * the comment there. The type-in itself repeats on a loop (also driven
 * entirely by CSS, not JS re-mounts or state), whose length is the
 * `--identity-cycle` custom property set by the `identity-mark` class
 * below (default 15s, see globals.css) — the cursor's blink duration is
 * derived from that same variable rather than its own hardcoded number,
 * specifically so retuning the typing speed can't desync it from the
 * cursor again (see globals.css for the full story). prefers-reduced-
 * motion is handled entirely in globals.css: the typing keyframes are
 * skipped (full text shows immediately, no retyping) and the cursor
 * renders static instead of blinking.
 */
export function HandwrittenName({ as = "h1" }: HandwrittenNameProps) {
  const Tag = as;
  return (
    <Tag className={`${mono.className} identity-mark text-[36px] leading-none text-accent tracking-tight`}>
      {/* The name doubles as the site's "home base" link — /about, not /
          (this hero already sits on /). Nested inside the h1 rather than
          replacing it, so the one-h1-per-page heading survives. */}
      <Link href="/about">
        <span className="sr-only">{NAME}</span>
        <span aria-hidden="true" className="relative inline-block align-bottom">
          <span className="invisible whitespace-nowrap">{NAME}</span>
          <span className="identity-typewriter absolute inset-0 h-11 overflow-hidden whitespace-nowrap">
            {NAME}
          </span>
        </span>
        {/* A drawn bar, not a "|" glyph — a monospace character cell carries
            its own side-bearing, which reads as a gap between the name and
            the cursor. This sits flush against the last character instead. */}
        <span aria-hidden="true" className="identity-cursor inline-block h-[0.75em] w-[3px] bg-current align-bottom" />
      </Link>
    </Tag>
  );
}
