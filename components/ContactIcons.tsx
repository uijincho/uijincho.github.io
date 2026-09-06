import { IconMailFilled, IconBrandLinkedinFilled, IconBrandGithubFilled } from "@tabler/icons-react";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "@/lib/contact";

/** Shared circular icon-link treatment: 32px circle, hairline border that darkens on hover/focus. */
const ICON_LINK_CLASSES =
  "flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink";

/**
 * Centered row of three contact icons — email, LinkedIn, GitHub — used on
 * /about and the notebook hero. Email is a mailto: link; LinkedIn/GitHub
 * open in a new tab. Each link carries an aria-label for accessibility.
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
