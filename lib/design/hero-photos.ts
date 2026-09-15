export interface HeroPhoto {
  src: string;
  caption: string;
  alt: string;
}

/** The four hero stack photos. HERO_STACK_OFFSETS (lib/design/hero-stack.ts) is tuned for exactly four. */
export const HERO_PHOTOS: HeroPhoto[] = [
  {
    src: "/images/hero/photo-1.png",
    caption: "hi, i'm Jin!",
    alt: "hi, i'm Jin!",
  },
  {
    src: "/images/hero/photo-2.jpg",
    caption: "prev swe intern @ GoDaddy",
    alt: "prev swe intern @ GoDaddy",
  },
  {
    src: "/images/hero/photo-3.jpg",
    caption: "Brown DEEPS Dive Research Symposium 2026",
    alt: "Brown DEEPS Dive Research Symposium 2026",
  },
  {
    src: "/images/hero/photo-4.png",
    caption: "@brownubadminton",
    alt: "@brownubadminton",
  },
];
