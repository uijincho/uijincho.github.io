import { IconMailFilled, IconBrandLinkedinFilled, IconBrandGithubFilled } from "@tabler/icons-react";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/contact";

/**
 * Shared treatment for all three circular icon links below — 32px circle,
 * 1px 25%-opacity ink border that darkens to full opacity on hover/focus,
 * no fill, no scale (this is not the hero sticker treatment). Visible
 * focus is the site's plain CSS outline (globals.css `:focus-visible`),
 * never a Tailwind ring-* utility, so nothing extra is added here for
 * focus beyond letting that rule apply.
 */
const ICON_LINK_CLASSES =
  "flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink";

/**
 * Centered row of three contact icons — email, LinkedIn, GitHub, in that
 * order — used on /about and the notebook hero's right page
 * (components/hero/NotebookHero.tsx). Extracted here so both locations
 * stay visually identical (same size, border, hover, and focus behavior)
 * automatically, rather than by keeping two copies of the markup in sync
 * by hand.
 *
 * Icons are @tabler/icons-react's FILLED variants (IconMailFilled etc.) —
 * filled icons take their color from `color`, not `stroke`, so they must
 * never get the site's outline-icon CSS. Email renders as a real mailto:
 * link; LinkedIn/GitHub are external (target="_blank" +
 * rel="noopener noreferrer"). Each link carries a real aria-label since
 * the icon alone has no accessible name.
 *
 * `className` lets each call site control its own outer spacing (e.g. a
 * top margin) without the component hardcoding an opinion about where it
 * sits on the page.
 */
export function ContactIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center gap-3 ${className}`}>
      <a href={`mailto:${EMAIL}`} aria-label="Email" className={ICON_LINK_CLASSES}>
        <IconMailFilled size={16} className="text-ink" />
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={ICON_LINK_CLASSES}
      >
        <IconBrandLinkedinFilled size={16} className="text-ink" />
      </a>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className={ICON_LINK_CLASSES}
      >
        <IconBrandGithubFilled size={16} className="text-ink" />
      </a>
    </div>
  );
}
