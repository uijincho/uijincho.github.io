/** Single source of truth for the site's shadow direction, used via `shadowFor()`. */
export const LIGHT = {
  // Direction the shadow is cast, as a (dx, dy) vector: light from the upper-left.
  dx: 0.55,
  dy: 0.85,
  /** Offset distance in px at elevation 1 (resting state). */
  distance: 5,
  /** Blur radius in px at elevation 1. */
  blur: 10,
  /** Shadow opacity 0-1 at elevation 1. Mixed with --color-ink — never black or gray. */
  opacity: 0.22,
} as const;

/** Builds a CSS box-shadow value from LIGHT, scaled by `elevation` (1 = resting). */
export function shadowFor(elevation: number = 1): string {
  const offsetX = Math.round(LIGHT.dx * LIGHT.distance * elevation);
  const offsetY = Math.round(LIGHT.dy * LIGHT.distance * elevation);
  const blur = Math.round(LIGHT.blur * elevation);
  const opacityPct = Math.round(LIGHT.opacity * 100);
  return `${offsetX}px ${offsetY}px ${blur}px color-mix(in srgb, var(--color-ink) ${opacityPct}%, transparent)`;
}
