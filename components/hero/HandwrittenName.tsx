import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

const NAME = "~uijincho";

interface HandwrittenNameProps {
  /** Element tag to render as. Both NotebookHero and MobileHeroTodo
   *  render this component; only one may use "h1" to keep one h1 per page. */
  as?: "h1" | "p";
}

/**
 * The page's h1 (or a visually-identical <p> on mobile) — the landing
 * page's primary heading, with a decorative CSS typing animation.
 *
 * The real text is always present via a sr-only span, so SEO/LCP/assistive
 * tech see complete content immediately. A separate aria-hidden layer
 * animates a page-load typing effect on top (.identity-typewriter /
 * .identity-cursor in globals.css) by revealing its own copy of the text
 * via width, without ever mutating the real content.
 *
 * An invisible placeholder reserves the wrapper's width/height in normal
 * flow; the animated layer is absolutely positioned on top so its
 * animation never affects layout.
 *
 * prefers-reduced-motion is handled in globals.css: typing keyframes are
 * skipped and the cursor renders static instead of blinking.
 */
export function HandwrittenName({ as = "h1" }: HandwrittenNameProps) {
  const Tag = as;
  return (
    <Tag className={`${mono.className} identity-mark text-[36px] leading-none text-accent tracking-tight`}>
      {/* The name links to /about. */}
      <Link href="/about">
        <span className="sr-only">{NAME}</span>
        <span aria-hidden="true" className="relative inline-block align-bottom">
          <span className="invisible whitespace-nowrap">{NAME}</span>
          <span className="identity-typewriter absolute inset-0 h-11 overflow-hidden whitespace-nowrap">
            {NAME}
          </span>
        </span>
        {/* Blinking cursor bar, drawn rather than a "|" glyph. */}
        <span aria-hidden="true" className="identity-cursor inline-block h-[0.75em] w-[3px] bg-current align-bottom" />
      </Link>
    </Tag>
  );
}
