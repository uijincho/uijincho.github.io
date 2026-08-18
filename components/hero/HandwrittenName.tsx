import { Caveat } from "next/font/google";

// REPLACEABLE: standing in for a traced SVG path of my actual
// handwriting, which I intend to substitute later. Kept in its own
// component (not inlined in NotebookHero) specifically so that swap only
// touches this one file. Font is loaded here, component-scoped, rather
// than in the root layout, since it's used nowhere else on the site.
const caveat = Caveat({ subsets: ["latin"], weight: ["700"] });

/**
 * The page's h1 — this name is the landing page's primary heading.
 */
export function HandwrittenName() {
  return <h1 className={`${caveat.className} text-[42px] leading-none text-accent`}>Uijin Cho</h1>;
}
