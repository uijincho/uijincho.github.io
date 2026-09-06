"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"] });

// Top-level nav links: Work and About. Individual projects are navigated via
// the /work index sidebar, not here.
const LINKS = [
  { href: "/#section-software", label: "projects/" },
  { href: "/about", label: "about/" },
];

/**
 * Site nav.
 *
 * Interior pages (/work, /work/[slug], /about): always visible, sticky
 * from the top, no fade.
 *
 * Landing route (/): starts hidden and fixed (out of flow, above the
 * hero). Watches for a `#hero-sentinel` element the hero places at its
 * own bottom edge via IntersectionObserver, fading in once the visitor
 * scrolls past it.
 *
 * Under prefers-reduced-motion, the fade is dropped and the reveal snaps
 * instead of animating.
 */
export function SiteNav() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [pastHero, setPastHero] = useState(true);

  useEffect(() => {
    if (!isLanding) return;

    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

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
              "transition-[transform,opacity] duration-500 motion-reduce:transition-none",
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
            // Only a real route (no #fragment) is marked as the active link.
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
