import { getProjectsByKind } from "@/lib/projects";
import { HERO_PHOTOS } from "@/lib/design/hero-photos";
import { HERO_STACK_OFFSETS } from "@/lib/design/hero-stack";
import { HeroPhotoCard } from "@/components/hero/HeroPhotoCard";
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
 * PASS 1 (this): static layout only, zero interaction — no hover, no
 * click, no JS state. Pass 2 adds the hover lift and click-to-cycle
 * behavior on top of this same structure.
 *
 * Two things from the spec that fail silently if missed, both already
 * accounted for in this static structure so Pass 2 doesn't need to
 * restructure anything:
 *
 * 1. Two nested elements per card (see HeroPhotoCard's own doc comment)
 *    — outer div for the positional transform, inner div for Pass 2's
 *    hover transform. Same element for both would mean the outer's
 *    inline style silently wins over the CSS hover rule.
 * 2. No overflow:hidden anywhere on the pages. The left page has
 *    position:relative (a containing block for the cards' absolute
 *    positioning) but deliberately no z-index of its own, and the right
 *    page has no z-index either — neither creates its own stacking
 *    context, so the cards' explicit z-index (7-10, set per offset) is
 *    guaranteed to compare directly against the right page's content
 *    (which sits at the stacking-context default) rather than being
 *    trapped inside a page-local context. That's what lets Pass 2's
 *    74px pull carry a card visibly over the gutter and the right page
 *    instead of behind it. If clipping ever turns out to be needed, it
 *    goes on the notebook wrapper, never on either page.
 *
 * Desk (#e7dbc6) and cover (#3b2a1f) are intentional one-off colors
 * scoped to this component only — not added as global palette tokens in
 * globals.css, since they have exactly one consumer (this physical-object
 * metaphor) and aren't meant to be reused as UI colors elsewhere.
 */
export function NotebookHero() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;

  return (
    <section aria-label="Introduction" className="relative flex h-screen w-full items-center justify-center bg-[#e7dbc6] px-4">
      {/* The notebook object: dark cover, ~8px visible as a border via padding */}
      <div
        className="relative bg-[#3b2a1f] p-2"
        style={{ width: "clamp(380px, 44vw, 720px)", aspectRatio: "520 / 372" }}
      >
        <div className="grid h-full grid-cols-[1fr_2px_1fr]">
          {/* Left page: photo stack, resting offsets only (Pass 1) */}
          <div className="relative bg-raised">
            {HERO_PHOTOS.map((photo, i) => (
              <HeroPhotoCard key={photo.src} photo={photo} offset={HERO_STACK_OFFSETS[i % HERO_STACK_OFFSETS.length]} />
            ))}
          </div>

          {/* Gutter / spine */}
          <div aria-hidden="true" style={{ background: "color-mix(in srgb, var(--color-ink) 17%, transparent)" }} />

          {/* Right page: identity */}
          <div className="flex flex-col justify-center bg-raised px-6 py-6 sm:px-10">
            <p className={TYPE.meta}>Portfolio 2026</p>
            <HandwrittenName />
            <div aria-hidden="true" className="mt-1 h-[3px] w-24 rounded-full bg-accent" />
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
