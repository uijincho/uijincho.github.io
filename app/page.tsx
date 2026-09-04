import type { Metadata } from "next";
import { NotebookHero } from "@/components/hero/NotebookHero";
import { MobileHeroTodo } from "@/components/hero/MobileHeroTodo";
import { WorkIndexBody } from "@/components/work/WorkIndexBody";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

// JSON-LD Person schema, landing page only (there's exactly one person
// this site is about — no reason to repeat this on every route). Kept
// deliberately minimal: only claims backed by data this codebase actually
// has (name, canonical url). No jobTitle/alumniOf/sameAs — inventing those
// would put fabricated claims about a real person into structured data
// search engines index. Add them here once real values exist.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function Home() {
  return (
    <>
      {/* Static, locally-defined JSON-LD (see personJsonLd above) — not user input. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      {/* Wrapped in <main> for two reasons: it's the landmark this route
          was missing (every other route has exactly one), and — the
          reason this matters here specifically — it's what makes
          <WorkIndexBody />'s width/centering match /work exactly.
          <body> is `flex flex-col` (app/layout.tsx); without this
          wrapper, WorkIndexBody's own `mx-auto max-w-[90rem]` div was a
          *direct* flex item of that column flex container, and a flex
          item with auto cross-axis margins doesn't stretch to fill the
          line the way a plain block element does — it shrinks to its
          content width instead (observed ~840px, not the intended
          1440px-capped-and-centered box), so it rendered narrower and
          differently-positioned than the exact same component on /work,
          where it's nested inside <main> (a plain block, not a flex
          item) and ordinary block-centering math applies. Wrapping both
          routes' content in <main> the same way makes WorkIndexBody a
          non-flex-item block child in both places — same containing
          block, same box-model math, same rendered width and position.

          `relative` (no `grain` here) so this <main> paints in the same
          CSS stacking category as <body>'s own grain pseudo-element —
          see .grain's comment in globals.css. Without it, body's grain
          (a positioned, z-index:auto layer) would paint ABOVE this
          plain-static <main>'s entire content instead of behind it. */}
      <main className="relative">
        {/* Zone 1: the notebook spread, desktop/tablet (md+). Do not attempt
            to scale this down for mobile — see MobileHeroTodo. */}
        <div className="hidden md:block">
          <NotebookHero />
        </div>
        <div className="md:hidden">
          <MobileHeroTodo />
        </div>

        {/* Zone 2: the hero scrolls directly into the full /work index — no
            separate navigation needed. Also what gives the page real
            height below the hero, so #hero-sentinel actually leaves the
            viewport and the SiteNav reveal fires. */}
        <WorkIndexBody />
      </main>
    </>
  );
}
