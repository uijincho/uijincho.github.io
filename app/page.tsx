// Stage 1 scaffold check only. Replaced by the real content list in Stage 2
// and the notebook-spread hero in Stage 6.
const swatches = [
  { name: "base", className: "bg-base border border-rule" },
  { name: "raised", className: "bg-raised border border-rule" },
  { name: "ink", className: "bg-ink" },
  { name: "ink-muted", className: "bg-ink-muted" },
  { name: "accent", className: "bg-accent" },
  { name: "support", className: "bg-support" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-base p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          Scaffold OK
        </h1>
        <p className="font-sans text-lg text-ink">
          Inter UI/body text renders here.
        </p>
        <p className="font-serif text-lg italic text-ink">
          Newsreader (MDX article prose only) renders here.
        </p>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">
          JetBrains Mono meta text
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1">
            <div className={`h-16 w-16 rounded ${s.className}`} />
            <span className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
              {s.name}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <span className="rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wide text-base">
          SOFTWARE (accent pill)
        </span>
        <span className="rounded-full bg-support px-3 py-1 font-mono text-xs uppercase tracking-wide text-base">
          RESEARCH (support pill)
        </span>
      </div>
    </main>
  );
}
