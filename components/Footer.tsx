export function Footer() {
  return (
    // relative (no grain here) — the actual base-page-background texture
    // lives on <body> (globals.css, app/layout.tsx). Footer is a direct
    // sibling of <body>'s grain pseudo-element (via app/layout.tsx), so
    // body's own texture already covers this strip; `relative` stays so
    // this <footer> lands in the same CSS painting category as that
    // pseudo-element and receives it from behind rather than being
    // painted over — see .grain's comment in globals.css.
    <footer className="relative border-t border-rule px-6 py-8">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">© 2026 Uijin Cho</p>
    </footer>
  );
}
