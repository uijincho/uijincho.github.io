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
    src: "/images/hero/photo-1.jpg",
    caption: "PLACEHOLDER CAPTION ONE",
    alt: "PLACEHOLDER — replace with a real photo",
  },
  {
    src: "/images/hero/photo-2.jpg",
    caption: "PLACEHOLDER CAPTION TWO",
    alt: "PLACEHOLDER — replace with a real photo",
  },
  {
    src: "/images/hero/photo-3.jpg",
    caption: "PLACEHOLDER CAPTION THREE",
    alt: "PLACEHOLDER — replace with a real photo",
  },
  {
    src: "/images/hero/photo-4.jpg",
    caption: "PLACEHOLDER CAPTION FOUR",
    alt: "PLACEHOLDER — replace with a real photo",
  },
];
