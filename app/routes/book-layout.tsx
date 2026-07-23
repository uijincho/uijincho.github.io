import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AsciiRippleBackground } from "~/components/layout/AsciiRippleBackground";
import { BackEndpaper } from "~/components/layout/BackEndpaper";
import { Book, type BookHandle, type PageFlipController } from "~/components/layout/Book";
import { DogEarFold } from "~/components/layout/DogEarFold";
import { HardcoverShell } from "~/components/layout/HardcoverShell";
import { Page } from "~/components/layout/Page";
import { TabColumn } from "~/components/layout/TabColumn";
import { BioPage } from "~/components/about/BioPage";
import { ProjectJournal } from "~/components/about/ProjectJournal";
import { TabbedCard } from "~/components/landing/TabbedCard";
import { TopographicIllustration } from "~/components/landing/TopographicIllustration";
import { StampGrid } from "~/components/projects/StampGrid";
import { projects } from "~/data/projects";

const splitAt = Math.ceil(projects.length / 2);
const leftPageProjects = projects.slice(0, splitAt);
const rightPageProjects = projects.slice(splitAt);

// Each top-level route owns one left/right page pair (even index = left
// page) inside the single persistent flip book below. Order matches the
// physical page sequence: Landing → About → Projects → Contact. All 8
// leaves turn with the same soft flip physics — no showCover/hard-page
// treatment anywhere in this sequence.
const PAGE_INDEX = { landing: 0, about: 2, projects: 4, contact: 6 } as const;

// Section index (0 = About, 1 = Projects, 2 = Contact) each route's pages
// belong to — used by the TabColumn embedded in those pages.
const SECTION_INDEX = { about: 0, projects: 1, contact: 2 } as const;

// Normal single-leaf speed (matches Book.tsx's flippingTime={1400} prop,
// which just seeds this same value at construction) vs. the speed used
// for every leg of a multi-leaf jump EXCEPT the very last one. Without
// this, a 3+ leaf journey (e.g. About → Contact) reads as several equal,
// separately-timed flips in a row rather than one gesture — riffling the
// intervening leaves quickly and only settling at normal speed on the
// final leaf is what actually sells "one movement, multiple pages
// passed" instead of a string of look-alike individual turns.
const NORMAL_FLIP_MS = 1400;
const FAST_FLIP_MS = 500;

function targetPageIndexFor(pathname: string): number {
  if (pathname.startsWith("/contact")) return PAGE_INDEX.contact;
  if (pathname.startsWith("/projects")) return PAGE_INDEX.projects;
  if (pathname.startsWith("/about")) return PAGE_INDEX.about;
  return PAGE_INDEX.landing;
}

function routeForPageIndex(pageIndex: number): string {
  if (pageIndex >= PAGE_INDEX.contact) return "/contact";
  if (pageIndex >= PAGE_INDEX.projects) return "/projects";
  if (pageIndex >= PAGE_INDEX.about) return "/about";
  return "/";
}

// Sets the speed for the NEXT single leg of a step sequence, based on
// whether it's the last one: fast (riffling through) for every
// intermediate leg, normal (settling) for the leg that actually lands on
// the target — see NORMAL_FLIP_MS/FAST_FLIP_MS above.
function applyLegSpeed(pageFlip: PageFlipController, from: number, target: number): void {
  pageFlip.getSettings().flippingTime = Math.abs(target - from) === 1 ? NORMAL_FLIP_MS : FAST_FLIP_MS;
}

/**
 * Pathless parent layout for /, /about, /projects and /contact (see
 * routes.ts). A real book has all its pages physically present at once,
 * so this is where that content actually lives — one persistent
 * HTMLFlipBook instance holds all four routes' page content
 * simultaneously, and navigating between them just tells it which page
 * to flip to, rather than each route mounting its own independent frame
 * with no transition between them. The /projects/:slug overlay is
 * unrelated to the flip mechanic — it's layered on top, not a book page
 * — so it renders independently of the sync logic here.
 */
export default function BookLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookRef = useRef<BookHandle>(null);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isProjectDetail = pathSegments[0] === "projects" && pathSegments.length > 1;
  const isLanding = location.pathname === "/";
  const targetPageIndex = targetPageIndexFor(location.pathname);

  // The leaf we're currently trying to reach, read fresh inside the step
  // sequencer below rather than captured in a stale effect closure — lets
  // a target change mid-sequence (e.g. clicking a different tab before an
  // in-flight turn finishes) redirect the chain instead of racing it.
  const targetRef = useRef(targetPageIndex);
  useEffect(() => {
    targetRef.current = targetPageIndex;
  }, [targetPageIndex]);

  // True while we're driving a programmatic multi-leaf turn (see
  // handleFlip below) — distinguishes those intermediate stops from a
  // real user-driven flip, and prevents the effect below from starting a
  // second overlapping sequence while one is already in flight.
  const isAutoFlippingRef = useRef(false);

  // Kicks off (or redirects) the step sequence whenever the URL implies a
  // different target leaf than the book is currently on. Real books turn
  // one leaf at a time even when you're skipping several sections, so
  // this deliberately doesn't jump straight there — flip()/turnToPage()
  // would snap through every intervening spread instantly and animate
  // only the last one. Instead it issues a single flipNext()/flipPrev(),
  // and handleFlip's onFlip continuation (fired when that turn's
  // animation completes) issues the next one, and so on until the target
  // is reached — one physical turn per leaf crossed.
  //
  // Landing is the one exception: the only way back there is the dog-ear
  // (no tab links to it), and marching back leaf-by-leaf through every
  // passed section reads as slow/clunky rather than a single close of the
  // book. So a return to Landing uses flip() directly instead of the step
  // queue — every intervening spread snaps instantly and only the very
  // last leaf (into Landing) animates, i.e. exactly the "bundle the pages
  // together, flip straight there" behavior flip() gives you for free.
  //
  // Every programmatic flip below is anchored at the "bottom" corner, not
  // page-flip's default "top". page-flip's HTMLPage.drawSoft() overwrites
  // the flipping/revealed leaf's inline style every animation frame,
  // including a clip-path polygon sized to the page's own nominal
  // rectangle — it has no notion of TabColumn's tabs poking past that
  // edge. A top-anchored fold reveals top-to-bottom, so it clips hardest
  // exactly where the tabs are (near the top, just under DogEarFold);
  // anchoring at the bottom instead means the top of the page — tabs
  // included — stays within the revealed area throughout the turn.
  useEffect(() => {
    const pageFlip = bookRef.current?.pageFlip();
    if (!pageFlip) return;
    if (isAutoFlippingRef.current) return;
    const current = pageFlip.getCurrentPageIndex();
    if (current === targetPageIndex) return;

    if (targetPageIndex === PAGE_INDEX.landing) {
      pageFlip.getSettings().flippingTime = NORMAL_FLIP_MS;
      pageFlip.flip(targetPageIndex, "bottom");
      return;
    }

    isAutoFlippingRef.current = true;
    applyLegSpeed(pageFlip, current, targetPageIndex);
    if (targetPageIndex > current) pageFlip.flipNext("bottom");
    else pageFlip.flipPrev("bottom");
  }, [targetPageIndex]);

  // Fires after every completed single-leaf turn, both user-driven
  // (dragging the cover open) and the programmatic step sequence above.
  function handleFlip(newPageIndex: number) {
    const pageFlip = bookRef.current?.pageFlip();
    if (isAutoFlippingRef.current && pageFlip) {
      if (newPageIndex === targetRef.current) {
        isAutoFlippingRef.current = false;
        pageFlip.getSettings().flippingTime = NORMAL_FLIP_MS;
        return;
      }

      // Deferred, not called inline: this fires from inside page-flip's
      // own animation-end handling (Render's rAF loop calls the 'flip'
      // trigger, which reaches here, before it unsets its internal
      // animation state). Calling flipNext()/flipPrev() synchronously
      // here re-enters Render.startAnimation() while that cleanup is
      // still on the stack — its finishAnimation() call replays the
      // stale callback and sets up the new animation, which the *outer*
      // rAF loop then immediately nulls out on unwind, before a single
      // frame of it ever renders (confirmed by logging real timestamps:
      // two 'flip' events fired ~1ms apart instead of one flippingTime
      // apart).
      //
      // A microtask is enough deferral to dodge that — it runs once the
      // current synchronous call stack unwinds (which includes the outer
      // render()'s own `this.animation = null` cleanup), same as
      // setTimeout(..., 0), but without waiting for the next macrotask/
      // paint. That gap is exactly what made chained legs read as
      // separate flips instead of one continuous motion; closing it (on
      // top of the fast intermediate-leg speed above) is what actually
      // sells "one movement, multiple pages passed."
      queueMicrotask(() => {
        applyLegSpeed(pageFlip, newPageIndex, targetRef.current);
        if (targetRef.current > newPageIndex) pageFlip.flipNext("bottom");
        else pageFlip.flipPrev("bottom");
      });
      return;
    }

    const nextRoute = routeForPageIndex(newPageIndex);
    if (nextRoute !== routeForPageIndex(targetRef.current)) {
      navigate(nextRoute);
    }
  }

  return (
    <>
      <AsciiRippleBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <HardcoverShell>
          {/* Shared positioning box for BackEndpaper (sized off this
              wrapper's own footprint) and the book itself. */}
          <div className="relative">
            <BackEndpaper />
            {/*
              size="stretch" on the flip book needs a parent with a concrete
              width to stretch into — without one it collapses to its
              per-page minWidth/minHeight and renders single-page instead of
              a two-page spread. This reproduces BookFrame's old landscape
              (~3:2) viewport-fraction sizing: each page is a 3:4 rectangle,
              so a two-page spread is 3:2, hence 127.5vh = 85vh * 1.5.
            */}
            <div className="relative" style={{ width: "min(85vw, 127.5vh)" }}>
              <Book
                ref={bookRef}
                startPage={targetPageIndex}
                dimmed={isProjectDetail}
                interactive={isLanding}
                onFlip={handleFlip}
              >
                <Page endpaper>
                  <TopographicIllustration />
                </Page>
                <Page endpaper>
                  <div className="relative flex h-full flex-col">
                    <TabbedCard />
                    {/* Corner-curl hint: turn the page, there's more here.
                        Purely decorative — react-pageflip's own corner/edge
                        drag detection handles the actual interaction. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 [clip-path:polygon(100%_0,0%_100%,100%_100%)] bg-neutral-300"
                    />
                  </div>
                </Page>
                <Page tabs={<TabColumn side="left" currentIndex={SECTION_INDEX.about} />} tabSide="left">
                  <BioPage />
                </Page>
                <Page tabs={<TabColumn side="right" currentIndex={SECTION_INDEX.about} />} tabSide="right">
                  <ProjectJournal />
                </Page>
                <Page tabs={<TabColumn side="left" currentIndex={SECTION_INDEX.projects} />} tabSide="left">
                  <StampGrid stamps={leftPageProjects} />
                </Page>
                <Page tabs={<TabColumn side="right" currentIndex={SECTION_INDEX.projects} />} tabSide="right">
                  <StampGrid stamps={rightPageProjects} />
                </Page>
                <Page tabs={<TabColumn side="left" currentIndex={SECTION_INDEX.contact} />} tabSide="left">
                  <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                    Contact page placeholder
                  </div>
                </Page>
                <Page tabs={<TabColumn side="right" currentIndex={SECTION_INDEX.contact} />} tabSide="right">
                  <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                    Contact page placeholder
                  </div>
                </Page>
              </Book>
              {/* Dog-ear last so it paints on top of the book; sits at the
                  current (left) page's top-left corner. Hidden on Landing. */}
              {!isLanding && <DogEarFold />}
            </div>
          </div>
        </HardcoverShell>
      </div>
      <Outlet />
    </>
  );
}
