import type { Metadata } from "next";
import { TYPE } from "@/lib/design/type-scale";
import { PhotoFrame } from "@/components/frames/PhotoFrame";
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

/**
 * Stage 7 real structure, PLACEHOLDER content — bio copy, education
 * entries, CURRENTLY items, contact links, and a headshot photo are all
 * still owed by the site owner (asked, not fabricated — see the /about
 * content question this was built against). Every PLACEHOLDER below marks
 * exactly what's missing so filling this in later is a content swap
 * against this exact structure, not a rebuild:
 *
 * - Single column, prose measure (max-w-2xl — matches the bio's Newsreader
 *   line length, same ~2xl cap the stub already used).
 * - One photograph via PhotoFrame (not FlatFrame — this is a real
 *   photograph of a person, per PhotoFrame's own "me, workspace, lab"
 *   scope). No file exists yet at the placeholder src, so PhotoFrame's
 *   existing resolveImage() fallback renders its labeled placeholder box
 *   automatically — same missing-image behavior used sitewide, not special
 *   handling added here.
 * - Bio in Newsreader (TYPE.bodySerif) — the one place on this site
 *   long-form serif body text is correct outside MDX article prose, since
 *   this genuinely is long-form personal writing, not UI copy.
 * - Education and CURRENTLY as their own h2 sections — real heading
 *   hierarchy (h1 → h2, no skipped levels), matching every other page.
 * - Contact anchored at #contact, `scroll-mt-24` so SiteNav's sticky bar
 *   doesn't cover the heading when jumped to via the nav's contact/ link
 *   (components/nav/SiteNav.tsx) — same behavior the prior stub already had.
 */
export default function About() {
  return (
    // relative (no grain here) — the actual base-page-background texture
    // lives on <body> (globals.css, app/layout.tsx), not per-route.
    // `relative` stays regardless — same CSS-painting-category reason as
    // every other <main>, see .grain's comment in globals.css.
    <main className="relative mx-auto max-w-2xl px-6 py-24">
      <h1 className={`${TYPE.displayLg} text-ink`}>About</h1>

      <div className="mt-8">
        <PhotoFrame
          src="/images/people/about-portrait.jpg"
          alt="PLACEHOLDER — portrait of Uijin Cho"
          width={280}
          height={280}
          rotationIndex={0}
        />
      </div>

      <div className={`${TYPE.bodySerif} mt-8 flex flex-col gap-4 text-ink`}>
        <p>PLACEHOLDER — real bio copy lands here (one to three short paragraphs, first person, Newsreader).</p>
      </div>

      <section className="mt-16">
        <h2 className={`${TYPE.heading} text-ink`}>Education</h2>
        <ul className="mt-4 flex flex-col gap-3">
          <li className={`${TYPE.body} text-ink-muted`}>PLACEHOLDER — degree, institution, years.</li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className={`${TYPE.heading} text-ink`}>Currently</h2>
        <ul className="mt-4 flex flex-col gap-2">
          <li className={`${TYPE.body} text-ink-muted`}>PLACEHOLDER — currently item one.</li>
          <li className={`${TYPE.body} text-ink-muted`}>PLACEHOLDER — currently item two.</li>
        </ul>
      </section>

      <section id="contact" className="mt-16 scroll-mt-24 border-t border-rule pt-10">
        <h2 className={`${TYPE.heading} text-ink`}>Contact</h2>
        <ul className="mt-4 flex flex-col gap-2">
          <li>
            <a href="#" className="font-mono text-xs uppercase tracking-wide text-accent hover:underline">
              PLACEHOLDER — email
            </a>
          </li>
          <li>
            <a href="#" className="font-mono text-xs uppercase tracking-wide text-accent hover:underline">
              PLACEHOLDER — GitHub / LinkedIn / etc.
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
