/**
 * Split out from images.ts on purpose: this file has zero dependencies
 * (no fs/path), so it's safe to import from "use client" components too.
 * images.ts itself (resolveImage) stays server-only — see its own doc
 * comment — but the label text alone has no such restriction.
 */
export const PLACEHOLDER_LABEL = "NO IMAGE";
