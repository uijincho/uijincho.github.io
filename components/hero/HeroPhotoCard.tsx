import Image from "next/image";
import { PLACEHOLDER_LABEL } from "@/lib/design/placeholder-label";
import { shadowFor } from "@/lib/design/light";
import type { HeroStackOffset } from "@/lib/design/hero-stack";

const PHOTO_SIZE = 180;

interface HeroPhotoCardProps {
  /** Pre-resolved server-side (see NotebookHero) — this component never touches fs itself, so it can live in the client-bundled HeroPhotoStack tree. */
  src: string | null;
  isPlaceholder: boolean;
  alt: string;
  caption: string;
  offset: HeroStackOffset;
  /** True only for whichever card currently sits at depth 0 — applies the group-hover/group-focus-visible lift. */
  isTop: boolean;
  /**
   * All four cards render above the fold on page load (stacked, not
   * conditionally mounted) — one of them is this page's LCP element.
   * Without `priority`, next/image lazy-loads by default and Lighthouse
   * flags an LCP image being lazy-loaded regardless of it already being in
   * the initial viewport. HeroPhotoStack passes this as true for every
   * card it renders; defaults false only so this prop is safe to omit for
   * any future non-hero usage of this component.
   */
  priority?: boolean;
}

/**
 * One card in the hero photo stack.
 *
 * DELIBERATELY two nested elements, per spec — this is the detail that
 * fails silently if missed:
 *
 * - Outer div: a pure positioning proxy. `transform` (translate + rotate)
 *   and `zIndex` come from `offset`, set by the parent HeroPhotoStack —
 *   the resting depth position normally, the pull-out position while
 *   this card is being cycled out. `transition-transform` (class-based)
 *   animates changes to that inline-style transform smoothly, covering
 *   both the pull-out and the re-lay reflow with one rule.
 * - Inner div: the actual visible card — cream frame, bottom-weighted
 *   padding, LIGHT-derived shadow, caption. Only when `isTop` does this
 *   element get the group-hover/group-focus-visible lift classes; the
 *   "group" is the stack's <button> in HeroPhotoStack.
 *
 * Why the split matters: if the positional transform and the hover
 * transform both targeted the SAME element, the outer's inline
 * `style.transform` would always win over any class-based `:hover`
 * rule — inline style beats a class selector regardless of pseudo-class,
 * with no console error and correct-looking values in devtools (the CSS
 * rule is right there, it's just never applied). Two separate elements
 * means two independent `transform` properties — nothing to conflict
 * with, since the browser composes the outer's and inner's transforms
 * naturally.
 */
export function HeroPhotoCard({ src, isPlaceholder, alt, caption, offset, isTop, priority = false }: HeroPhotoCardProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 transition-transform duration-[210ms] ease-out motion-reduce:transition-none"
      style={{
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg)`,
        zIndex: offset.z,
      }}
    >
      <div
        // relative + grain: same shared texture as PhotoFrame, covering
        // both the real-photo and placeholder branches below in one
        // layer since it's painted on top of whichever renders. Its
        // ::after carries pointer-events:none (globals.css), so it can't
        // interfere with the stack <button>'s hit area even though this
        // card sits inside it.
        className={`relative bg-raised pt-[7px] pr-[7px] pb-[21px] pl-[7px] grain transition-transform duration-150 motion-reduce:transition-none ${
          isTop
            ? "group-hover:-translate-y-[9px] group-hover:rotate-[-1.5deg] group-focus-visible:-translate-y-[9px] group-focus-visible:rotate-[-1.5deg]"
            : ""
        }`}
        // Explicit width (photo + left/right padding), not auto. Without
        // this, an auto-width absolutely-positioned box (left:50%, no
        // right, centered only via the sibling transform) computes its
        // shrink-to-fit width from a browser-internal availability
        // calculation that doesn't know about the transform: it treats
        // the space from `left` to the containing block's right edge as
        // the budget, not the true centered width. That budget is
        // symmetric-looking but content-width-DEPENDENT, so the long
        // placeholder caption ("PLACEHOLDER CAPTION ONE", wider than the
        // 140px photo) wrapped to two lines at narrow page widths and
        // sat on one line at wide ones — a real discontinuity, not
        // rounding noise, confirmed at ~154px vs ~172px card widths on
        // either side of it. That's what made the visually-dominant
        // photo square drift off the page's true center as the notebook
        // resized: the card's own bounding box stayed correctly centered
        // throughout, but its SIZE (and therefore where the photo sat
        // inside it) wasn't stable. A fixed width makes the card the
        // same size at every notebook size, full stop.
        style={{ boxShadow: shadowFor(1), width: PHOTO_SIZE + 14 }}
      >
        {isPlaceholder || !src ? (
          <div
            className="flex items-center justify-center bg-base font-mono text-[10px] tracking-wide text-ink-muted"
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          >
            {PLACEHOLDER_LABEL}
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            priority={priority}
            className="block object-cover"
          />
        )}
        <p className="mt-1 text-center font-mono text-[11px] tracking-wide text-ink-muted">{caption}</p>
      </div>
    </div>
  );
}
