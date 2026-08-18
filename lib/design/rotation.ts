/**
 * Fixed rotation values for the photo-frame treatment. Never Math.random():
 * random rotation would (a) mismatch between server and client render on
 * first paint, since Math.random() isn't deterministic across them, and
 * (b) make the layout shift on every re-render. The same index always
 * yields the same degree, forever.
 *
 * Magnitudes are 1-3 degrees, never 0, per spec.
 */
export const ROTATIONS = [-2.5, 1.5, -1.8, 2.5, -1.2, 2.1, -2.8, 1.8] as const;

/** Deterministic lookup — same index in, same degree out, every time. */
export function rotationForIndex(index: number): number {
  const len = ROTATIONS.length;
  return ROTATIONS[((index % len) + len) % len];
}
