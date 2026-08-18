import { TYPE } from "@/lib/design/type-scale";

// Stage 4 nav-target stub only — so the SiteNav's /about link isn't dead.
// Real content (bio, PhotoFrame photo, education, "currently" section) is
// Stage 7 per the build order.
export default function AboutStub() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className={`${TYPE.displayLg} text-ink`}>About</h1>
      <p className={`${TYPE.body} mt-4 text-ink-muted`}>PLACEHOLDER — real bio content lands in Stage 7.</p>
    </main>
  );
}
