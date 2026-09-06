import { FlatFrame } from "@/components/frames/FlatFrame";

interface ImagePairProps {
  a: string;
  b: string;
  caption?: string;
  /** Alt text for each image; defaults to empty (decorative). */
  altA?: string;
  altB?: string;
}

/**
 * MDX component: <ImagePair a b caption? /> — two images side by side,
 * stacking to one column on mobile. Both go through FlatFrame.
 */
export function ImagePair({ a, b, caption, altA = "", altB = "" }: ImagePairProps) {
  return (
    <figure className="my-8">
      <div className="flex flex-col gap-4 sm:flex-row">
        <FlatFrame src={a} alt={altA} width={400} height={300} fluid className="min-w-0 sm:flex-1" />
        <FlatFrame src={b} alt={altB} width={400} height={300} fluid className="min-w-0 sm:flex-1" />
      </div>
      {caption ? <figcaption className="mt-2 font-sans text-sm text-ink-muted">{caption}</figcaption> : null}
    </figure>
  );
}
