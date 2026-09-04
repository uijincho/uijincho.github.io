export interface HeroPhoto {
  src: string;
  caption: string;
  alt: string;
}

/**
 * The four hero stack photos, configured in one place — real photos
 * (me, workspace, lab) land here later, replacing these placeholders.
 * Four is the intended count: HERO_STACK_OFFSETS (lib/design/hero-stack.ts)
 * is tuned for exactly four depths. A different count still renders (via
 * modulo indexing), but four is the design target.
 */
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
    src: "/images/hero/photo-3.png",
    caption: "blu's hacks 2024",
    alt: "blu's hacks 2024",
  },
  {
    src: "/images/hero/photo-4.png",
    caption: "@brownubadminton",
    alt: "@brownubadminton",
  },
];
