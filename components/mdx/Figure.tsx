import { FlatFrame } from "@/components/frames/FlatFrame";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** Figure number. When present, prefixes the caption with "Fig. N". */
  number?: number;
}

/**
 * MDX component: <Figure src alt caption number? />
 * A single image with a caption below, via FlatFrame — this is a
 * screenshot/diagram treatment, never PhotoFrame.
 */
export function Figure({ src, alt, caption, number }: FigureProps) {
  return (
    // Shrink-wraps the figure to the image's width, so the caption doesn't stretch full-width.
    <figure className="table mx-auto my-8">
      <FlatFrame src={src} alt={alt} width={800} height={500} fluid />
      {caption || number != null ? (
        <figcaption className="mt-2 text-center font-sans text-sm text-ink-muted">
          {number != null && (
            <span className="mr-2 font-mono text-xs uppercase tracking-wide text-ink-muted">Fig. {number}</span>
          )}
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
