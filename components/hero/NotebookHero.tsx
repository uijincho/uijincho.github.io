import { getProjectsByKind } from "@/lib/projects";
import { resolveImage } from "@/lib/design/images";
import { HERO_PHOTOS } from "@/lib/design/hero-photos";
import { HERO_STICKERS } from "@/lib/design/hero-stickers";
import { HeroPhotoStack } from "@/components/hero/HeroPhotoStack";
import { HeroSticker } from "@/components/hero/HeroSticker";
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
  // Missing sticker files render nothing at all (no placeholder box, no
  // broken-image icon) — filtered out here, server-side, rather than
  // handled in the client component, so HeroSticker never has to know
  // about the "missing" case.
  const resolvedStickers = HERO_STICKERS.flatMap((sticker) => {
    const { src, isPlaceholder } = resolveImage(sticker.src);
    if (isPlaceholder || !src) return [];
    return [{ sticker, src }];
  });

  return (
    <section aria-label="Introduction" className="relative flex h-screen w-full items-center justify-center bg-[#e7dbc6] px-4">
      {/* The notebook object: dark cover, ~8px visible as a border via padding.
          Width scales with the viewport (min(66vw, 850px), scaled down from
          an earlier min(92vw, 1100px) pass that read too large — desk
          margin should read as a frame, not a half-empty page) but interior
          content does NOT — fonts, photo dimensions, and all spacing inside
          the pages stay in their fixed px/rem values regardless of how big
          the notebook gets. Growing/shrinking the notebook changes how much
          breathing room surrounds unchanged-size content, not the content's
          own size.

          Known trade-off, not an oversight: HeroPhotoStack's pull-out
          offset is a fixed 74px (per spec, and per the instruction that
          interior spacing stays fixed). At the top of this range the page
          is wide enough that 74px doesn't reach the gutter the way it did
          at the original ~520px reference size — the crossing effect is
          strongest near the md breakpoint and becomes a smaller fraction of
          the page at wider ones. Not compensating by scaling the pull
          distance, since that would itself be exactly the kind of
          interior-content scaling this change rules out. */}
      <div
        className="relative bg-[#3b2a1f] p-2"
        style={{ width: "min(72vw, 850px)", aspectRatio: "520 / 372" }}
      >
        <div className="grid h-full grid-cols-[1fr_2px_1fr]">
          {/* Left page: photo stack. position:relative makes this the
              containing block for the stack's absolute positioning — it
              deliberately has no z-index of its own (stays auto), so it
              never competes with the stack <button>'s explicit z-20. */}
          <div className="relative bg-raised">
            <HeroPhotoStack photos={resolvedPhotos} />
            {/* Hobby stickers. Positioned in the bands above/below the
                stack's ~200x206 hit area (HeroPhotoStack's STACK_HIT_*),
                never overlapping it — an interactive sticker over the
                stack's <button> would either swallow its clicks or have
                its own swallowed, and there's no CSS fix once both need
                pointer events. That hit area used to be the button's
                actual size too (`inset-0`, the full left page) — fixed to
                match this comment's original intent rather than the
                comment matching the code. */}
            {resolvedStickers.map(({ sticker, src }) => (
              <HeroSticker key={sticker.src} sticker={sticker} src={src} />
            ))}
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
              applied math + computer science @ Brown
            </p>
            <div className="mt-6 border-t border-rule pt-4">
              {/* change to link jump to research and software sections */}
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-accent">Software</span>
                <span className="font-mono text-xs text-ink-muted">&gt;</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-wide text-support">Research</span>
                <span className="font-mono text-xs text-ink-muted">&gt;</span>
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
