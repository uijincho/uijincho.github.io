import Image from "next/image";
import { getProjectsByKind } from "@/lib/projects";
import { resolveImage } from "@/lib/design/images";
import { HERO_PHOTOS } from "@/lib/design/hero-photos";
import { HERO_STICKERS } from "@/lib/design/hero-stickers";
import { HeroPhotoStack } from "@/components/hero/HeroPhotoStack";
import { HeroSticker } from "@/components/hero/HeroSticker";
import { HandwrittenName } from "@/components/hero/HandwrittenName";
import { ContactIcons } from "@/components/ContactIcons";
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
 * Cover (#3b2a1f) is an intentional one-off color scoped to this
 * component only — not added as a global palette token in globals.css,
 * since it has exactly one consumer (this physical-object metaphor) and
 * isn't meant to be reused as a UI color elsewhere.
 *
 * The desk zone used to be a separate flat --color-desk fill (a LOCAL
 * custom property, one-off value matching --color-base) sitting under
 * the photo, with its own `grain` instance so the fallback band revealed
 * by .hero-desk-mask's fade had texture too. That was removed: it was a
 * SECOND, independent `.grain` instance (its own ::before, its own noise
 * origin at that div's box) stacked directly over body's own `grain`
 * layer — two noise patterns that don't tile continuously with each
 * other no matter how well their color/opacity match, which is what the
 * hard seam at the fade's bottom edge actually was (see .hero-desk-mask's
 * comment in globals.css for the full history; an earlier fix eased the
 * mask's alpha ramp on the theory the seam was a color/alpha
 * discontinuity — it wasn't, and didn't help). Since --color-desk was
 * already confirmed identical to --color-base, dropping the div's own
 * fill+grain entirely costs nothing visually: <main> (app/page.tsx) and
 * this <section> are both plain `position: relative` with no background
 * of their own, so body's single grain layer (app/layout.tsx) already
 * sits directly behind this whole zone and now shows through for real,
 * one noise pattern instead of two — including the missing-photo
 * fallback case, which today is just body's own layer with nothing
 * painted over it. The photo layer alone remains, fading out via
 * .hero-desk-mask (globals.css) toward the bottom of the hero — left,
 * right, and top stay at full photo opacity (a linear, bottom-only
 * fade, not a vignette on all four sides). See that class's own comment
 * for why the mask lives on the <img> itself. It sits at -z-10 — behind
 * the notebook (position:relative, z-index:auto) and the #hero-sentinel
 * marker, without touching either's own z-index. Purely an edge
 * treatment within the existing desk zone: doesn't change the section's
 * height or bleed into the page below.
 */
export function NotebookHero() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;
  // Missing file → skip the photo layer entirely (body's own base color
  // + grain show through underneath, nothing rendered here to fall back
  // to), same "render nothing, no broken-image icon" convention as the
  // stickers below.
  const deskPhoto = resolveImage("/images/hero/desk-bg.jpg");
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
    <section
      aria-label="Introduction"
      className="relative flex h-screen w-full items-center justify-center px-4"
    >
      {/* Desk zone: just the photo now, behind the notebook (-z-10), with
          .hero-desk-mask (globals.css) applied directly to the <img> — a
          linear mask-image that fades the photo's own alpha toward the
          bottom of the hero only, so whatever is behind it shows through
          there while the left/right/top edges stay full-opacity photo.
          The wrapping div is inset-0 across the full hero section (not
          just the photo's visible extent), so the mask has nowhere to
          clip before its gradient finishes.

          There used to be a separate flat --color-desk fill + its own
          `grain` instance under the photo here, standing in both for the
          fallback shown through the fade and for the missing-photo case.
          Removed — it was a second, independently-generated grain layer
          sitting directly in front of body's own (app/layout.tsx), and
          two noise patterns never tile continuously across an element
          boundary even with matching color/opacity; that mismatch was
          the hard seam reported at the fade's bottom edge, not a
          color/alpha discontinuity (see globals.css's .hero-desk-mask
          comment for the full history). --color-desk was already
          confirmed identical to --color-base, so nothing behind the
          photo needs its own copy of either the color or the texture:
          <main> and this <section> are plain `position: relative` with
          no background of their own, so body's single grain layer
          already sits directly behind this whole zone (and shows
          through as-is in the missing-photo case too). */}
      {deskPhoto.src && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={deskPhoto.src}
            alt=""
            fill
            priority
            sizes="1600px"
            className="hero-desk-mask object-cover"
          />
        </div>
      )}

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
              never competes with the stack <button>'s explicit z-20.
              `notebook-page-left` (globals.css) rounds this page's two
              outer corners (top-left/bottom-left — the spine-side corners
              stay square) and draws the outer-edge paper-thickness strip;
              its ::after carries pointer-events:none, so it never
              intercepts the stack button's or stickers' clicks regardless
              of paint order, and — since it sizes to this div specifically,
              not a larger ancestor — never needs `overflow:hidden` here,
              which would otherwise clip both the stickers positioned in
              the bands above/below the stack's hit area AND the stack's
              own hover pull-out toward the gutter.

              No `grain` here (unlike the right page) — this page is meant
              to read as a plain photo surface, not paper stock; the grain
              texture is what distinguishes the "writing" page from this
              one, not a shared base treatment both pages carry. */}
          <div className="relative notebook-page-left bg-raised">
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

          {/* Gutter / spine. A gradient, not a flat fill — dark → light →
              dark, left to right, all still --color-ink at varying
              opacity (never a new hue) — simulating light catching the
              raised fold, darkest right at each page's edge and lightest
              at the spine's own center. */}
          <div
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 42%, transparent), color-mix(in srgb, var(--color-ink) 10%, transparent), color-mix(in srgb, var(--color-ink) 42%, transparent))",
            }}
          />

          {/* Right page: identity. No z-index here either — stays at the
              stacking-context default, so the stack's z-20 (see
              HeroPhotoStack) reliably renders above this during the pull.
              `relative` (this div had no position of its own before) is
              what gives `grain`'s ::before and `notebook-page-right`'s
              ::after this div, not some further-out ancestor, as their
              inset:0/edge positioning context. `notebook-page-right`
              rounds this page's two outer corners (top-right/bottom-right)
              and draws the outer-edge paper-thickness strip on the right
              edge only — never the spine-side (left) edge.

              Content below is one flex column split into two groups: the
              identity block (`my-auto`) and the icon row + scroll cue
              (plain, last). Flex auto-margins on only the first group's
              top+bottom consume 100% of whatever vertical space isn't
              taken by either group, split evenly — which centers the
              identity block within the space ABOVE the second group while
              pinning that second group flush to this column's own bottom
              edge (its height already comes from CSS Grid's default
              stretch, via the parent grid). That's what keeps the icon
              row + "Scroll to turn the page" pinned toward the bottom
              instead of the whole block sitting top-anchored with empty
              space left below it, while still giving the identity block
              itself the same vertical-centering treatment it already had
              (previously via `justify-center` on this whole column, which
              centered everything as one clump — including the icon row —
              rather than pinning the icon row separately). */}
          <div className="relative flex flex-col bg-raised grain notebook-page-right px-6 py-6 sm:px-10">
            <div className="my-auto">
              <p className={TYPE.meta}>Portfolio 2026</p>
              <HandwrittenName />
              <p className={`${TYPE.body} mt-4 text-ink`}>
                Applied Math + Computer Science @ Brown
              </p>
              <div className="mt-6 border-t border-rule pt-4">
                <a href="#section-software" className="group flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-wide text-accent group-hover:underline">
                    Software
                  </span>
                  <span className="font-mono text-xs text-ink-muted">&gt;</span>
                </a>
                <a href="#section-research" className="group mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-xs uppercase tracking-wide text-support group-hover:underline">
                    Research
                  </span>
                  <span className="font-mono text-xs text-ink-muted">&gt;</span>
                </a>
              </div>
            </div>
            <div>
              <ContactIcons />
              <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                Scroll to turn the page
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SiteNav (Stage 4) watches this via IntersectionObserver to know when the hero has scrolled past. */}
      <div id="hero-sentinel" aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />
    </section>
  );
}
