import { getProjectsByKind } from "@/lib/projects";
import { resolveImage } from "@/lib/design/images";
import { HERO_PHOTOS } from "@/lib/design/hero-photos";
import { HeroPhotoStack } from "@/components/hero/HeroPhotoStack";
import { HandwrittenName } from "@/components/hero/HandwrittenName";
import { TYPE } from "@/lib/design/type-scale";

/**
 * Zone 1 of the landing page: the notebook spread. 100vh, nothing visible
 * above the fold but the notebook — SiteNav (Stage 4) hides itself here
 * via the #hero-sentinel marker at the bottom of this component, reveals
 * once scrolled past. This is a single designed OBJECT, not a
 * conventional page section — that framing stops here and does not carry
 * into interior pages.
 *
 * PASS 2 (this): the interaction lives in HeroPhotoStack, a "use client"
 * component — the only part of this hero that needs to be. This
 * component (NotebookHero) stays a server component; it resolves the
 * four photos against the filesystem here (resolveImage reads fs, which
 * can't run in client-bundled code) and passes the plain resolved data
 * down as props.
 *
 * See HeroPhotoStack's own doc comment for exactly how the two
 * required-explicit-check items from the spec are satisfied:
 * 1. Two nested elements per card (HeroPhotoCard) so the positional
 *    transform and the hover transform never target the same element.
 * 2. No overflow:hidden anywhere, and the stack's <button> carries an
 *    explicit, permanent z-index so it reliably outranks the right
 *    page's content even once its own hover-triggered transform makes it
 *    a stacking context.
 *
 * Desk (#e7dbc6) and cover (#3b2a1f) are intentional one-off colors
 * scoped to this component only — not added as global palette tokens in
 * globals.css, since they have exactly one consumer (this physical-object
 * metaphor) and aren't meant to be reused as UI colors elsewhere.
 */
export function NotebookHero() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;
  const resolvedPhotos = HERO_PHOTOS.map((photo) => {
    const { src, isPlaceholder } = resolveImage(photo.src);
    return { src, isPlaceholder, caption: photo.caption, alt: photo.alt };
  });

  return (
    <section aria-label="Introduction" className="relative flex h-screen w-full items-center justify-center bg-[#e7dbc6] px-4">
      {/* The notebook object: dark cover, ~8px visible as a border via padding.
          Max width capped at 520px (the spec's own reference size, not an
          arbitrary choice) — the pull-out animation's fixed 74px offset
          (HeroPhotoStack) needs to actually reach the page's right edge to
          cross the gutter. Verified: at width > ~622px the resting card's
          margin from the page edge exceeds 74px and the pull silently stops
          short of the boundary — this cap keeps every supported viewport
          width comfortably under that threshold. */}
      <div
        className="relative bg-[#3b2a1f] p-2"
        style={{ width: "clamp(380px, 38vw, 520px)", aspectRatio: "520 / 372" }}
      >
        <div className="grid h-full grid-cols-[1fr_2px_1fr]">
          {/* Left page: photo stack. position:relative makes this the
              containing block for the stack's absolute positioning — it
              deliberately has no z-index of its own (stays auto), so it
              never competes with the stack <button>'s explicit z-20. */}
          <div className="relative bg-raised">
            <HeroPhotoStack photos={resolvedPhotos} />
          </div>

          {/* Gutter / spine */}
          <div aria-hidden="true" style={{ background: "color-mix(in srgb, var(--color-ink) 17%, transparent)" }} />

          {/* Right page: identity. No z-index here either — stays at the
              stacking-context default, so the stack's z-20 (see
              HeroPhotoStack) reliably renders above this during the pull. */}
          <div className="flex flex-col justify-center bg-raised px-6 py-6 sm:px-10">
            <p className={TYPE.meta}>Portfolio 2026</p>
            <HandwrittenName />
            <div aria-hidden="true" className="mt-1 w-24 rounded-full bg-accent" />
            <p className={`${TYPE.body} mt-4 text-ink`}>
              Software engineer and researcher building at the intersection of both.
            </p>
            <div className="mt-6 border-t border-rule pt-4">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-accent">Software</span>
                <span className="font-mono text-xs text-ink-muted">{softwareCount}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-support">Research</span>
                <span className="font-mono text-xs text-ink-muted">{researchCount}</span>
              </div>
            </div>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-wide text-ink-muted">Scroll to turn the page</p>
          </div>
        </div>
      </div>

      {/* SiteNav (Stage 4) watches this via IntersectionObserver to know when the hero has scrolled past. */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />
    </section>
  );
}
