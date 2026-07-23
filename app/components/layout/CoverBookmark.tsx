import { useNavigate } from "react-router";

/**
 * Permanent ribbon bookmark — returns to Landing (the cover) from any
 * interior page. Navigates with a plain navigate("/"), the same
 * mechanism a tab click uses, so book-layout.tsx's location-driven sync
 * flips backward through the pages to get there rather than jumping
 * instantly.
 *
 * Sits in the background hanging from the book's bottom edge, offset
 * left of the spine — not draped over the book itself — so it can never
 * collide with TabColumn, which is now embedded in the pages' own
 * left/right edges. Rendered before <Book/> in book-layout.tsx (so it
 * paints behind it) and positioned with top-full off the same sizing
 * wrapper the book uses, so it lines up with the book's actual bottom
 * edge at any viewport size.
 *
 * TODO: bg-neutral-300 is a placeholder — swap in the final riso-palette
 * ribbon color once that's locked in.
 */
export function CoverBookmark() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Return to cover"
      onClick={() => navigate("/")}
      className="absolute left-[38%] top-full h-14 w-8 -translate-x-1/2 border border-black bg-neutral-300 [clip-path:polygon(0%_0%,100%_0%,100%_100%,50%_75%,0%_100%)]"
    />
  );
}
