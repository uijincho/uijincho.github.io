import { forwardRef, useEffect, useImperativeHandle, useRef, type ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";

export interface PageFlipController {
  getCurrentPageIndex(): number;
  flip(page: number): void;
  getSettings(): { useMouseEvents: boolean; showPageCorners: boolean };
  getUI(): { setHandlers(): void; removeHandlers(): void };
}

export type BookHandle = { pageFlip: () => PageFlipController };

interface BookProps {
  children: ReactNode;
  startPage: number;
  dimmed?: boolean;
  interactive: boolean;
  onFlip: (pageIndex: number) => void;
}

/**
 * Wraps react-pageflip's HTMLFlipBook. react-pageflip requires numeric
 * width/height (it measures real page geometry for the 3D turn), so this
 * replaces BookFrame's old `w-[min(85vw,127.5vh)] aspect-[3/2]` viewport-
 * fraction sizing with `size="stretch"` + min/max bounds — the closest
 * equivalent the library supports, still responsive within those caps.
 *
 * flippingTime is well above the library's 1000ms default to keep the
 * turn slow and physical rather than snappy. disableFlipByClick restricts
 * click-only (no drag) flips to page corners.
 *
 * `interactive` toggles corner-drag turning (only meant to work on
 * Landing) on a single persistent instance — this used to be done by
 * remounting the whole book on a route-derived `key`, but that caused a
 * visible flicker/double-flip right as the remount landed. react-pageflip
 * only reads useMouseEvents/showPageCorners once, at construction, so
 * toggling the prop alone does nothing on a live instance; the effect
 * below reaches into the underlying PageFlip/UI objects directly instead
 * (mutating the settings object react-pageflip reads live for
 * showPageCorners, and re-running the UI class's protected
 * setHandlers()/removeHandlers() — accessed via an `as unknown` cast —
 * to actually attach/detach the mousedown/touchstart listeners that
 * useMouseEvents gates). No remount, no flicker.
 */
export const Book = forwardRef<BookHandle, BookProps>(function Book(
  { children, startPage, dimmed = false, interactive, onFlip },
  ref,
) {
  const innerRef = useRef<BookHandle>(null);

  useImperativeHandle(ref, () => ({ pageFlip: () => innerRef.current!.pageFlip() }), []);

  useEffect(() => {
    const pageFlip = innerRef.current?.pageFlip();
    if (!pageFlip) return;
    const settings = pageFlip.getSettings();
    settings.useMouseEvents = interactive;
    settings.showPageCorners = interactive;
    const ui = pageFlip.getUI() as unknown as {
      setHandlers(): void;
      removeHandlers(): void;
    };
    ui.removeHandlers();
    if (interactive) ui.setHandlers();
  }, [interactive]);

  return (
    <div
      className={`transition-[filter] duration-200 ${
        dimmed ? "pointer-events-none blur-sm brightness-75" : ""
      }`}
    >
      <HTMLFlipBook
        ref={innerRef}
        className=""
        style={{}}
        renderOnlyPageLengthChange
        width={360}
        height={480}
        size="stretch"
        minWidth={220}
        maxWidth={900}
        minHeight={293}
        maxHeight={1200}
        startPage={startPage}
        drawShadow
        flippingTime={1400}
        usePortrait
        startZIndex={10}
        autoSize
        maxShadowOpacity={0.4}
        showCover={false}
        mobileScrollSupport
        clickEventForward
        useMouseEvents={interactive}
        swipeDistance={30}
        showPageCorners={interactive}
        disableFlipByClick
        onFlip={(event: { data: number }) => onFlip(event.data)}
      >
        {children}
      </HTMLFlipBook>
    </div>
  );
});
