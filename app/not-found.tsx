import Link from "next/link";
import { TYPE } from "@/lib/design/type-scale";

// 404 page: replaces the framework default for any unmatched route or explicit notFound() call.
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
        <Link href="/projects" className="font-mono text-xs uppercase tracking-wide text-accent hover:underline">
          projects/
        </Link>
      </div>
    </main>
  );
}
