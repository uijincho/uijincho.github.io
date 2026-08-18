export interface HeroStackOffset {
  x: number;
  y: number;
  rotate: number;
  z: number;
}

/**
 * Resting offsets for the hero photo stack, indexed by depth (0 = top
 * card). These are exact spec values, deliberately NOT derived from the
 * generic ROTATIONS array (lib/design/rotation.ts) — that array is for
 * arbitrary PhotoFrame placements elsewhere on the site; this is a
 * specific, hand-tuned choreography for exactly four cards in the hero.
 *
 * The pull-out animation (Pass 2) reads from this same array — depth 0's
 * offset is always where a card rests at the top of the stack, regardless
 * of which photo is currently in that slot.
 */
export const HERO_STACK_OFFSETS: HeroStackOffset[] = [
  { x: 0, y: 0, rotate: -2.5, z: 10 },
  { x: 7, y: 5, rotate: 1.5, z: 9 },
  { x: 14, y: 10, rotate: -1, z: 8 },
  { x: 21, y: 15, rotate: 2.5, z: 7 },
];
