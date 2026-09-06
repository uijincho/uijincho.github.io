import fs from "fs";
import path from "path";

export { PLACEHOLDER_LABEL } from "./placeholder-label";

/**
 * Resolves a public/ image path, checking it exists on disk, so a
 * missing file falls back to a placeholder frame instead of a broken
 * image icon. Server-only: reads the filesystem.
 */
export function resolveImage(src: string): { src: string | null; isPlaceholder: boolean } {
  const relative = src.replace(/^\//, "");
  const absolute = path.join(process.cwd(), "public", relative);
  const exists = fs.existsSync(absolute);
  return { src: exists ? src : null, isPlaceholder: !exists };
}
