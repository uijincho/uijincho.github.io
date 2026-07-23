import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AsciiRippleBackground } from "~/components/layout/AsciiRippleBackground";
import { Book, type BookHandle } from "~/components/layout/Book";
import { CoverBookmark } from "~/components/layout/CoverBookmark";
import { Page } from "~/components/layout/Page";
import { TabColumn } from "~/components/layout/TabColumn";
import { BioPage } from "~/components/about/BioPage";
import { ProjectJournal } from "~/components/about/ProjectJournal";
import { TabbedCard } from "~/components/landing/TabbedCard";
import { TopographicIllustration } from "~/components/landing/TopographicIllustration";
import { ProjectsSheet } from "~/components/projects/ProjectsSheet";
import { StampGrid } from "~/components/projects/StampGrid";
import { projects } from "~/data/projects";

const splitAt = Math.ceil(projects.length / 2);
const leftPageProjects = projects.slice(0, splitAt);
const rightPageProjects = projects.slice(splitAt);

// Each top-level route owns one left/right page pair (even index = left
// page) inside the single persistent flip book below. Order matches the
// physical page sequence: Landing (cover) → About → Projects → Contact.
const PAGE_INDEX = { landing: 0, about: 2, projects: 4, contact: 6 } as const;

// Section index (0 = About, 1 = Projects, 2 = Contact) each route's pages
// belong to — used by the TabColumn embedded in those pages.
const SECTION_INDEX = { about: 0, projects: 1, contact: 2 } as const;

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

/**
 * Pathless parent layout for /, /about, /projects and /contact (see
 * routes.ts). A real book has all its pages physically present at once,
 * so this is where that content actually lives — one persistent
 * HTMLFlipBook instance holds all four routes' page content
 * simultaneously, and navigating between them just tells it which page
 * to flip to, rather than each route mounting its own independent frame
 * with no transition between them. The /projects/:slug overlay and the
 * /projects "sheet" (see below) are unrelated to the flip mechanic —
 * they're layered on top, not book pages — so they render independently
 * of the sync logic here.
 */
export default function BookLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookRef = useRef<BookHandle>(null);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isProjectDetail = pathSegments[0] === "projects" && pathSegments.length > 1;
  const isSheet =
    location.pathname === "/projects" &&
    Boolean((location.state as { viaSheet?: boolean } | null)?.viaSheet);
  const isLanding = location.pathname === "/";
  const targetPageIndex = targetPageIndexFor(location.pathname);

  // Keep the book in sync with the URL — covers Link clicks, the tab
  // columns, the ribbon, and direct loads (via startPage on first
  // mount). Guarded by an index comparison so a user-driven drag flip
  // (handled below) doesn't get immediately re-triggered once the
  // resulting navigate() lands here. Skipped entirely while the
  // /projects sheet is open — that transition intentionally never
  // touches the book.
  useEffect(() => {
    if (isSheet) return;
    const pageFlip = bookRef.current?.pageFlip();
    if (!pageFlip) return;
    if (pageFlip.getCurrentPageIndex() !== targetPageIndex) {
      pageFlip.flip(targetPageIndex);
    }
  }, [targetPageIndex, isSheet]);

  // Reads window.location directly (not the `location` captured in this
  // render's closure): react-pageflip only re-subscribes its onFlip
  // listener when its internal page count changes, which our fixed
  // page book never does after mount, so whichever render's closure ends
  // up registered has to stay correct indefinitely. navigate is a stable
  // reference, so this remains correct regardless.
  function handleFlip(newPageIndex: number) {
    const nextRoute = routeForPageIndex(newPageIndex);
    const currentPageIndex = targetPageIndexFor(window.location.pathname);
    if (routeForPageIndex(newPageIndex) !== routeForPageIndex(currentPageIndex)) {
      navigate(nextRoute);
    }
  }

  return (
    <>
      <AsciiRippleBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        {/*
          size="stretch" on the flip book needs a parent with a concrete
          width to stretch into — without one it collapses to its
          per-page minWidth/minHeight and renders single-page instead of
          a two-page spread. This reproduces BookFrame's old landscape
          (~3:2) viewport-fraction sizing: each page is a 3:4 rectangle,
          so a two-page spread is 3:2, hence 127.5vh = 85vh * 1.5.
        */}
        <div className="relative" style={{ width: "min(85vw, 127.5vh)" }}>
          {/* Ribbon first so it paints behind the book; positioned off
              its bottom edge, not draped over the top. Hidden on Landing. */}
          {!isLanding && <CoverBookmark />}
          <Book
            ref={bookRef}
            startPage={targetPageIndex}
            dimmed={isProjectDetail || isSheet}
            interactive={isLanding}
            onFlip={handleFlip}
          >
            <Page>
              <TopographicIllustration />
            </Page>
            <Page>
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
            <Page>
              <div className="relative h-full">
                <TabColumn side="left" currentIndex={SECTION_INDEX.about} />
                <BioPage />
              </div>
            </Page>
            <Page>
              <div className="relative h-full">
                <TabColumn side="right" currentIndex={SECTION_INDEX.about} />
                <ProjectJournal />
              </div>
            </Page>
            <Page>
              <div className="relative h-full">
                <TabColumn side="left" currentIndex={SECTION_INDEX.projects} />
                <StampGrid stamps={leftPageProjects} />
              </div>
            </Page>
            <Page>
              <div className="relative h-full">
                <TabColumn side="right" currentIndex={SECTION_INDEX.projects} />
                <StampGrid stamps={rightPageProjects} />
              </div>
            </Page>
            <Page>
              <div className="relative h-full">
                <TabColumn side="left" currentIndex={SECTION_INDEX.contact} />
                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                  Contact page placeholder
                </div>
              </div>
            </Page>
            <Page>
              <div className="relative h-full">
                <TabColumn side="right" currentIndex={SECTION_INDEX.contact} />
                <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                  Contact page placeholder
                </div>
              </div>
            </Page>
          </Book>
        </div>
      </div>
      {isSheet && <ProjectsSheet />}
      <Outlet />
    </>
  );
}
