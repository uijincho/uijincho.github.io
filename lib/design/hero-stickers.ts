export interface HeroSticker {
  src: string;
  label: string;
  href: string | null;
  /**
   * Only used when href is set — completes the accessible name as
   * "{label}, opens {destination}" (e.g. "Badminton, opens my match log").
   * Kept separate from `label` so the tooltip (which appends its own ↗)
   * and the aria-label (which needs a fuller sentence) can each use the
   * right amount of text.
   */
  destination?: string;
  /** % of the left page's width, center point of the sticker. */
  x: number;
  /** % of the left page's height, center point of the sticker. */
  y: number;
  /** % of the left page's WIDTH (not a fixed px size) — the page scales with the viewport, so this must too. See portfolio-hero-sticker-units memory. */
  size: number;
  rotate: number;
  /** Which side the tooltip opens toward — "below" for the top band, "above" for the bottom band, so it never runs off the page edge. */
  tip: "above" | "below";
}

/**
 * Hobby stickers around the photo stack, left page. Positions are tuned
 * by eye against the page's real dimensions at the current notebook size
 * (measured: ~416x592px at the min(66vw, 850px) cap) — two bands, above
 * and below the stack's hit area (HeroPhotoStack's STACK_HIT_WIDTH /
 * STACK_HIT_HEIGHT, ~200x206px — previously just a comment, now the
 * button's actual enforced size), never in the narrow side margins.
 *
 * Only 4 entries, not 6: of the 5 sticker files that existed in
 * public/images/stickers/, one (reading.png) is a real, copyrighted book
 * cover — excluded, not used as a site asset. The remaining four don't
 * match any hobby-icon naming convention, so labels describe what they
 * actually are rather than inventing a mapping to hobbies that don't
 * exist yet. A mix of linked/unlinked, matching the original spec's
 * intent of exercising both element-type code paths.
 *
 * The above/below separation from the stack's hit area (HeroPhotoStack's
 * STACK_HIT_*, ~200x206px, centered a few px down-right of the page's
 * true center) is vertical only, not horizontal: at y=12/15 (top band)
 * and y=86/83 (bottom band) these stickers sit well outside the hit
 * area's ~34%-69% y-range regardless of x, so x doesn't need its own
 * clearance check. Re-verify this comment's numbers if HERO_STACK_OFFSETS
 * or the card size in HeroPhotoCard ever change — the hit area is derived
 * from those, not from these sticker positions.
 */
export const HERO_STICKERS: HeroSticker[] = [
  {
    src: "/images/stickers/badminton.png",
    label: "i <3 brownubadminton",
    href: null,
    x: 20,
    y: 17,
    size: 17,
    rotate: -10,
    tip: "below",
  },
  {
    src: "/images/stickers/food.png",
    label: "check out my beli",
    href: "https://beliaapp.co/app/RedBeane",
    destination: "my beli account",
    x: 84,
    y: 16,
    size: 18,
    rotate: 8,
    tip: "below",
  },
  {
    src: "/images/stickers/robin.png",
    label: "my dog, Robin",
    href: null,
    x: 22,
    y: 86,
    size: 18,
    rotate: 7,
    tip: "above",
  },
  {
    src: "/images/stickers/music.png",
    label: "my playlists",
    href: "https://open.spotify.com/playlist/6MMk25QNUP4OwxLYdLVCGR?si=674a0b4a6f654c60",
    destination: "my playlists",
    x: 80,
    y: 83,
    size: 15,
    rotate: -8,
    tip: "above",
  },
];
