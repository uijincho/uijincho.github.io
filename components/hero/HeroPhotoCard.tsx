import Image from "next/image";
import { PLACEHOLDER_LABEL } from "@/lib/design/placeholder-label";
import { shadowFor } from "@/lib/design/light";
import type { HeroStackOffset } from "@/lib/design/hero-stack";

const PHOTO_SIZE = 180;

interface HeroPhotoCardProps {
  /** Pre-resolved server-side; this component never touches fs itself. */
  src: string | null;
  isPlaceholder: boolean;
  alt: string;
  caption: string;
  offset: HeroStackOffset;
  /** True only for whichever card sits at depth 0; applies the hover/focus lift. */
  isTop: boolean;
  /** Marks the image as high-priority for LCP; all hero cards pass true. */
  priority?: boolean;
}

/**
 * One card in the hero photo stack.
 *
 * Two nested elements: the outer div positions the card (translate,
 * rotate, z-index from `offset`); the inner div is the visible card
 * (cream frame, shadow, caption) and gets the hover/focus lift when
 * `isTop`. Kept separate so the positional transform and the hover
 * transform don't target the same element.
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
        // Same grain texture as PhotoFrame.
        className={`relative bg-raised pt-[7px] pr-[7px] pb-[21px] pl-[7px] grain transition-transform duration-150 motion-reduce:transition-none ${
          isTop
            ? "group-hover:-translate-y-[9px] group-hover:rotate-[-1.5deg] group-focus-visible:-translate-y-[9px] group-focus-visible:rotate-[-1.5deg]"
            : ""
        }`}
        // Fixed width (photo + left/right padding) keeps the card the same size at every notebook size.
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
            // Pins both dimensions explicitly (object-cover crops to fit).
            style={{ width: PHOTO_SIZE, height: PHOTO_SIZE }}
          />
        )}
        <p className="mt-1 text-center font-mono text-[11px] tracking-wide text-ink-muted">{caption}</p>
      </div>
    </div>
  );
}
