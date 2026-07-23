const placeholderBio =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

/**
 * About page's left side: bio text alongside a defined profile-image
 * slot. Single physical page now (not a two-column spread), so image and
 * text sit side by side within it rather than as separate columns.
 */
export function BioPage() {
  return (
    <div className="flex h-full gap-4">
      <div className="flex w-1/3 shrink-0 items-center justify-center border border-black text-center text-xs text-neutral-400">
        profile image placeholder
      </div>
      <p className="flex-1 overflow-y-auto text-sm leading-relaxed">
        {placeholderBio}
      </p>
    </div>
  );
}
