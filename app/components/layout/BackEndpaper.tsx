/**
 * Bookbinding concept: a real hardcover has a page ("endpaper") glued
 * between the rigid cover and the actual content block, front and back,
 * so nothing on the content pages can ever show past the cover's edge.
 * Landing already serves as the FRONT endpaper — it's a real, tab-less
 * page in the flip sequence sitting between the closed cover and the
 * first tabbed page (/about) — so no separate component was needed for
 * that side. Its own two leaves render via `<Page endpaper>` (see
 * Page.tsx), which bleeds -inset-3 in this same bg-amber-100 color
 * instead of a plain white sheet, so it visually matches and aligns with
 * this back layer rather than showing it as a thin border peeking out
 * from behind a white page.
 *
 * Contact has nothing after it, though, and (unlike Landing) always has
 * tabs protruding past its own page edge. This is the BACK endpaper: a
 * static, non-turning buffer — not a page-flip leaf, never navigable —
 * sitting directly behind the book at the same position, extended
 * slightly (-inset-3, 12px) past the book's own footprint so it, not the
 * bare HardcoverShell surface, is what tab protrusion reads as sitting
 * on. 12px comfortably covers TabColumn's ~8px protrusion while staying
 * inside HardcoverShell's own 20px margin, leaving a thin rim of the
 * cover itself still visible outside it.
 *
 * TODO: bg-amber-100 is a placeholder endpaper color — swap in the final
 * riso-palette treatment once that's locked in.
 */
export function BackEndpaper() {
  return <div aria-hidden="true" className="absolute -inset-3 bg-amber-100" />;
}
