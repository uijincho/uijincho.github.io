import Link from "next/link";
import { TYPE } from "@/lib/design/type-scale";

// Next.js convention: app/not-found.tsx replaces the framework's default
// 404 for any unmatched route, plus any explicit notFound() call (see
// app/work/[slug]/page.tsx). Base background (bg-base, same as every other
// page — no special treatment), one line of copy in the site's voice, and
// links back to the two real destinations rather than a dead end.
export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] flex-col items-center justify-center bg-base px-6 text-center">
      <p className={`${TYPE.meta}`}>404</p>
      <h1 className={`${TYPE.displayLg} mt-2 text-ink`}>Wrong page. Right notebook.</h1>
      <p className={`${TYPE.body} mt-4 max-w-[45ch] text-ink-muted`}>
        Whatever you were looking for isn&apos;t on this shelf — try one of these instead.
      </p>
      <div className="mt-8 flex gap-6">
        <Link href="/" className="font-mono text-xs uppercase tracking-wide text-accent hover:underline">
          home/
        </Link>
        <Link href="/work" className="font-mono text-xs uppercase tracking-wide text-accent hover:underline">
          work/
        </Link>
      </div>
    </main>
  );
}
