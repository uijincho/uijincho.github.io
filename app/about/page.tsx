import type { Metadata } from "next";
import Link from "next/link";
import { TYPE } from "@/lib/design/type-scale";
import { PhotoFrame } from "@/components/frames/PhotoFrame";
import { ContactIcons } from "@/components/ContactIcons";
import { ExperienceEntry } from "@/components/about/ExperienceEntry";
import { EXPERIENCE } from "@/content/experience";
import { SITE_URL } from "@/lib/site";

const DESCRIPTION = "Software engineer and researcher — bio, education, and contact.";

// Same treatment as inline links/bold in MDX project prose
// (components/work/mdx-components.tsx `a`/`strong`) — this bio is hand-authored
// JSX rather than MDX (see the doc comment below for why), but it's still
// long-form body copy and should read identically to the MDX version.
const BIO_LINK_CLASSES = "text-accent underline underline-offset-2 hover:no-underline";
const BIO_STRONG_CLASSES = "font-semibold text-ink";

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

/**
 * Two-column /about.
 *
 * Layout: two column-wrapper divs (photo+Experience, bio+degree/icons),
 * each `contents` below md and `flex flex-col` at md+ — not a plain 2x2
 * grid. A 2x2 grid was tried first: four cells placed by col/row, with
 * photo/Experience sharing column 1's row-1/row-2 cells and bio/degree
 * sharing column 2's. That made Experience's row start only once row-1's
 * TALLER sibling (the multi-paragraph bio) finished, not right under the
 * photo — CSS Grid sizes a row from its tallest cell across every column,
 * so a short column-1 cell next to a tall column-2 one still gets pushed
 * down by the tall one. Wrapping each column's two items in their own
 * `flex flex-col` box fixes that (each column's height then depends only
 * on its own two children), while `contents` on those same wrappers below
 * md un-boxes them again so their children become direct items of the
 * outer single-column grid — letting `order-*` interleave photo/bio/
 * degree/Experience into the spec's mobile order, which two real boxes
 * could only ever reorder as "left column, then right column," never
 * interleaved.
 *
 * Nothing on this page is position: sticky — the portrait stays in normal
 * flow like everything else, and Experience just sits directly below it.
 * An earlier version made the portrait sticky on desktop; removed per
 * direct request, not worth resurrecting without a specific reason to.
 *
 * Contact links go through the shared ContactIcons component
 * (components/ContactIcons.tsx, backed by lib/contact.ts's EMAIL/
 * LINKEDIN_URL/GITHUB_URL) rather than inlining the icons here — the same
 * component renders on the notebook hero's right page
 * (components/hero/NotebookHero.tsx), so both locations read from one
 * source of truth instead of two copies that can drift apart.
 */
export default function About() {
  return (
    // relative (no grain here) — the actual base-page-background texture
    // lives on <body> (globals.css, app/layout.tsx), not per-route.
    // `relative` stays regardless — same CSS-painting-category reason as
    // every other <main>, see .grain's comment in globals.css.
    <main className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
        {/* Column 1: photo, then Experience directly under it. `contents`
            below md hands both children to the outer grid directly (see
            `order-*` below); `md:flex md:flex-col` makes it a real,
            independently-sized box at md+, so this column's height comes
            only from these two children, not column 2's taller bio. */}
        <div className="contents md:col-start-1 md:flex md:flex-col md:gap-8">
          {/* Centered via text-align on this cell; PhotoFrame's own outer
              element is already inline-block (see its own doc comment),
              so centering isn't affected by rotate={false} below (no
              transform in play either way here). */}
          <div className="order-1 text-center md:order-none">
            <PhotoFrame
              src="/images/people/about-portrait.jpg"
              alt="Portrait of Uijin Cho"
              width={280}
              height={280}
              rotationIndex={0}
              rotate={false}
            />
          </div>

          <div className="order-4 md:order-none">
            <h2 className={TYPE.meta}>Experience</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {EXPERIENCE.map((item, i) => (
                <ExperienceEntry key={i} {...item} />
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: bio, then the degree/contact block. Same `contents` /
            `flex flex-col` split as column 1 above. */}
        <div className="contents md:col-start-2 md:flex md:flex-col md:gap-12">
          <div className="order-2 md:order-none">
            {/* Deliberately not TYPE.displayLg as-is: that token bundles
                font-display, which would collide with font-mono below as
                two font-family utilities on one element (Tailwind's
                cascade order between them isn't something to depend on).
                Same size/weight/tracking as displayLg, swapped to
                JetBrains Mono in the accent color per direct request —
                this is the only heading styled this way. */}
            <div className={`${TYPE.bodySerif} mt-6 flex max-w-[68ch] flex-col gap-4 text-ink`}>
              <p>
                Hi, I’m{" "}
                <a href="https://hearmyname.net/say/ko-kr/%EC%9D%98%EC%A7%84" className={BIO_LINK_CLASSES}>
                  Uijin / Jin / 의진
                </a>
                !
              </p>
              <p>
                I’ve conducted{" "}
                <Link href="/projects/salton-sea-cnn" className={BIO_LINK_CLASSES}>
                  machine learning research
                </Link>{" "}
                with satellite data, published data journalism with{" "}
                <Link href="/projects/bdhcab" className={BIO_LINK_CLASSES}>
                  the Brown Daily Herald
                </Link>
                , and (will have) directed{" "}
                <a href="https://hackatbrown.org" className={BIO_LINK_CLASSES}>
                  hackathons
                </a>{" "}
                on both coasts.
              </p>
              <p>
                Since high school, I’ve worked to <strong className={BIO_STRONG_CLASSES}>expand STEM access</strong> through
                robotics and hackathons — and next up, I’m hoping to start the first collegiate-run{" "}
                <strong className={BIO_STRONG_CLASSES}>high school hackathon in Rhode Island</strong>.
              </p>
              <p>
                Long-term, I’m drawn to roles applying <strong className={BIO_STRONG_CLASSES}>AI/ML</strong> to{" "}
                <strong className={BIO_STRONG_CLASSES}>climate and environmental forecasting</strong>.
              </p>
              <p>
                I also compete with Brown University Badminton, enjoy{" "}
                <a href="https://goodreads.com/uijincho" className={BIO_LINK_CLASSES}>
                  reading
                </a>{" "}
                in my free time, and play oboe & english horn with Providence Medical Orchestra and in musical
                productions.
              </p>
            </div>
          </div>

          <div className="order-3 md:order-none">
            <div className="border-t border-rule pt-8 text-center">
              <p className="font-mono text-sm uppercase tracking-wide text-accent">
                Sc.B. Applied Mathematics-Computer Science
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-wide text-ink-muted">
                Brown University, 2025–2029
              </p>

              <ContactIcons className="mt-6" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
