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
 * Zone 1 of the landing page: the notebook spread hero. 100vh; SiteNav
 * hides itself here and reveals once scrolled past #hero-sentinel.
 *
 * Server component — resolves the photos against the filesystem and
 * passes the plain data down to HeroPhotoStack, the "use client" piece
 * that handles the interaction.
 */
export function NotebookHero() {
  const softwareCount = getProjectsByKind("software").length;
  const researchCount = getProjectsByKind("research").length;
  // Skip the photo layer entirely if the file is missing.
  const deskPhoto = resolveImage("/images/hero/desk-bg.jpg");
  const resolvedPhotos = HERO_PHOTOS.map((photo) => {
    const { src, isPlaceholder } = resolveImage(photo.src);
    return { src, isPlaceholder, caption: photo.caption, alt: photo.alt };
  });
  // Filter out stickers whose image file is missing.
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
      {/* Desk zone: the desk photo, behind the notebook (-z-10). The
          .hero-desk-mask class (globals.css) fades the photo's alpha
          toward the bottom of the hero, leaving left/right/top full
          opacity. */}
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

      {/* The notebook object: dark cover, visible as a border via padding.
          Width scales with the viewport; interior content (fonts, photo
          sizes, spacing) stays fixed regardless of notebook size. */}
      <div
        className="relative bg-[#3b2a1f] p-2"
        style={{ width: "min(72vw, 850px)", aspectRatio: "520 / 372" }}
      >
        <div className="grid h-full grid-cols-[1fr_2px_1fr]">
          {/* Left page: photo stack. Containing block for the stack's
              absolute positioning. `notebook-page-left` (globals.css)
              rounds the spine-side corners and draws the outer-edge
              paper-thickness strip. No `grain` here — this page reads as
              a plain photo surface, not paper stock. */}
          <div className="relative notebook-page-left bg-raised">
            <HeroPhotoStack photos={resolvedPhotos} />
            {/* Hobby stickers, positioned above/below the stack's hit
                area so they never overlap it. */}
            {resolvedStickers.map(({ sticker, src }) => (
              <HeroSticker key={sticker.src} sticker={sticker} src={src} />
            ))}
          </div>

          {/* Gutter / spine: gradient simulating light catching the
              raised fold, darkest at each page's edge. */}
          <div
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to right, color-mix(in srgb, var(--color-ink) 42%, transparent), color-mix(in srgb, var(--color-ink) 10%, transparent), color-mix(in srgb, var(--color-ink) 42%, transparent))",
            }}
          />

          {/* Right page: identity. `notebook-page-right` (globals.css)
              rounds the outer corners and draws the paper-thickness strip
              on the right edge. Flex column: identity block (`my-auto`,
              vertically centered) above the icon row + scroll cue, which
              stays pinned to the bottom. */}
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
