import { useNavigate } from "react-router";

/**
 * "Return to cover" affordance — a folded-corner (dog-ear) hint at the
 * current page's top-left corner, replacing the old permanently-visible
 * ribbon. Subtle by default (low opacity, no shadow) and only reads as an
 * intentional fold on hover — it shouldn't compete with page content the
 * rest of the time.
 *
 * Clicking calls the same plain navigate("/") the ribbon used, which
 * book-layout.tsx's location-driven step-sequencer turns into a real
 * flip-back through however many sections stand between the current page
 * and Landing, one leaf at a time — same mechanism any tab/link uses.
 *
 * Rendered book-level (a sibling of <Book>, positioned against the same
 * sizing wrapper) rather than embedded per-page like TabColumn — like the
 * ribbon it replaces, it needs to be reachable regardless of which page
 * is currently showing, not baked into any one leaf's own DOM.
 *
 * Positioned at -left-3/-top-3, not left-0/top-0: that sizing wrapper is
 * the same box BackEndpaper bleeds -inset-3 past (see BackEndpaper.tsx),
 * so this offset lands the fold's own corner right at the yellow
 * endpaper's actual outer corner instead of inset onto the white content
 * page — it should read as part of the bigger yellow sheet, not the page
 * sitting on top of it.
 *
 * h-8/w-8 (not larger) is deliberate: TabColumn's nav starts at top-14
 * (56px), so this box — now ending at 20px (32px height, offset -12px)
 * instead of 32px — clears it with room to spare either way.
 *
 * TODO: bg-neutral-400 is a placeholder fold color — swap in the final
 * riso-palette treatment once that's locked in.
 */
export function DogEarFold() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Return to cover"
      onClick={() => navigate("/")}
      className="group absolute -left-3 -top-3 z-50 h-8 w-8 opacity-30 transition-opacity hover:opacity-100 focus-visible:opacity-100"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 block [clip-path:polygon(0_0,100%_0,0_100%)] bg-neutral-400 shadow-sm transition-shadow group-hover:shadow-md"
      />
    </button>
  );
}
