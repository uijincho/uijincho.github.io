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
  /** Shadow intensity multiplier; 1 = resting. Higher lifts it further off the page. */
  elevation?: number;
  className?: string;
}

/**
 * The site's PHOTOGRAPH treatment: cream frame, bottom-weighted caption
 * padding, fixed rotation (from ROTATIONS, via rotationIndex), single-
 * light-source drop shadow (from LIGHT, via shadowFor).
 *
 * For real photographs only — me, workspace, lab. Never for screenshots
 * or diagrams; those use FlatFrame. This is a deliberately separate
 * component from FlatFrame, not a `variant` prop on one shared component —
 * that separation is what stops a screenshot from ending up in a polaroid
 * by accident.
 */
export function PhotoFrame({
  src,
  alt,
  width,
  height,
  caption,
  rotationIndex,
  elevation = 1,
  className = "",
}: PhotoFrameProps) {
  const rotation = rotationForIndex(rotationIndex);
  const { src: resolvedSrc, isPlaceholder } = resolveImage(src);

  return (
    <figure
      className={`inline-block select-none bg-raised px-[7px] pt-[7px] pb-[21px] ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
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
