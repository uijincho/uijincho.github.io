export interface HeroStackOffset {
  x: number;
  y: number;
  rotate: number;
  z: number;
}

/**
 * Resting offsets for the hero photo stack, indexed by depth (0 = top
 * card). The pull-out animation also reads from this array — depth 0's
 * offset is always where a card rests at the top of the stack.
 */
export const HERO_STACK_OFFSETS: HeroStackOffset[] = [
  { x: 15, y: 0, rotate: 3, z: 10 },
  { x: 7, y: 5, rotate: -1.5, z: 9 },
  { x: 14, y: 10, rotate: 1, z: 8 },
  { x: 21, y: 15, rotate: -2.5, z: 7 },
];
