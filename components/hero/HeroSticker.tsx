"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { shadowFor } from "@/lib/design/light";
import type { HeroSticker as HeroStickerConfig } from "@/lib/design/hero-stickers";

/** Lighter shadow than the polaroids': same LIGHT config, reduced elevation. */
const STICKER_SHADOW_ELEVATION = 0.4;

interface HeroStickerProps {
  sticker: HeroStickerConfig;
  /** Pre-resolved server-side in NotebookHero; missing files are filtered out before mounting. */
  src: string;
}

/**
 * One hobby sticker.
 *
 * Positioning uses inline `transform: translate(-50%, -50%)` for
 * centering plus a separate inline `rotate` property for the resting
 * rotation, so hover/focus-visible's `rotate-0`/`scale-[1.09]` utilities
 * can override rotation/scale without touching the centering transform.
 *
 * Tooltip show/hide is plain CSS (group-hover/group-focus-visible), not
 * React state. A window-level keydown listener handles Escape-to-dismiss
 * (WCAG 1.4.13), setting `data-dismissed` on the wrapper, which a CSS
 * rule (globals.css) uses to force-hide the tooltip. Resets on
 * mouseleave/blur.
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
