import { FlatFrame } from "@/components/frames/FlatFrame";

interface FullBleedProps {
  src: string;
  alt: string;
}

/**
 * MDX component: <FullBleed src alt /> — breaks the image out of the
 * ~68ch prose measure into the full article container (matching <main>'s
 * own max-w-5xl px-6, not the raw viewport — this is a project page
 * inside a site with nav/footer either side, not a magazine spread).
 *
 * Standard breakout trick: relative left-1/2 + -translate-x-1/2 + w-screen
 * escapes any ancestor max-width, then the inner div re-caps to the
 * article's own width so it lines up with everything else on the page.
 *
 * That re-cap width is a hardcoded duplicate of <main>'s own max-width in
 * app/work/[slug]/page.tsx, not derived from it (the breakout trick means
 * this can't just inherit <main>'s max-width normally — w-screen escapes
 * it first) — the two must be kept in sync by hand. This already drifted
 * out of sync once: <main> moved from max-w-3xl to max-w-5xl to match the
 * /work index's width, and this stayed at max-w-3xl, so any project using
 * <FullBleed> (e.g. goignite.mdx) kept rendering that image at the old,
 * narrower width even though the rest of the page had widened.
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
