import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectKind = "software" | "research";

interface ProjectLinksBase {
  repo?: string;
  demo?: string;
  paper?: string;
  code?: string;
}

interface ProjectFrontmatterBase {
  title: string;
  slug: string;
  order: number;
  summary: string;
  role: string;
  timeline: string;
  tags: string[];
  // One image per project. Reverted from a `thumbnails: [string, string]`
  // tuple (Stage 2) back to this original singular field — see the /work
  // index layout, which now shows a single image beside each entry
  // instead of two thumbnails below it.
  thumbnail: string;
  featured: boolean;
  links: ProjectLinksBase;
}

export interface SoftwareProject extends ProjectFrontmatterBase {
  kind: "software";
  stack: string[];
}

export interface ResearchProject extends ProjectFrontmatterBase {
  kind: "research";
  lab: string;
  /** Omit entirely for solo projects — ProjectMeta only renders this line when present. */
  collaborators?: string[];
}

export type ProjectFrontmatter = SoftwareProject | ResearchProject;

/** Raw MDX body, not yet compiled. Compilation happens in the route via next-mdx-remote. */
export type Project = ProjectFrontmatter & { content: string };

class ProjectValidationError extends Error {
  constructor(file: string, issue: string) {
    super(`Invalid frontmatter in content/projects/${file}: ${issue}`);
    this.name = "ProjectValidationError";
  }
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

/**
 * Validates raw frontmatter (parsed as `unknown` by gray-matter) into a
 * typed ProjectFrontmatter, throwing a descriptive error on the first
 * problem found. Placeholder content is expected to be obviously fake, but
 * it must still be structurally valid — this is not optional even for
 * placeholders, since Stage 5's layout branches on `kind`.
 */
function validateFrontmatter(file: string, data: Record<string, unknown>): ProjectFrontmatter {
  const required: [string, (v: unknown) => boolean][] = [
    ["title", isNonEmptyString],
    ["slug", isNonEmptyString],
    ["order", (v) => typeof v === "number"],
    ["summary", isNonEmptyString],
    ["role", isNonEmptyString],
    ["timeline", isNonEmptyString],
    ["tags", isStringArray],
    ["thumbnail", isNonEmptyString],
    ["featured", (v) => typeof v === "boolean"],
  ];

  for (const [key, check] of required) {
    if (!check(data[key])) {
      throw new ProjectValidationError(file, `missing or malformed "${key}"`);
    }
  }

  if (data.kind !== "software" && data.kind !== "research") {
    throw new ProjectValidationError(file, `"kind" must be "software" or "research", got ${JSON.stringify(data.kind)}`);
  }

  const links = (data.links ?? {}) as Record<string, unknown>;
  for (const key of ["repo", "demo", "paper", "code"]) {
    if (key in links && typeof links[key] !== "string") {
      throw new ProjectValidationError(file, `"links.${key}" must be a string if present`);
    }
  }

  const base = {
    title: data.title as string,
    slug: data.slug as string,
    order: data.order as number,
    summary: data.summary as string,
    role: data.role as string,
    timeline: data.timeline as string,
    tags: data.tags as string[],
    thumbnail: data.thumbnail as string,
    featured: data.featured as boolean,
    links: links as ProjectLinksBase,
  };

  if (data.kind === "software") {
    if (!isStringArray(data.stack)) {
      throw new ProjectValidationError(file, `kind "software" requires a string[] "stack" field`);
    }
    return { ...base, kind: "software", stack: data.stack };
  }

  if (!isNonEmptyString(data.lab)) {
    throw new ProjectValidationError(file, `kind "research" requires a non-empty "lab" field`);
  }
  // Optional — omit entirely for solo projects rather than faking an entry.
  if ("collaborators" in data && !isStringArray(data.collaborators)) {
    throw new ProjectValidationError(file, `"collaborators" must be a string[] if present`);
  }
  return {
    ...base,
    kind: "research",
    lab: data.lab,
    collaborators: data.collaborators as string[] | undefined,
  };
}

let cache: Project[] | null = null;

function loadAllProjects(): Project[] {
  // NOTE: this in-memory cache is fine in production (generateStaticParams
  // runs it once per `next build`) but means content/projects/*.mdx edits
  // are NOT picked up by a long-running `next dev` process — .mdx files
  // aren't part of the Turbopack module graph, so Fast Refresh doesn't
  // invalidate this. Restart `next dev` after editing content files.
  if (cache) return cache;

  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const frontmatter = validateFrontmatter(file, data);

    if (path.basename(file, ".mdx") !== frontmatter.slug) {
      throw new ProjectValidationError(
        file,
        `filename does not match "slug: ${frontmatter.slug}" — rename the file or fix the slug`
      );
    }

    return { ...frontmatter, content };
  });

  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) {
      throw new ProjectValidationError(`${p.slug}.mdx`, `duplicate slug "${p.slug}"`);
    }
    slugs.add(p.slug);
  }

  cache = projects.sort((a, b) => a.order - b.order);
  return cache;
}

export function getAllProjects(): Project[] {
  return loadAllProjects();
}

export function getProjectsByKind(kind: ProjectKind): Project[] {
  return loadAllProjects().filter((p) => p.kind === kind);
}

export function getFeaturedProjects(): Project[] {
  return loadAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return loadAllProjects().find((p) => p.slug === slug);
}
