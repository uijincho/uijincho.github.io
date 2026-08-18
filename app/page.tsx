import { NotebookHero } from "@/components/hero/NotebookHero";
import { MobileHeroTodo } from "@/components/hero/MobileHeroTodo";

export default function Home() {
  return (
    <>
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
