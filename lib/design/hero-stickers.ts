export interface HeroSticker {
  src: string;
  label: string;
  href: string | null;
  /** Used when href is set, to complete the aria-label as "{label}, opens {destination}". */
  destination?: string;
  /** % of the left page's width, center point of the sticker. */
  x: number;
  /** % of the left page's height, center point of the sticker. */
  y: number;
  /** % of the left page's width (scales with the page, not a fixed px size). */
  size: number;
  rotate: number;
  /** Which side the tooltip opens toward. */
  tip: "above" | "below";
}

/**
 * Hobby stickers around the photo stack, left page. Positioned in two
 * bands above and below the stack's hit area (HeroPhotoStack's
 * STACK_HIT_WIDTH / STACK_HIT_HEIGHT).
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
