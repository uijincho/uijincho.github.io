/** Type scale as reusable Tailwind class-string constants, one per text role. */
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
