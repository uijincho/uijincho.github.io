import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StampGrid } from "./StampGrid";
import { projects } from "~/data/projects";

const splitAt = Math.ceil(projects.length / 2);
const leftPageProjects = projects.slice(0, splitAt);
const rightPageProjects = projects.slice(splitAt);

const TRANSITION_MS = 300;

/**
 * Bottom-up drawer entrance for /projects — the one exception to
 * react-pageflip driving page-to-page navigation, used only by the
 * "more projects" annotation link on the About page (see
 * ProjectJournal.tsx, which navigates here with `state: { viaSheet:
 * true }`). Slides up from the bottom, covering whatever page was
 * showing underneath, instead of flipping to it. book-layout.tsx checks
 * that same state flag to skip its normal flip-sync while this is open,
 * so the underlying book stays on About the whole time.
 */
export function ProjectsSheet() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  function close() {
    setIsClosing(true);
    setTimeout(() => navigate("/about"), TRANSITION_MS);
  }

  const hidden = !isVisible || isClosing;

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/20 p-4"
      style={{ opacity: hidden ? 0 : 1, transition: `opacity ${TRANSITION_MS}ms ease-out` }}
      onClick={close}
    >
      <div
        className="relative flex w-full max-w-[95vw] flex-col border border-black bg-white p-6 md:aspect-[3/2] md:w-[min(85vw,127.5vh)] md:flex-row"
        style={{
          transform: hidden ? "translateY(100%)" : "translateY(0)",
          transition: `transform ${TRANSITION_MS}ms ease-out`,
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute right-2 top-2 z-10 border border-black bg-white px-2 py-1 text-xs"
        >
          X
        </button>
        <div className="flex-1 overflow-y-auto border-b border-black p-2 md:border-b-0 md:border-r">
          <StampGrid stamps={leftPageProjects} />
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <StampGrid stamps={rightPageProjects} />
        </div>
      </div>
    </div>
  );
}
