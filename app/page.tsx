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
    </>
  );
}
