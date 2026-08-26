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
 * The stack <button>'s own hit-area size and center offset — deliberately
 * NOT `inset-0` (that was the actual bug: the button used to fill the
 * entire left page, so its click radius silently ate the stickers' click
 * radius in the bands above/below it, even though the sticker-placement
 * comments elsewhere already described a smaller intended hit area that
 * the button itself never enforced).
 *
 * Derived from the card geometry, not eyeballed: each card is a
 * PHOTO_SIZE+14 × (PHOTO_SIZE+7+21) = 154×168px box (HeroPhotoCard),
 * centered at HERO_STACK_OFFSETS[depth] and rotated by that depth's
 * `rotate` around its own center. Rotating a 154×168 box by θ grows its
 * axis-aligned footprint to (154·|cosθ|+168·|sinθ|) × (154·|sinθ|+168·|cosθ|).
 * Union that footprint across all four depths/offsets/rotations and the
 * result is a ~182×190px box whose center sits ~(10.5, 7.5)px off the
 * button's own (0,0) origin — the stack fans out down-and-right, so its
 * visual center isn't the origin depth-0 sits at. STACK_HIT_* below is
 * that box rounded up with a few px of slack on each side ("slightly
 * larger than the polaroids"), not the full page.
 *
 * Centered via left/top + negative margin, NOT a translate(-50%,-50%)
 * transform, so it doesn't collide with the hover/focus-visible
 * translate-x/y utility classes below — those and any centering
 * transform would fight over the same underlying CSS custom property
 * (the "inline style beats a class" trap, same family of bug as the
 * sticker/card transform splits elsewhere in this feature).
 */
const STACK_HIT_WIDTH = 200;
const STACK_HIT_HEIGHT = 206;
const STACK_HIT_OFFSET_X = 0;
const STACK_HIT_OFFSET_Y = 2;

/**
 * The interactive photo stack. Client component — this is the ONLY part
 * of the hero that needs to be, hence it's a separate component from
 * NotebookHero (server) rather than making the whole hero client-side.
 *
 * Receives pre-resolved photo data as props (see NotebookHero) rather
 * than resolving images itself — resolveImage() reads the filesystem,
 * which can't run in client-bundled code.
 *
 * Structure, matching the two required-explicit-check items from the
 * spec:
 *
 * 1. <button class="group"> wraps the four cards. Its own hover/
 *    focus-visible state drives TWO independent things, each on its own
 *    element so neither can silently override the other:
 *      - The button's OWN transform shifts the whole stack by (3px, 2px)
 *        on hover/focus-visible — this is a plain Tailwind hover:/
 *        focus-visible: class, nothing to compose with (the button has
 *        no resting transform of its own; centering/sizing of the hit
 *        area comes from inline left/top/width/height/margin on the
 *        button, not from a transform, so there's no base value the
 *        hover rule could clobber — see STACK_HIT_* above).
 *      - The top card's INNER div gets an ADDITIONAL lift via Tailwind's
 *        group-hover:/group-focus-visible: variants, targeting only that
 *        one nested element (HeroPhotoCard's isTop prop).
 *    Card outers' own JS-driven positional transform (translate + rotate
 *    per depth, or the pull-out offset) is untouched by any of this —
 *    three separate elements, three independent `transform` properties.
 *
 * 2. The button is `position:absolute` (sized/centered via inline style,
 *    see STACK_HIT_* above) with an explicit `z-20` — not auto. This
 *    matters specifically because the button also gains a
 *    `transform` on hover (see above), and ANY element with an active
 *    transform becomes a new CSS stacking context. Without an explicit
 *    z-index set permanently (not just conditionally on hover), the
 *    button would only sometimes create a stacking context — auto
 *    z-index + position:absolute alone does not, but position:absolute +
 *    active transform does. If that context only existed intermittently
 *    (i.e. only while hovered), the whole stack's paint order relative to
 *    the right page would flip depending on hover state: DOM order (right
 *    page comes after left page in NotebookHero's markup) breaks the tie
 *    for same-stacking-level siblings, which would put the right page ON
 *    TOP of the stack during exactly the moment — hover, mid-interaction —
 *    when the spec needs the opposite. An explicit, permanent z-20 makes
 *    the button a stacking-context root at all times, so it reliably
 *    outranks the right page's content (which stays at the z-index
 *    default) regardless of hover state. Verified live: see the pull
 *    animation crossing the gutter in devtools/screenshot, both while
 *    hovered and not.
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

    // Reduced motion: the transitions are already disabled via CSS
    // (motion-reduce:transition-none on both the outer and inner
    // elements), but the click should still cycle immediately rather
    // than pausing for a transition duration that no longer plays.
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
