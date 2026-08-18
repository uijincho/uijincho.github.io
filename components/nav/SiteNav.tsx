"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

// Site-level only: Work, About, Contact. Deliberately does NOT list
// individual projects or duplicate the /work index's sidebar — that
// sidebar owns in-page navigation between projects, the top nav owns
// navigation between sections of the site.
//
// Contact is an in-page anchor on /about (#contact), not its own route —
// see the isActive logic below, which only highlights real routes.
const LINKS = [
  { href: "/work", label: "work/" },
  { href: "/about", label: "about/" },
  { href: "/about#contact", label: "contact/" },
];

/**
 * Site nav.
 *
 * Interior pages (/work, /work/[slug], /about): always visible, `sticky`
 * from the top, no fade — a completely separate render path from the
 * landing route below, so "no fade" is a structural guarantee (no
 * transition classes present at all) rather than an animation that
 * happens to never trigger.
 *
 * Landing route (/): the hero spec requires "100vh, no nav bar visible" —
 * nothing above the fold but the notebook. So on `/` this renders `fixed`
 * (out of flow, doesn't push the hero down) and starts hidden. It watches
 * for a `#hero-sentinel` element — a marker the hero (Stage 6) places at
 * its own bottom edge — via IntersectionObserver (never a scroll-offset
 * listener), fading in and sticking to the top once the visitor scrolls
 * past it. Until Stage 6 adds that sentinel, no observer is created and
 * the default (visible) stands, so the nav never gets stuck hidden on
 * the current landing stub.
 *
 * State defaults to visible and is only ever corrected from inside the
 * IntersectionObserver's callback (including its own initial invocation,
 * which the browser fires once as soon as observe() is called) —
 * deliberately never a direct setState call in the effect body itself
 * (react-hooks/set-state-in-effect).
 *
 * Under prefers-reduced-motion, `motion-reduce:transition-none` drops the
 * fade entirely — the reveal still happens at the same scroll point, it
 * just snaps instead of animating.
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
      className={
        isLanding
          ? [
              "fixed top-0 inset-x-0 z-50 border-b border-rule bg-base/90 backdrop-blur",
              "transition-[transform,opacity] duration-300 motion-reduce:transition-none",
              visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
            ].join(" ")
          : "sticky top-0 inset-x-0 z-50 border-b border-rule bg-base/90 backdrop-blur"
      }
      aria-hidden={!visible}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4" aria-label="Primary">
        <Link href="/" className={`${mono.className} text-sm font-bold tracking-tight text-ink`}>
          ~uijincho
        </Link>
        <ul className="flex gap-6">
          {LINKS.map((l) => {
            // Only a real route (no #fragment) counts as "current route"
            // for the maroon active indicator. Contact is an anchor on
            // /about, not a distinct route, so it's never marked active —
            // that reading matches "current route indicated in maroon"
            // literally.
            const isActive = !l.href.includes("#") && pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-xs tracking-wide ${
                    isActive ? "text-accent" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
