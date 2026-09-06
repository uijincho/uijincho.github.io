import Image from "next/image";
import { resolveImage, PLACEHOLDER_LABEL } from "@/lib/design/images";

interface FlatFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
  /** Scales the frame to fit its container instead of a fixed pixel size. */
  fluid?: boolean;
  /** Adds a solid white backing behind the image, for transparent PNGs. */
  whiteBg?: boolean;
}

/**
 * Screenshot/diagram/figure frame: plain hairline border, no rotation,
 * no shadow. Photos use PhotoFrame instead.
 */
export function FlatFrame({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
  fluid = false,
  whiteBg = false,
}: FlatFrameProps) {
  const { src: resolvedSrc, isPlaceholder } = resolveImage(src);
  const fluidStyle = fluid ? { maxWidth: "100%", width: "100%", aspectRatio: `${width} / ${height}` } : undefined;

  return (
    // `table` display so mx-auto centers the shrink-wrapped figure.
    <figure className={`table mx-auto border border-rule ${className}`} style={fluid ? { maxWidth: "100%" } : undefined}>
      {isPlaceholder ? (
        // Placeholder fill shown when the image file is missing.
        <div
          className="relative flex items-center justify-center bg-raised grain font-mono text-[10px] uppercase tracking-wide text-ink-muted"
          style={fluidStyle ?? { width, height }}
        >
          {PLACEHOLDER_LABEL}
        </div>
      ) : (
        // Wrapper sized to the image's rendered box, so a caption below
        // stays off the white backing.
        <div className={whiteBg ? "bg-white" : undefined} style={fluid ? { width: "100%" } : { width, height }}>
          <Image
            src={resolvedSrc as string}
            alt={alt}
            width={width}
            height={height}
            className="block"
            style={fluid ? { maxWidth: "100%", width: "100%", height: "auto" } : undefined}
          />
        </div>
      )}
      {caption ? (
        <figcaption className="border-t border-rule px-2 py-1 text-left font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
