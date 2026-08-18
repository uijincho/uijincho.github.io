import type { ProjectKind } from "@/lib/projects";

export const KIND_LABEL: Record<ProjectKind, string> = {
  software: "Software",
  research: "Research",
};

/**
 * Track accent — load-bearing per spec: this is how a visitor tells
 * software from research at a glance. Used on the category label and
 * index numbers ONLY. Individual tag pills deliberately do NOT use this —
 * they stay --color-ink-muted, per the corrected palette note ("tag
 * outlines... uses --color-ink-muted, not a new hue"). Putting accent
 * color on every tag pill (there can be several per project) would dilute
 * the signal that accent = track identity down to noise.
 */
export const KIND_ACCENT_TEXT: Record<ProjectKind, string> = {
  software: "text-accent",
  research: "text-support",
};
