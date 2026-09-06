import Image from "next/image";
import { rotationForIndex } from "@/lib/design/rotation";
import { shadowFor } from "@/lib/design/light";
import { resolveImage, PLACEHOLDER_LABEL } from "@/lib/design/images";

interface PhotoFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Index into the shared ROTATIONS array — never a random value. */
  rotationIndex: number;
  /** Set false to render flat, with no rotation transform at all. */
  rotate?: boolean;
  /** Shadow intensity multiplier; 1 = resting. Higher lifts it further off the page. */
  elevation?: number;
  className?: string;
}

/**
 * Photograph frame: cream frame, bottom-weighted caption padding, fixed
 * rotation (from ROTATIONS), drop shadow (from LIGHT), grain texture.
 * For real photographs only; screenshots/diagrams use FlatFrame.
 */
export function PhotoFrame({
  src,
  alt,
  width,
  height,
  caption,
  rotationIndex,
  rotate = true,
  elevation = 1,
  className = "",
}: PhotoFrameProps) {
  const rotation = rotationForIndex(rotationIndex);
  const { src: resolvedSrc, isPlaceholder } = resolveImage(src);

  return (
    <figure
      className={`relative inline-block select-none grain bg-raised px-[7px] pt-[7px] pb-[21px] ${className}`}
      style={{
        transform: rotate ? `rotate(${rotation}deg)` : undefined,
        boxShadow: shadowFor(elevation),
      }}
    >
      {isPlaceholder ? (
        <div
          className="flex items-center justify-center bg-base font-mono text-[10px] uppercase tracking-wide text-ink-muted"
          style={{ width, height }}
        >
          {PLACEHOLDER_LABEL}
        </div>
      ) : (
        <Image src={resolvedSrc as string} alt={alt} width={width} height={height} className="block" />
      )}
      {caption ? (
        <figcaption className="mt-1 text-left font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
