import type { ProjectKind } from "@/lib/projects";

export const KIND_LABEL: Record<ProjectKind, string> = {
  software: "Software",
  research: "Research",
};

/**
 * Track accent, used on the category label and index numbers ONLY.
 * Both kinds intentionally share the same hue (--color-support) — per
 * request, software and research read as one identical accent color
 * rather than each track having its own. Individual tag pills
 * deliberately do NOT use this — they stay --color-ink-muted, per the
 * corrected palette note ("tag outlines... uses --color-ink-muted, not a
 * new hue").
 */
export const KIND_ACCENT_TEXT: Record<ProjectKind, string> = {
  software: "text-support",
  research: "text-support",
};
