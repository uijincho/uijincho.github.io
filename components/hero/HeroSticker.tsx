"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { shadowFor } from "@/lib/design/light";
import type { HeroSticker as HeroStickerConfig } from "@/lib/design/hero-stickers";

/**
 * Lighter than the polaroids' shadow — these are small and sit flatter.
 * Same LIGHT config, reduced elevation, so the direction still matches
 * everything else on the site; never a hardcoded shadow value.
 */
const STICKER_SHADOW_ELEVATION = 0.4;

interface HeroStickerProps {
  sticker: HeroStickerConfig;
  /** Pre-resolved server-side in NotebookHero — resolveImage() reads fs, which can't run in client-bundled code. Missing files are filtered out before this component ever mounts. */
  src: string;
}

/**
 * One hobby sticker.
 *
 * Positioning uses `transform: translate(-50%, -50%)` (inline style, for
 * centering the sticker at its x/y point) plus a SEPARATE, independent
 * `rotate` CSS property (also inline, for the resting per-sticker
 * rotation) — deliberately NOT `transform: rotate(...)` folded into the
 * same transform. Modern CSS has `rotate`/`scale`/`translate` as their
 * own standalone properties, distinct from the `transform` shorthand.
 * That split is what lets the hover/focus-visible state (Tailwind's
 * `rotate-0` and `scale-[1.09]` utilities, which compile to those same
 * standalone properties — confirmed against the compiled CSS) cleanly
 * override just the rotation and add a scale, without touching the
 * inline `transform` used for centering. If resting rotation had instead
 * been folded into `transform` via inline style, a class-based
 * `:hover { transform: ... }` rule would never win — this is the exact
 * "inline style beats a CSS class" trap from the photo stack's own
 * two-nested-element requirement, sidestepped here by using properties
 * that don't overlap instead of a second nested element.
 *
 * Tooltip show/hide is plain CSS (`group-hover/sticker:opacity-100`,
 * `group-focus-visible/sticker:opacity-100`) — NOT React state. An
 * earlier version drove visibility from onMouseEnter/onFocus state and
 * it was unreliable: state-driven visibility depends on a JS render
 * completing, and confirmed via a debug trace that the handler could go
 * a long time without firing in this dev/test environment (screenshots
 * showed the pure-CSS rotate/scale hover effects working instantly, but
 * the state-driven tooltip never appeared) — matching the same
 * background-tab timer/render throttling this session hit repeatedly
 * elsewhere (Stage 6 pass 2's pull animation, the Gate 6D scroll fix).
 * CSS pseudo-classes aren't subject to that: they're evaluated by the
 * browser engine directly, no JS task queue involved.
 *
 * The one thing CSS :hover/:focus-visible genuinely can't do is respond
 * to a keypress, which WCAG 1.4.13 needs (Escape must dismiss). So a
 * single window-level keydown listener (attached once on mount, not
 * gated behind any "active" state) checks — only at the moment Escape is
 * pressed — whether THIS sticker is currently hovered or focused via
 * `element.matches(':hover')` / `=== document.activeElement`, and if so
 * sets a `dismissed` flag reflected as `data-dismissed` on the wrapper.
 * A plain CSS rule (globals.css) force-hides the tooltip when that
 * attribute is set, overriding the hover/focus-visible rules. Resets on
 * mouseleave/blur so a later hover isn't permanently suppressed.
 */
export function HeroSticker({ sticker, src }: HeroStickerProps) {
  const { label, href, destination, x, y, size, rotate, tip } = sticker;
  const [dismissed, setDismissed] = useState(false);
  const wrapperRef = useRef<HTMLAnchorElement & HTMLSpanElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const el = wrapperRef.current;
      if (!el) return;
      if (el.matches(":hover") || el === document.activeElement) setDismissed(true);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const resetDismissed = () => setDismissed(false);

  const wrapperStyle: React.CSSProperties = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}%`,
    transform: "translate(-50%, -50%)",
    rotate: `${rotate}deg`,
    filter: `drop-shadow(${shadowFor(STICKER_SHADOW_ELEVATION)})`,
  };

  const wrapperClassName = [
    "hero-sticker group/sticker absolute z-10 aspect-square",
    "transition-[rotate,scale] duration-150 ease-out motion-reduce:transition-none",
    "hover:z-30 focus-visible:z-30 hover:rotate-0 focus-visible:rotate-0 hover:scale-[1.09] focus-visible:scale-[1.09]",
  ].join(" ");

  const tooltipText = href ? `${label} ↗` : label;
  const tooltipSideClass = tip === "below" ? "top-full mt-2" : "bottom-full mb-2";

  const tooltip = (
    <span
      role="tooltip"
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${tooltipSideClass} whitespace-nowrap rounded bg-ink px-2 py-1 font-mono text-[11px] text-base opacity-0 transition-opacity duration-150 group-hover/sticker:opacity-100 group-focus-visible/sticker:opacity-100 motion-reduce:transition-none`}
    >
      {tooltipText}
    </span>
  );

  const image = (
    <Image src={src} alt={href ? "" : label} fill sizes="10vw" className="object-contain" />
  );

  if (href) {
    return (
      <a
        ref={wrapperRef}
        href={href}
        aria-label={destination ? `${label}, opens ${destination}` : label}
        className={`${wrapperClassName} cursor-pointer`}
        style={wrapperStyle}
        data-dismissed={dismissed}
        target="_blank"
        rel="noopener noreferrer"
        onMouseLeave={resetDismissed}
        onBlur={resetDismissed}
      >
        {image}
        {tooltip}
      </a>
    );
  }

  return (
    <span
      ref={wrapperRef}
      className={wrapperClassName}
      style={wrapperStyle}
      data-dismissed={dismissed}
      onMouseLeave={resetDismissed}
    >
      {image}
      {tooltip}
    </span>
  );
}
