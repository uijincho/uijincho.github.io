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

      {/* TODO Zone 2: intro paragraph, 6-item selected-work grid, link to
          /work. Not in scope for the current hero build — lands separately. */}
    </>
  );
}
