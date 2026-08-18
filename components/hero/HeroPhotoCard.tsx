import Image from "next/image";
import { resolveImage, PLACEHOLDER_LABEL } from "@/lib/design/images";
import { shadowFor } from "@/lib/design/light";
import type { HeroPhoto } from "@/lib/design/hero-photos";
import type { HeroStackOffset } from "@/lib/design/hero-stack";

const PHOTO_SIZE = 140;

interface HeroPhotoCardProps {
  photo: HeroPhoto;
  offset: HeroStackOffset;
}

/**
 * One card in the hero photo stack.
 *
 * DELIBERATELY two nested elements, per spec — this is the detail that
 * fails silently if missed:
 *
 * - Outer div: a pure positioning proxy. `transform` (translate + rotate)
 *   and `zIndex` are set here — in Pass 1 from the static HERO_STACK_OFFSETS
 *   config, in Pass 2 additionally from JS state during the pull-out. No
 *   visual styling of its own.
 * - Inner div: the actual visible card — cream frame, bottom-weighted
 *   padding, LIGHT-derived shadow, caption. Pass 2's CSS hover lift will
 *   target THIS element.
 *
 * Why the split matters: if the positional transform and the hover
 * transform both targeted the SAME element, the outer's inline
 * `style.transform` would always win over any class-based `:hover` rule —
 * inline style beats a class selector regardless of pseudo-class, with no
 * console error and correct-looking values in devtools (the CSS rule is
 * right there, it's just never applied). Two separate elements means two
 * independent `transform` properties — nothing to conflict with, since
 * the browser composes the outer's and inner's transforms naturally.
 */
export function HeroPhotoCard({ photo, offset }: HeroPhotoCardProps) {
  const { src, isPlaceholder } = resolveImage(photo.src);

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg)`,
        zIndex: offset.z,
      }}
    >
      <div className="bg-raised pt-[7px] pr-[7px] pb-[21px] pl-[7px]" style={{ boxShadow: shadowFor(1) }}>
        {isPlaceholder ? (
          <div
            className="flex items-center justify-center bg-base font-mono text-[10px] uppercase tracking-wide text-ink-muted"
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          >
            {PLACEHOLDER_LABEL}
          </div>
        ) : (
          <Image
            src={src as string}
            alt={photo.alt}
            width={PHOTO_SIZE}
            height={PHOTO_SIZE}
            className="block object-cover"
          />
        )}
        <p className="mt-1 text-left font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}
