import fs from "fs";
import path from "path";

export const PLACEHOLDER_LABEL = "NO IMAGE";

/**
 * Resolves a public/ image path, checking it actually exists on disk.
 * All placeholder project content currently references image paths that
 * don't exist yet (real photos land later) — this makes that fail
 * gracefully as a neutral placeholder frame instead of next/image's
 * broken-image icon.
 *
 * Server-only: reads the filesystem, so callers must not be "use client"
 * components. Both PhotoFrame and FlatFrame are server components for
 * this reason.
 */
export function resolveImage(src: string): { src: string | null; isPlaceholder: boolean } {
  const relative = src.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", relative);
  const exists = fs.existsSync(absolute);
  return { src: exists ? src : null, isPlaceholder: !exists };
}
