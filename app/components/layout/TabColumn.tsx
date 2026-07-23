import { Link } from "react-router";

// Landing → About → Projects → Contact — this order also drives the
// flip book's physical page sequence (see book-layout.tsx's PAGE_INDEX).
const SECTIONS = [
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

// Fixed box regardless of label length. writing-mode:vertical-rl means
// a longer label like "Projects" would otherwise run further along the
// vertical axis rather than stretching the row — h-24/w-8 plus a smaller
// font and overflow-hidden keep every tab visually identical.
const TAB_CLASS =
  "flex h-24 w-8 shrink-0 items-center justify-center overflow-hidden rotate-180 border border-black text-[10px] [writing-mode:vertical-rl]";

interface TabColumnProps {
  side: "left" | "right";
  /** Which section (0 = About, 1 = Projects, 2 = Contact) this specific
   * page belongs to — a static fact about the page, not derived from
   * the current URL. */
  currentIndex: number;
}

/**
 * One edge's worth of notebook tabs. Rendered directly inside whichever
 * physical page sits at that edge (the left page of a spread renders
 * `side="left"`, the right page renders `side="right"`) so the tabs are
 * literally part of the page DOM react-pageflip transforms — they turn
 * along with the page instead of sitting on top as a separate static
 * overlay that has to be kept in sync.
 *
 * Real book/planner tabs are cut at a fixed depth into the page edge:
 * "About" always occupies the same slot, "Projects" the next, and so
 * on, regardless of which page you're currently on. So every column
 * always renders all 3 slots — a section renders as a real link on
 * this side if it belongs here (before-or-current on the left,
 * after on the right), and as an invisible placeholder of the same
 * size otherwise, so the fixed slot positions are preserved rather than
 * remaining tabs sliding to fill the gap.
 */
export function TabColumn({ side, currentIndex }: TabColumnProps) {
  const positionClass =
    side === "left"
      ? "absolute left-0 top-8 flex -translate-x-1/2 flex-col gap-3"
      : "absolute right-0 top-8 flex translate-x-1/2 flex-col gap-3";

  return (
    <nav className={positionClass}>
      {SECTIONS.map((section, index) => {
        const belongsOnThisSide = side === "left" ? index <= currentIndex : index > currentIndex;

        if (!belongsOnThisSide) {
          return (
            <div key={section.label} aria-hidden="true" className={`${TAB_CLASS} invisible`} />
          );
        }

        return (
          <Link key={section.label} to={section.to} className={`${TAB_CLASS} hover:underline`}>
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
