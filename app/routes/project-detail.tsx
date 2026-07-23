import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/project-detail";
import { PastedStampCard } from "~/components/projects/PastedStampCard";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Project — ${params.slug}` }];
}

const TRANSITION_MS = 300;

/**
 * Nested under /projects (see routes.ts), so this renders as a
 * full-screen overlay on top of the still-mounted Projects page rather
 * than a full page navigation away from the book. The card is the same
 * proportions as a StampCard (5:6), and flips in/out on a Y-axis with a
 * scale change — like the stamp being turned face-on and brought in for
 * a closer look — rather than just appearing/disappearing. Closing (X,
 * backdrop click, or Escape) waits for the flip-out before navigating
 * back to /projects.
 */
export default function ProjectDetail({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    setIsClosing(true);
    setTimeout(() => navigate("/projects"), TRANSITION_MS);
  }

  const flipped = !isVisible || isClosing;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      style={{
        opacity: flipped ? 0 : 1,
        transition: `opacity ${TRANSITION_MS}ms ease-out`,
      }}
      onClick={close}
    >
      <div
        className="[perspective:1600px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative aspect-[5/6] w-[min(90vw,75vh)]"
          style={{
            transform: flipped
              ? "rotateY(90deg) scale(0.6)"
              : "rotateY(0deg) scale(1)",
            transition: `transform ${TRANSITION_MS}ms ease-out`,
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute right-2 top-2 z-10 border border-black bg-white px-2 py-1 text-xs"
          >
            X
          </button>
          <PastedStampCard slug={params.slug} />
        </div>
      </div>
    </div>
  );
}
