import Image from "next/image";
import { resolveImage, PLACEHOLDER_LABEL } from "@/lib/design/images";

interface FlatFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  /**
   * When true, the frame scales down to fit its container (width/height
   * still set the aspect ratio, preventing layout shift) instead of
   * rendering at a fixed pixel size. Use for MDX body images, which can be
   * wider than the ~68ch prose column; leave false (default) for fixed-size
   * contexts like the /work index thumbnails, where exact dimensions are
   * part of the grid layout.
   */
  fluid?: boolean;
}

/**
 * The site's SCREENSHOT / DIAGRAM / FIGURE treatment: plain hairline
 * border (--color-rule), no rotation, no shadow.
 *
 * For screenshots, diagrams, and other non-photo figures only — never for
 * photographs; those use PhotoFrame. This is a deliberately separate
 * component from PhotoFrame, not a `variant` prop on one shared component —
 * that separation is what stops a screenshot from ending up in a polaroid
 * by accident.
 */
export function FlatFrame({ src, alt, width, height, caption, className = "", fluid = false }: FlatFrameProps) {
  const { src: resolvedSrc, isPlaceholder } = resolveImage(src);
  const fluidStyle = fluid ? { maxWidth: "100%", width: "100%", aspectRatio: `${width} / ${height}` } : undefined;

  return (
    <figure className={`inline-block border border-rule ${className}`} style={fluid ? { maxWidth: "100%" } : undefined}>
      {isPlaceholder ? (
        // grain here only, not on the outer <figure> — this branch is
        // the sole flat-fill surface FlatFrame ever shows (the real-image
        // branch below stays crisp on purpose; screenshots/diagrams
        // shouldn't get a film-grain treatment). `relative` added
        // alongside it since this div has no positioning context of its
        // own otherwise.
        <div
          className="relative flex items-center justify-center bg-raised grain font-mono text-[10px] uppercase tracking-wide text-ink-muted"
          style={fluidStyle ?? { width, height }}
        >
          {PLACEHOLDER_LABEL}
        </div>
      ) : (
        <Image
          src={resolvedSrc as string}
          alt={alt}
          width={width}
          height={height}
          className="block"
          style={fluid ? { maxWidth: "100%", width: "100%", height: "auto" } : undefined}
        />
      )}
      {caption ? (
        <figcaption className="border-t border-rule px-2 py-1 text-left font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
