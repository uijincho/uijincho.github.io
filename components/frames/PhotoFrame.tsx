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
  /**
   * Set false to render dead flat (no transform at all, not even
   * rotate(0deg)) instead of the ROTATIONS-derived tilt. The 1-3deg
   * magnitude in lib/design/rotation.ts is "never 0, per spec" as the
   * DEFAULT scattered-photo look — this is the deliberate, explicit
   * opt-out for a call site that wants a square-on portrait instead,
   * not a silent contradiction of that rule.
   */
  rotate?: boolean;
  /** Shadow intensity multiplier; 1 = resting. Higher lifts it further off the page. */
  elevation?: number;
  className?: string;
}

/**
 * The site's PHOTOGRAPH treatment: cream frame, bottom-weighted caption
 * padding, fixed rotation (from ROTATIONS, via rotationIndex), single-
 * light-source drop shadow (from LIGHT, via shadowFor), grain (from the
 * shared `grain` class, globals.css).
 *
 * `grain` sits on this whole outer <figure> — one layer covers both the
 * real-photo branch and the placeholder branch below without duplicating
 * anything per-branch, since it's painted after (on top of) whichever one
 * renders. `relative` added alongside it: this figure was `inline-block`
 * only before, no positioning context of its own for grain's ::after to
 * size against.
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
