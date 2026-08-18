/**
 * Documented type scale as reusable Tailwind class-string constants. These
 * aren't new theme tokens — the four font families already exist as
 * --font-display/--font-sans/--font-serif/--font-mono (app/globals.css).
 * This is just the one place that decides which size/weight/tracking goes
 * with which role, so components pull from here instead of picking ad hoc
 * sizes that drift apart over time.
 */
export const TYPE = {
  /** Landing hero name / biggest display moment. */
  displayXl: "font-display text-5xl md:text-6xl font-bold tracking-[-0.02em]",
  /** Page h1 on interior pages. */
  displayLg: "font-display text-3xl md:text-4xl font-bold tracking-[-0.02em]",
  /** Section headings, card titles. */
  heading: "font-display text-xl md:text-2xl font-bold tracking-[-0.02em]",
  /** UI/interface body copy — nav, cards, summaries. Inter, not Newsreader. */
  body: "font-sans text-base leading-relaxed",
  /** Long-form MDX article prose ONLY. Newsreader. */
  bodySerif: "font-serif text-lg leading-relaxed",
  /** Meta rows, tags, index numbers, captions. */
  meta: "font-mono text-xs uppercase tracking-wide text-ink-muted",
} as const;
