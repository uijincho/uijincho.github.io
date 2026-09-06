import type { Metadata } from "next";
import { NotebookHero } from "@/components/hero/NotebookHero";
import { MobileHeroTodo } from "@/components/hero/MobileHeroTodo";
import { WorkIndexBody } from "@/components/work/WorkIndexBody";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

// JSON-LD Person schema for the landing page.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function Home() {
  return (
    <>
      {/* Structured data for search engines. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      {/* Landmark for this route, and keeps WorkIndexBody's width/centering
          matching /work (both nested inside a plain-block <main>, not a
          flex item directly). `relative` lets body's grain texture
          (globals.css) show through behind this page. */}
      <main className="relative">
        {/* Zone 1: the notebook spread, desktop/tablet (md+). Mobile uses MobileHeroTodo instead. */}
        <div className="hidden md:block">
          <NotebookHero />
        </div>
        <div className="md:hidden">
          <MobileHeroTodo />
        </div>

        {/* Zone 2: the full /work index, scrolled directly into from the hero. */}
        <WorkIndexBody />
      </main>
    </>
  );
}
