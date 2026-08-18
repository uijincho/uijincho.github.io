/**
 * Single source of truth for the site's shadow direction. Every drop
 * shadow on the site must be computed from this config via `shadowFor()`,
 * never hardcoded as a literal box-shadow value. Changing LIGHT here moves
 * every shadow on the site at once.
 *
 * Currently the only component that casts a shadow is PhotoFrame (the
 * photograph treatment) — FlatFrame and everything else deliberately cast
 * none. When the notebook hero (Stage 6) needs its own drop shadow for the
 * notebook object itself, it must also call shadowFor() rather than
 * hardcoding a value, to keep this invariant true.
 */
export const LIGHT = {
  // Direction the shadow is cast, as a simple (dx, dy) vector rather than
  // an angle — easier to reason about than trig. (0.55, 0.85) reads as
  // "light from the upper-left, shadow falls down and slightly right."
  dx: 0.55,
  dy: 0.85,
  /** Offset distance in px at elevation 1 (resting state). */
  distance: 5,
  /** Blur radius in px at elevation 1. */
  blur: 10,
  /** Shadow opacity 0-1 at elevation 1. Mixed with --color-ink — never black or gray. */
  opacity: 0.22,
} as const;

/**
 * Builds a CSS box-shadow value from LIGHT, scaled by `elevation`
 * (1 = resting; >1 lifts the element further off the page, e.g. on hover).
 * The shadow color is always `color-mix(in srgb, var(--color-ink) X%, transparent)`
 * — derived from the ink token, per the palette spec's ban on hardcoded
 * black/gray shadows.
 */
export function shadowFor(elevation: number = 1): string {
  const offsetX = Math.round(LIGHT.dx * LIGHT.distance * elevation);
  const offsetY = Math.round(LIGHT.dy * LIGHT.distance * elevation);
  const blur = Math.round(LIGHT.blur * elevation);
  const opacityPct = Math.round(LIGHT.opacity * 100);
  return `${offsetX}px ${offsetY}px ${blur}px color-mix(in srgb, var(--color-ink) ${opacityPct}%, transparent)`;
}
