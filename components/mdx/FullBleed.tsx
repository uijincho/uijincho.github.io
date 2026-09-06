import { FlatFrame } from "@/components/frames/FlatFrame";

interface FullBleedProps {
  src: string;
  alt: string;
}

/**
 * MDX component: <FullBleed src alt /> — breaks the image out of the
 * prose measure into the full article container width (not the raw
 * viewport). Uses the standard relative/left-1/2/-translate-x-1/2/
 * w-screen breakout trick, then re-caps the inner div to the article's
 * own max-width.
 */
export function FullBleed({ src, alt }: FullBleedProps) {
  return (
    <div className="relative left-1/2 my-8 w-screen -translate-x-1/2">
      <div className="mx-auto max-w-4xl px-6">
        <FlatFrame src={src} alt={alt} width={1200} height={675} fluid className="w-full" />
      </div>
    </div>
  );
}
