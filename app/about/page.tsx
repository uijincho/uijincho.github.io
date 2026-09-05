import type { Metadata } from "next";
import { IconMailFilled, IconBrandLinkedinFilled, IconBrandGithubFilled } from "@tabler/icons-react";
import { TYPE } from "@/lib/design/type-scale";
import { PhotoFrame } from "@/components/frames/PhotoFrame";
import { PlainExperienceEntry, FeaturedExperienceEntry } from "@/components/about/ExperienceEntry";
import { EXPERIENCE } from "@/content/experience";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineer and researcher — bio, education, and contact.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About",
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

// PLACEHOLDER contact hrefs — real handles are owed by the site owner, same
// as the bio copy and experience dates below. Kept as named constants (not
// inline "#") so the mailto: structure the spec asks for is genuinely
// present, just pointed at an obviously-fake address rather than a real one
// published into a public repo without being asked to do that.
const EMAIL = "uijin_cho@brown.edu";
const LINKEDIN_URL = "https://www.linkedin.com/in/uijincho";
const GITHUB_URL = "https://github.com/uijincho";

// Shared treatment for the three circular icon links below — 32px circle,
// 1px 25%-opacity ink border that darkens to full opacity on hover/focus,
// no fill, no scale. Visible focus is the site's plain CSS outline
// (globals.css `:focus-visible`), never a Tailwind ring-* utility, so
// nothing extra is added here for focus beyond letting that rule apply.
const ICON_LINK_CLASSES =
  "flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink";

/**
 * Two-column /about. Real structure, PLACEHOLDER content — bio copy,
 * degree, experience entries, and contact links are all still owed by the
 * site owner (asked, not fabricated). Every PLACEHOLDER below marks exactly
 * what's missing, so filling this in later is a content swap against this
 * exact structure, not a rebuild.
 *
 * Layout: one grid, four direct children (photo / bio / degree+icons /
 * experience) placed explicitly per column+row at md, not two nested
 * "column" wrapper divs — a two-wrapper version can only ever reorder as
 * "left column, then right column" on mobile, never interleave, and the
 * spec's mobile order (photo, bio, degree, experience) interleaves across
 * what's the left vs. right column at desktop. `order-*` (mobile) /
 * `md:col-start-*` + `md:row-start-*` (desktop) on each of the four is what
 * actually produces both layouts from one DOM order.
 *
 * Sticky: applied to the photo only, NOT to the photo+Experience pairing
 * the spec frames as "the left column." Two independent sticky siblings
 * stacked in the same grid column (photo, then Experience below it) fight
 * over the same pinned viewport slot once both have individually crossed
 * the `top` threshold — Experience's own sticky engagement would start
 * overlapping the already-pinned photo, not stack politely beneath it.
 * Making them one sticky unit (a shared wrapper) would fix that, but that
 * wrapper can't also satisfy the mobile interleaving above — bio and
 * degree need to render between photo and Experience in DOM/order terms,
 * which a shared photo+Experience wrapper prevents. Scoping sticky to just
 * the photo sidesteps both problems (no fragile hardcoded offset
 * replicating PhotoFrame's own padding to stack a second sticky element
 * under it, and no DOM duplication for two different orderings) and, as a
 * side effect, already avoids the exact "Experience grows longer than the
 * bio" failure mode flagged below — worth a second look once real copy
 * exists, since this is a deliberate deviation from "whole left column
 * sticky," not an oversight.
 */
export default function About() {
  return (
    // relative (no grain here) — the actual base-page-background texture
    // lives on <body> (globals.css, app/layout.tsx), not per-route.
    // `relative` stays regardless — same CSS-painting-category reason as
    // every other <main>, see .grain's comment in globals.css.
    <main className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        {/* Photo — left column, top. Centered via text-align on this cell;
            PhotoFrame's own outer element is already inline-block (see its
            own doc comment), so its fixed rotation transform doesn't skew
            that centering. */}
        <div className="order-1 text-center md:sticky md:top-24 md:order-none md:col-start-1 md:row-start-1 md:self-start">
          <PhotoFrame
            src="/images/people/about-portrait.jpg"
            alt="PLACEHOLDER — portrait of Uijin Cho"
            width={280}
            height={280}
            rotationIndex={0}
          />
        </div>

        {/* Bio — right column, top. */}
        <div className="order-2 md:order-none md:col-start-2 md:row-start-1">
          <h1 className={`${TYPE.displayLg} text-ink`}>About</h1>
          <div className={`${TYPE.bodySerif} mt-6 flex max-w-[68ch] flex-col gap-4 text-ink`}>
            <p>Hi, I'm [Uijin / Jin / 의진](https://hearmyname.net/say/ko-kr/%EC%9D%98%EC%A7%84)! 

I've conducted [machine learning research](https://uijincho.com/projects/salton-sea-cnn) with satellite data, published data journalism with [the Brown Daily Herald](https://uijincho.com/projects/bdhcab), and (will have) directed [hackathons](https://hackatbrown.org) on both coasts.

Since high school, I’ve worked to **expand STEM access** through robotics and hackathons — and next up, I’m hoping to start the first collegiate-run **high school hackathon in Rhode Island**. 

Long-term, I'm drawn to roles applying **AI/ML** to **climate and environmental forecasting**.

I also compete with Brown University Badminton, enjoy [reading](https://goodreads.com/uijincho) in my free time, and play oboe & english horn with Providence Medical Orchestra and in musical productions.</p>
          </div>
        </div>

        {/* Degree + contact icons — right column, bottom. */}
        <div className="order-3 md:order-none md:col-start-2 md:row-start-2 md:self-start">
          <div className="border-t border-rule pt-8 text-center">
            <p className="font-mono text-sm uppercase tracking-wide text-accent">Sc.B. Applied Mathematics-Computer Science</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-muted">Brown University, 2025-2029</p>

            <div className="mt-6 flex justify-center gap-3">
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
          </div>
        </div>

        {/* Experience — left column, bottom. Heading lives in this same
            cell (not the photo cell above) so mobile's `order-4` carries
            both the heading and the list to the end, after bio and
            degree+icons, per the spec's explicit mobile order. On desktop
            it lands directly below the photo anyway — same grid column,
            adjacent row, gap-12 between — no shared wrapper needed for
            that adjacency. */}
        <div className="order-4 md:order-none md:col-start-1 md:row-start-2">
          <h2 className={TYPE.meta}>Experience</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {EXPERIENCE.map((item, i) =>
              item.featured ? (
                <FeaturedExperienceEntry key={i} {...item} />
              ) : (
                <PlainExperienceEntry key={i} {...item} />
              ),
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
