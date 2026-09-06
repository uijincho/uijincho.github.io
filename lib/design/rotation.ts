/** Fixed rotation values for the photo-frame treatment, deterministic (not Math.random()). */
export const ROTATIONS = [-2.5, 1.5, -1.8, 2.5, -1.2, 2.1, -2.8, 1.8] as const;

/** Deterministic lookup — same index in, same degree out, every time. */
export function rotationForIndex(index: number): number {
  const len = ROTATIONS.length;
  return ROTATIONS[((index % len) + len) % len];
}
