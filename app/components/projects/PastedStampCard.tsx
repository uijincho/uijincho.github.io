interface PastedStampCardProps {
  slug: string;
}

const placeholderDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const placeholderTags = ["placeholder tag", "placeholder tag", "placeholder link"];

/**
 * Detail-view content shown inside the full-screen project overlay,
 * which is sized to the same 5:6 proportions as the StampCard it was
 * opened from. Stacked vertically (image on top, text below) since that
 * portrait shape leaves little width for a side-by-side split. Offset +
 * shadow (scaled up from the earlier small placeholder) suggest a page
 * pasted on top of the book; still placeholder-level texture, not final
 * art.
 */
export function PastedStampCard({ slug }: PastedStampCardProps) {
  return (
    <div className="relative flex h-full w-full -translate-y-2 translate-x-2 flex-col gap-4 border border-black bg-white p-6 shadow-2xl">
      <div className="flex h-1/3 shrink-0 items-center justify-center border border-black text-sm text-neutral-400">
        project image placeholder
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <h2 className="text-lg font-medium">Project — {slug}</h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          {placeholderDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 border-t border-black pt-4">
          {placeholderTags.map((tag, index) => (
            <span key={index} className="border border-black px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
