import { TYPE } from "@/lib/design/type-scale";
import { PhotoFrame } from "@/components/frames/PhotoFrame";
import { FlatFrame } from "@/components/frames/FlatFrame";

// Stage 1-3 scaffold check only. Replaced by the real content list in
// Stage 2's /work route and the notebook-spread hero in Stage 6.
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
        <h1 className={`${TYPE.displayXl} text-ink`}>Scaffold OK</h1>
        <p className={`${TYPE.body} text-ink`}>Inter UI/body text renders here.</p>
        <p className={`${TYPE.bodySerif} italic text-ink`}>
          Newsreader (MDX article prose only) renders here.
        </p>
        <p className={TYPE.meta}>JetBrains Mono meta text</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-1">
            <div className={`h-16 w-16 rounded ${s.className}`} />
            <span className={TYPE.meta}>{s.name}</span>
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

      {/*
        Design-system check: PhotoFrame vs FlatFrame side by side. Neither
        image file exists yet (real assets land later) — this deliberately
        exercises the missing-image fallback in lib/design/images.ts while
        still proving the two frames render structurally different chrome:
        PhotoFrame has rotation + drop shadow + bottom-weighted padding,
        FlatFrame has a flat hairline border and neither.
      */}
      <div className="mt-8 flex flex-wrap items-end justify-center gap-12">
        <PhotoFrame
          src="/images/people/demo-photo.jpg"
          alt="Demo photograph (placeholder, file does not exist yet)"
          width={160}
          height={160}
          rotationIndex={0}
          caption="Photo, rotationIndex=0"
        />
        <PhotoFrame
          src="/images/people/demo-photo-2.jpg"
          alt="Demo photograph (placeholder, file does not exist yet)"
          width={160}
          height={160}
          rotationIndex={3}
          caption="Photo, rotationIndex=3"
        />
        <FlatFrame
          src="/images/projects/demo-screenshot.png"
          alt="Demo screenshot (placeholder, file does not exist yet)"
          width={160}
          height={160}
          caption="Screenshot — no rotation, no shadow"
        />
      </div>
    </main>
  );
}
