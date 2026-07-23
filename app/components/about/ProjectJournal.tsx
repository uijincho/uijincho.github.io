import { Link } from "react-router";
import { StampCard } from "~/components/projects/StampCard";
import { projects } from "~/data/projects";

// 3, not 4 — at full StampCard size (matching /projects) each row is
// considerably taller, so 3 rows plus the annotation link already fills
// the page without forcing a scroll.
const HIGHLIGHT_COUNT = 3;
const highlightedProjects = projects.slice(0, HIGHLIGHT_COUNT);

const journalNotes = [
  "Started as a weekend experiment, ended up sticking around far longer than planned. Still the project I keep circling back to on a free evening.",
  "Built to solve a problem I kept running into myself — turned out other people had the same one. Rebuilt twice since, and probably due for a third pass.",
  "An older one, but it holds up. First project that taught me how much I didn't understand about the problem I thought I'd already solved.",
];

/**
 * About page's right side: a vertical column of stamps (left side of
 * this page) at the same size as StampCard on the full /projects page —
 * not a shrunken variant — each paired with a short journal-entry style
 * note, plus a corner-fold hotspot down to the full /projects spread.
 * Interior pages don't have react-pageflip's drag-corner interaction
 * enabled (see Book.tsx's `interactive` prop, only ever true on Landing),
 * so this is a plain Link, not a drag affordance. Clicking it just
 * navigates to /projects, which book-layout.tsx's location-sync turns
 * into an ordinary single-leaf flip — the same route tabs reach, not a
 * distinct view.
 *
 * Unlike Landing's own corner hint, this renders no visual triangle —
 * the "turn the page" graphic is meant to read as a Landing-only cue.
 * The hotspot itself stays exactly where the visual used to be (same
 * position/size), just invisible, so it's still fully clickable.
 */
export function ProjectJournal() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-between">
        {highlightedProjects.map((project, index) => (
          <div key={project.slug} className="flex items-center gap-4">
            <div className="w-1/3 shrink-0">
              <StampCard {...project} />
            </div>
            <p className="flex-1 text-sm italic leading-relaxed text-neutral-600">
              {journalNotes[index] ?? "A placeholder project note."}
            </p>
          </div>
        ))}
      </div>
      <Link to="/projects" aria-label="Continue to projects" className="absolute bottom-0 right-0 h-8 w-8" />
    </div>
  );
}
