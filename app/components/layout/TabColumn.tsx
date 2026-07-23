import { Link, useLocation } from "react-router";

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
// font and overflow-hidden keep every tab visually identical. Border and
// background live in appearanceClassFor below, not here, since the
// active tab needs to vary them per-tab rather than share one constant.
// `relative` is harmless on every tab (active, inactive, or invisible
// placeholder) — it only matters for the active tab's corner caps below,
// which need a positioned ancestor, but costs nothing on tabs with no
// absolutely-positioned children.
const TAB_SHAPE_CLASS =
  "relative flex h-24 w-8 shrink-0 items-center justify-center overflow-hidden text-[10px] [writing-mode:vertical-rl] hover:underline";

// vertical-rl's own default reads top-to-bottom facing outward, so
// left-side tabs (protruding off the page's left edge) get rotated 180°
// to face inward toward the spine. Right-side tabs protrude off the
// opposite edge, so the *un-rotated* default orientation is what faces
// inward there — applying the same rotate-180 would face their text
// outward, away from the spine, instead.
const rotationClassFor = (side: "left" | "right") => (side === "left" ? "rotate-180" : "");

// The "you are here" treatment for whichever tab matches the current
// route: every side actually touching/facing the open page — top,
// bottom, and the inner edge — drops its border and matches the page's
// own background, reading as merged with the page rather than a
// separate bordered rectangle sitting on top of it. Only the outer edge
// (the sliver sticking out past the page into the yellow margin) isn't
// touching the page at all, so that's the one edge that keeps a normal
// border. bg-white is written explicitly here (not just left to inherit
// the tab's own default fill) because it's meant to track the current
// page's own background — Page.tsx's bg-white — not merely coincide
// with it. Preflight resets every element's border-width to 0 and
// border-style to solid, so applying only the single outer-side width
// utility (no `border` shorthand) leaves the other three sides
// borderless without needing to zero them out individually.
//
// Both sides use the SAME border-r utility here, not border-l for one
// and border-r for the other — that's not a mistake to "simplify" away.
// rotationClassFor rotates left-side tabs 180° (to keep their text
// facing the spine), and CSS transforms are purely a paint-time visual
// operation: a rotated element's own border-left still IS its
// border-left in the box model (getComputedStyle confirms this), but
// the 180° rotation flips which SCREEN side that edge actually paints
// on. Confirmed empirically (zoomed screenshot): with border-l applied
// to a rotated left-side tab, the visible black line rendered on the
// page-facing side instead of the margin-facing side — the reverse of
// what was intended. border-r on a rotated left-side tab paints on
// screen-left (its true, un-rotated outer/margin-facing edge); border-r
// on an un-rotated right-side tab paints on screen-right (also its true
// outer edge) — so the one utility is correct for both, precisely
// because only one of the two sides is actually rotated.
//
// Top and bottom stay borderless here (no border-t/border-b) — the
// active tab's top/bottom edges are mostly over the open page (should
// blend, matching the inner edge) with only a short corner sliver still
// over the yellow margin (which should stay bordered). A single
// full-width border-t/border-b can't express that split; see
// CORNER_CAP_CLASS and CornerCaps below for the two small bars that
// cover just the margin-facing corners instead.
function appearanceClassFor(isActive: boolean): string {
  if (!isActive) return "border border-black bg-white";
  return "border-r border-black bg-white";
}

// w-2 (8px) matches the tab's own protrusion (the same 8px used by
// -translate-x-[8px]/translate-x-[8px] below) — the same 8px the tab
// actually pokes out past the page edge into the yellow margin. A cap
// any wider would reach past the margin onto the page; any narrower
// would leave part of the margin-facing corner unbordered.
const CORNER_CAP_CLASS = "absolute h-px w-2 bg-black";

/**
 * The two short black "corner caps" on an active tab's top and bottom
 * edges — see appearanceClassFor's comment for why a full-width
 * border-t/border-b doesn't work here.
 *
 * Active tabs are always left-side (see the "always LEFT-side" note on
 * TabColumn below) and therefore always rotated 180° (rotationClassFor).
 * That rotation is a point reflection through the box's own center, so
 * it maps local (x, y) → (32 - x, 96 - y) within the SAME unmoved
 * bounding box (32×96, this tab's own w-8/h-24): local bottom-right
 * (x=32, y=96) lands at screen (0, 0) — screen-top, screen-left, i.e.
 * the top-outer corner; local top-right (x=32, y=0) lands at screen
 * (0, 96) — screen-bottom, screen-left, the bottom-outer corner. Both
 * caps anchor on the local *right* edge (not left) for the same reason
 * appearanceClassFor's border-r does: border-right is the edge that
 * ends up screen-left (outer/margin-facing) once rotated. Verified via
 * a zoomed screenshot showing both caps landing on the margin side, not
 * the page side.
 */
function CornerCaps() {
  return (
    <>
      <div aria-hidden="true" className={`${CORNER_CAP_CLASS} bottom-0 right-0`} />
      <div aria-hidden="true" className={`${CORNER_CAP_CLASS} top-0 right-0`} />
    </>
  );
}

// Protrusion is a fixed 8px (-translate-x-[8px] / translate-x-[8px]
// below) — deliberately a pixel value, not a fraction of the tab's width,
// so it stays a known quantity: HardcoverShell's margin is 20px (p-5), so
// this must stay comfortably under that or a tab would poke past the
// persistent cover border itself, breaking the "cover fully hides the
// tabs when the book is closed" illusion. Tailwind's class scanner needs
// literal strings, not a variable, to generate the arbitrary-value CSS —
// keep the two class names below in sync with this comment if it changes.

interface TabColumnProps {
  side: "left" | "right";
  /** Which section (0 = About, 1 = Projects, 2 = Contact) this specific
   * page belongs to — a static fact about the page, not derived from
   * the current URL. */
  currentIndex: number;
}

/**
 * One edge's worth of notebook tabs. Rendered via `Page`'s `tabs` slot (a
 * sibling of the scrollable content, not a child of it — see Page.tsx),
 * and, like the page content itself, embedded per-page with a static
 * `currentIndex` rather than derived from the current route, so the tabs
 * are literally part of the DOM react-pageflip transforms — they turn
 * along with the page instead of sitting on top as a separate overlay.
 *
 * Every one of the 3 sections always renders a slot on both sides — a
 * real link if it belongs on that side (left: before-or-current, right:
 * after current), an `invisible` placeholder of the identical box
 * otherwise. This is load-bearing, not decorative: without it, a side
 * with fewer real tabs (e.g. About alone on the left of /about) renders a
 * shorter column than the opposite side (Projects+Contact stacked on the
 * right), so the two sides' slot spacing doesn't match up page to page.
 * Reserving all 3 slots on both sides always, regardless of which are
 * real, keeps every page's left/right slot heights identical.
 *
 * "You are here" active-tab detection calls useLocation() directly
 * here, rather than receiving the active section as a prop computed
 * once in book-layout.tsx — deliberately, not out of habit. Book.tsx
 * passes react-pageflip's `renderOnlyPageLengthChange`, and the
 * library's own source only re-renders its children (via its internal
 * `setPages`) when the page COUNT changes, never on ordinary prop
 * updates — our leaf count never changes, so any value threaded down
 * as a prop through <Page tabs={<TabColumn .../>} /> gets frozen at
 * whatever it was on the very first render after mount and never
 * updates again on subsequent client-side navigation (confirmed via a
 * real click-through repro: the tab active at initial mount stayed
 * "active" forever after, regardless of route). Calling useLocation()
 * inside TabColumn itself sidesteps that entirely: it's a live context
 * subscription, so this already-mounted component instance re-renders
 * directly off route changes, independent of whether react-pageflip
 * ever re-renders it with fresh props.
 */
export function TabColumn({ side, currentIndex }: TabColumnProps) {
  const location = useLocation();

  // top-14 (56px), not top-8 — DogEarFold occupies the top-left 32px
  // (h-8), so this leaves a clear 24px margin below it rather than
  // butting up against it. Applied to both sides, not just left, so the
  // fixed-slot height parity between columns (see doc comment above)
  // holds regardless of which corner the dog-ear is in.
  const positionClass =
    side === "left"
      ? "absolute left-0 top-14 flex -translate-x-[8px] flex-col gap-3"
      : "absolute right-0 top-14 flex translate-x-[8px] flex-col gap-3";

  return (
    <nav className={positionClass}>
      {SECTIONS.map((section, index) => {
        const belongsOnThisSide = side === "left" ? index <= currentIndex : index > currentIndex;
        const rotation = rotationClassFor(side);

        if (!belongsOnThisSide) {
          const tabClass = `${TAB_SHAPE_CLASS} ${appearanceClassFor(false)} ${rotation}`;
          return <div key={section.label} aria-hidden="true" className={`${tabClass} invisible`} />;
        }

        // startsWith, not an exact match — /projects/:slug (the project
        // detail overlay) should still read the Projects tab as active,
        // matching how targetPageIndexFor/isProjectDetail in
        // book-layout.tsx already treat that nested route as part of
        // the Projects section.
        const isActive = index === currentIndex && location.pathname.startsWith(section.to);
        const tabClass = `${TAB_SHAPE_CLASS} ${appearanceClassFor(isActive)} ${rotation}`;

        return (
          <Link key={section.label} to={section.to} className={tabClass}>
            {isActive && <CornerCaps />}
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
