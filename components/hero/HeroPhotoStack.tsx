"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HeroPhotoCard } from "@/components/hero/HeroPhotoCard";
import { HERO_STACK_OFFSETS, type HeroStackOffset } from "@/lib/design/hero-stack";

export interface ResolvedHeroPhoto {
  src: string | null;
  isPlaceholder: boolean;
  caption: string;
  alt: string;
}

/** Where the top card animates to on click, before rejoining the stack at the back. */
const PULL_OFFSET: HeroStackOffset = { x: 74, y: -14, rotate: 9, z: 20 };
const PULL_DURATION_MS = 210;

/**
 * The stack <button>'s hit-area size and center offset — sized to fit
 * the fanned-out card stack, with a few px of slack, not the full page.
 * Centered via left/top + negative margin rather than a translate
 * transform, so it doesn't collide with the hover/focus translate
 * utility classes below.
 */
const STACK_HIT_WIDTH = 200;
const STACK_HIT_HEIGHT = 206;
const STACK_HIT_OFFSET_X = 0;
const STACK_HIT_OFFSET_Y = 2;

/**
 * The interactive photo stack. Client component — the only part of the
 * hero that needs to be. Receives pre-resolved photo data as props (see
 * NotebookHero) rather than resolving images itself.
 *
 * Structure:
 * 1. <button class="group"> wraps the four cards. On hover/focus, the
 *    button itself shifts the whole stack slightly, while the top
 *    card's inner div (HeroPhotoCard's isTop prop) gets an additional
 *    lift via group-hover/group-focus-visible — two independent
 *    transforms on two separate elements.
 * 2. The button carries a permanent explicit z-20 (not auto), so it
 *    reliably outranks the right page's content even while its own
 *    hover transform makes it a new stacking context.
 */
export function HeroPhotoStack({ photos }: { photos: ResolvedHeroPhoto[] }) {
  const [order, setOrder] = useState<number[]>(() => photos.map((_, i) => i));
  const [pulling, setPulling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCycle = useCallback(() => {
    if (pulling) return;
    setPulling(true);

    // Under reduced motion, cycle immediately instead of waiting for a transition that won't play.
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    timeoutRef.current = setTimeout(
      () => {
        setOrder((prev) => [...prev.slice(1), prev[0]]);
        setPulling(false);
      },
      reduced ? 0 : PULL_DURATION_MS
    );
  }, [pulling]);

  const topPhotoNumber = order[0] + 1;

  return (
    <>
      <button
        type="button"
        onClick={handleCycle}
        aria-label="Photo stack. Press to see the next photo."
        className="group absolute z-20 cursor-pointer border-0 bg-transparent p-0 transition-transform duration-150 hover:translate-x-[3px] hover:translate-y-[2px] focus-visible:translate-x-[3px] focus-visible:translate-y-[2px] motion-reduce:transition-none"
        style={{
          left: `calc(50% + ${STACK_HIT_OFFSET_X}px)`,
          top: `calc(50% + ${STACK_HIT_OFFSET_Y}px)`,
          width: STACK_HIT_WIDTH,
          height: STACK_HIT_HEIGHT,
          marginLeft: -(STACK_HIT_WIDTH / 2),
          marginTop: -(STACK_HIT_HEIGHT / 2),
        }}
      >
        {order.map((photoIndex, depth) => {
          const photo = photos[photoIndex];
          const isTop = depth === 0;
          const offset = isTop && pulling ? PULL_OFFSET : HERO_STACK_OFFSETS[depth % HERO_STACK_OFFSETS.length];
          return (
            <HeroPhotoCard
              key={photoIndex}
              src={photo.src}
              isPlaceholder={photo.isPlaceholder}
              alt={photo.alt}
              caption={photo.caption}
              offset={offset}
              isTop={isTop}
              priority
            />
          );
        })}
      </button>

      {/* Photo cards are decorative (aria-hidden in HeroPhotoCard) — this is the accessible description of stack state. */}
      <span className="sr-only" aria-live="polite">
        Photo {topPhotoNumber} of {photos.length}
      </span>
    </>
  );
}
