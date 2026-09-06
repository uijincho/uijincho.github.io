"use client";

import { useState } from "react";

type Filter = "all" | "software" | "research";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "software", label: "Software" },
  { value: "research", label: "Research" },
];

/**
 * Mobile-only horizontal filter row. Sets a `data-active-filter`
 * attribute; the actual show/hide is a CSS rule in globals.css.
 */
export function WorkFilter({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div>
      <div className="mb-8 flex gap-4 md:hidden" role="tablist" aria-label="Filter projects by track">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`font-mono text-xs uppercase tracking-wide ${
              filter === f.value ? "text-accent" : "text-ink-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div data-active-filter={filter}>{children}</div>
    </div>
  );
}
