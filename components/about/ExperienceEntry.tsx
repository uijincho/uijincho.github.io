import type { ExperienceItem } from "@/content/experience";

/**
 * One row (role / org / date range) in the About page's Experience list.
 * No more plain/featured split — every entry gets the same rest-state
 * chrome (raised fill + hairline) and, on hover, the identical
 * bg-support/15 fill CategoryNav gives its hovered/active project rows
 * (components/work/CategoryNav.tsx) — one shared "you are here" brick
 * tint convention across the site, not a per-page variant of it.
 */
export function ExperienceEntry({ role, org, start, end }: ExperienceItem) {
  return (
    <li className="border border-rule bg-raised px-4 py-3 transition-colors duration-150 hover:bg-support/15">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans font-medium text-ink">{role}</p>
          <p className="mt-0.5 text-sm text-ink-muted">{org}</p>
        </div>
        <p className="shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-wide text-ink-muted">
          {start} – {end}
        </p>
      </div>
    </li>
  );
}
