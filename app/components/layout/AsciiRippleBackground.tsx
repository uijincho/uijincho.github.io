/**
 * Placeholder for the future ASCII ripple / cursor-reactive background.
 * For now it just renders a static full-bleed layer behind the book (see
 * book-layout.tsx) to confirm the layering works. No cursor logic or
 * rendering yet.
 */
export function AsciiRippleBackground() {
  return <div aria-hidden="true" className="fixed inset-0 z-0 bg-neutral-100" />;
}
