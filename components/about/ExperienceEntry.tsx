import type { ExperienceItem } from "@/content/experience";

/**
 * Shared row content (role / org / date range) for both entry treatments
 * below. Pulled out only because the CONTENT is genuinely identical between
 * the two — the two exported components below still own their OWN container
 * markup and classes outright, rather than this being a single component
 * with a `featured` boolean switching a computed className. That split
 * mirrors the spec directly: "two visual states, not one component with a
 * boolean prop styled two ways."
 */
function ExperienceRow({ role, org, start, end }: ExperienceItem) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="font-sans font-medium text-ink">{role}</p>
        <p className="mt-0.5 text-sm text-ink-muted">{org}</p>
      </div>
      <p className="shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-wide text-ink-muted">
        {start} – {end}
      </p>
    </div>
  );
}

/** Light raised fill, 1px hairline border — every non-featured entry. */
export function PlainExperienceEntry(item: ExperienceItem) {
  return (
    <li className="border border-rule bg-raised px-4 py-3">
      <ExperienceRow {...item} />
    </li>
  );
}

/**
 * Solid 1.5px ink border, no fill — the one currently-notable entry. Nothing
 * elsewhere on the site uses a border this heavy (checked: no border-2/
 * border-[1.5px]+ utility appears outside this file), so this doesn't
 * collide with an existing visual weight.
 */
export function FeaturedExperienceEntry(item: ExperienceItem) {
  return (
    <li className="border-[1.5px] border-ink px-4 py-3">
      <ExperienceRow {...item} />
    </li>
  );
}
