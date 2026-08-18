// Stage 1 scaffold check only. Replaced by the real content list in Stage 2
// and the notebook-spread hero in Stage 6.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 p-8">
      <h1 className="font-sans text-4xl font-bold tracking-tight text-neutral-900">
        Scaffold OK
      </h1>
      <p className="font-serif text-lg text-neutral-700">
        Newsreader body text renders here.
      </p>
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
        JetBrains Mono meta text
      </p>
    </main>
  );
}
