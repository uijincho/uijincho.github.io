"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

/**
 * Site nav for interior pages, plus the landing route's scroll-to-reveal
 * behavior.
 *
 * Interior pages (/work, /work/[slug], /about): always visible, `sticky`,
 * reserves its own height normally.
 *
 * Landing route (/): the hero spec requires "100vh, no nav bar visible" —
 * nothing above the fold but the notebook. So on `/` this renders
 * `fixed` (out of flow, doesn't push the hero down). It watches for a
 * `#hero-sentinel` element — a marker the hero (Stage 6) places at its
 * own bottom edge — via IntersectionObserver, and reveals once the
 * visitor scrolls past it. Until Stage 6 adds that sentinel, no observer
 * is created and the default (visible) stands, so the nav never gets
 * stuck hidden on the current landing stub.
 *
 * State defaults to visible and is only ever corrected from inside the
 * IntersectionObserver's callback (including its own initial invocation,
 * which the browser fires once as soon as observe() is called) —
 * deliberately never a direct setState call in the effect body itself.
 */
export function SiteNav() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [pastHero, setPastHero] = useState(true);

  useEffect(() => {
    if (!isLanding) return;

    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return; // no hero built yet on this route — stays at the default (visible)

    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isLanding]);

  const visible = !isLanding || pastHero;

  return (
    <header
      className={[
        isLanding ? "fixed" : "sticky",
        "top-0 inset-x-0 z-50 border-b border-rule bg-base/90 backdrop-blur",
        "transition-[transform,opacity] duration-300 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
      ].join(" ")}
      aria-hidden={!visible}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4" aria-label="Primary">
        <Link href="/" className="font-display text-sm font-bold tracking-tight text-ink">
          Uijin Cho
        </Link>
        <ul className="flex gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-mono text-xs uppercase tracking-wide text-ink-muted hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
