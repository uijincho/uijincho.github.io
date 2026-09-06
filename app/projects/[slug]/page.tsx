import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { TYPE } from "@/lib/design/type-scale";
import { KIND_LABEL, KIND_ACCENT_TEXT } from "@/lib/design/kind";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { ProjectPager } from "@/components/work/ProjectPager";
import { mdxComponents } from "@/components/work/mdx-components";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  // Short title; the root layout's title.template appends the site suffix.
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${SITE_URL}/projects/${project.slug}`,
      type: "article",
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = getAllProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;

  return (
    // w-full is needed since <main> is a direct flex item of <body>
    // (app/layout.tsx), so an auto width would shrink to content instead
    // of stretching. `relative` lets body's grain texture (globals.css)
    // show through behind this page.
    <main className="relative mx-auto w-full max-w-4xl px-6 py-16">
      <span className={`${TYPE.meta} ${KIND_ACCENT_TEXT[project.kind]}`}>{KIND_LABEL[project.kind]}</span>
      <h1 className={`${TYPE.displayLg} mt-2 text-ink`}>{project.title}</h1>
      <p className={`${TYPE.body} mt-4 max-w-[68ch] text-ink-muted`}>{project.summary}</p>

      <div className="mt-8">
        <ProjectMeta project={project} />
      </div>

      {/* Long-form MDX prose, Newsreader, full container width. */}
      <div className="mt-10">
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: false }]],
            },
            // next-mdx-remote/rsc defaults blockJS to true — a security
            // guard that strips all {expression} JS from MDX, since the
            // package is often used with untrusted/user-submitted content.
            // Our content is first-party (this repo's own content/projects
            // directory, authored by us), so components like <Figure
            // number={1} /> need real JS expression attributes to work.
            // Confirmed via a debug probe that number={1} silently became
            // undefined with the default blockJS: true.
            blockJS: false,
          }}
        />
      </div>

      <ProjectPager prev={prev} next={next} />
    </main>
  );
}
