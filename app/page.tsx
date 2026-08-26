import type { Metadata } from "next";
import { NotebookHero } from "@/components/hero/NotebookHero";
import { MobileHeroTodo } from "@/components/hero/MobileHeroTodo";
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

      {/*
        TODO Zone 2: intro paragraph, 6-item selected-work grid, link to
        /work. Not in scope for the current hero build — lands separately.

        This placeholder exists to give the page real height below the
        hero. Without it, total document height barely exceeds one
        viewport (just the ~80px footer), so there's nowhere near enough
        scroll room for #hero-sentinel to ever leave the viewport — the
        SiteNav IntersectionObserver's isIntersecting never flips to
        false, and the nav can never reveal. min-h-screen here isn't
        arbitrary: it's what makes the reveal mechanism actually
        reachable before the real Zone 2 content replaces it.
      */}
      <section className="flex min-h-screen items-center justify-center bg-base px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-muted">
          TODO — Zone 2: intro, selected work, link to /work.
        </p>
      </section>
    </>
  );
}
