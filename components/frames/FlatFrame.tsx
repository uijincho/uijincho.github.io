import Image from "next/image";
import { resolveImage, PLACEHOLDER_LABEL } from "@/lib/design/images";

interface FlatFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  className?: string;
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
export function FlatFrame({ src, alt, width, height, caption, className = "" }: FlatFrameProps) {
  const { src: resolvedSrc, isPlaceholder } = resolveImage(src);

  return (
    <figure className={`inline-block border border-rule ${className}`}>
      {isPlaceholder ? (
        <div
          className="flex items-center justify-center bg-raised font-mono text-[10px] uppercase tracking-wide text-ink-muted"
          style={{ width, height }}
        >
          {PLACEHOLDER_LABEL}
        </div>
      ) : (
        <Image src={resolvedSrc as string} alt={alt} width={width} height={height} className="block" />
      )}
      {caption ? (
        <figcaption className="border-t border-rule px-2 py-1 text-left font-mono text-[11px] uppercase tracking-wide text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
