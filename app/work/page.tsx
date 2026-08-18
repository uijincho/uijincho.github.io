import { getAllProjects, getProjectsByKind, getFeaturedProjects } from "@/lib/projects";

// Stage 2 proof-of-life only: a deliberately unstyled list confirming
// lib/projects.ts reads, parses, and validates all 10 placeholder MDX
// files correctly. Replaced by the real two-column editorial index in
// Stage 5 — see the build prompt's /work index spec.
export default function WorkIndexStub() {
  const all = getAllProjects();
  const software = getProjectsByKind("software");
  const research = getProjectsByKind("research");
  const featured = getFeaturedProjects();

  return (
    <main style={{ padding: 32, fontFamily: "monospace" }}>
      <h1>Stage 2 content layer check</h1>
      <p>
        {all.length} total / {software.length} software / {research.length} research /{" "}
        {featured.length} featured
      </p>
      <ul>
        {all.map((p) => (
          <li key={p.slug} style={{ marginBottom: 16 }}>
            <div>
              #{p.order} [{p.kind}] <strong>{p.title}</strong>
              {p.featured ? " ★ featured" : ""}
            </div>
            <div>slug: {p.slug}</div>
            <div>summary: {p.summary}</div>
            <div>role: {p.role} — {p.timeline}</div>
            <div>tags: {p.tags.join(", ")}</div>
            <div>
              {p.kind === "software" ? `stack: ${p.stack.join(", ")}` : `lab: ${p.lab} — collaborators: ${p.collaborators.join(", ")}`}
            </div>
            <div>thumbnails: {p.thumbnails[0]} | {p.thumbnails[1]}</div>
            <div>links: {JSON.stringify(p.links)}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
