import type { ProjectKind } from "@/lib/projects";

export const KIND_LABEL: Record<ProjectKind, string> = {
  software: "Software",
  research: "Research",
};

/** Track accent color for category labels and index numbers; both kinds share the same hue. */
export const KIND_ACCENT_TEXT: Record<ProjectKind, string> = {
  software: "text-support",
  research: "text-support",
};
