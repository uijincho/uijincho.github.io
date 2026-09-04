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

  // Short title, not "X — Uijin Cho" — the root layout's title.template
  // appends the suffix once, centrally (see app/layout.tsx). thumbnail is
  // a site-relative path; it resolves against metadataBase (also set in
  // the root layout) rather than needing an absolute URL here.
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `${SITE_URL}/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `${SITE_URL}/work/${project.slug}`,
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
    // max-w-5xl matches the /work index's visible content column exactly
    // (WorkIndexBody's inner max-w-5xl wrapper, nested inside its own wider
    // max-w-[90rem] frame — the two collapse to the same centered width
    // and padding as this single wrapper, since the outer frame's cap
    // never binds tighter than 5xl at any realistic viewport).
    //
    // The MDX prose body used to cap itself at max-w-[68ch] (a leftover
    // readability measure from the original spec) — removed. It resolved
    // to 686px against the metadata block's 848px content width with no
    // visible edge marking the difference, so the prose just looked like
    // it was wrapping arbitrarily short of everything around it. The
    // prose <div> below is now a plain, unconstrained block, so it fills
    // <main>'s content width exactly like ProjectMeta's <dl> already did —
    // confirmed by measuring both at 848px, at more than one viewport
    // width, not just eyeballing one. The summary line above keeps its
    // own max-w-[68ch]; that one line was never reported as the bug.
    //
    // w-full is load-bearing, not decorative: <body> is `flex flex-col`
    // (app/layout.tsx), and this <main> is a *direct* flex item of it (no
    // plain-block wrapper in between, unlike WorkIndexBody's own two
    // nested divs). A flex item with auto cross-axis margins and an auto
    // width doesn't stretch to fill the line the way a plain block does —
    // it shrinks to its content's width instead (measured: ~734px, not
    // the intended 1024px), so mx-auto + max-w-5xl alone rendered narrower
    // than /work. Same root cause, same fix, as the earlier homepage
    // width bug. w-full removes the ambiguity: width is no longer "auto",
    // so the flex auto-margin-suppresses-stretch special case doesn't
    // apply, and max-w-5xl caps it normally. Verified: renders at
    // left:303.7px / width:1024px, identical to /work's content column.
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <span className={`${TYPE.meta} ${KIND_ACCENT_TEXT[project.kind]}`}>{KIND_LABEL[project.kind]}</span>
      <h1 className={`${TYPE.displayLg} mt-2 text-ink`}>{project.title}</h1>
      <p className={`${TYPE.body} mt-4 max-w-[68ch] text-ink-muted`}>{project.summary}</p>

      <div className="mt-8">
        <ProjectMeta project={project} />
      </div>

      {/* Long-form MDX prose, Newsreader. Full container width — no ch
          measure — see the doc comment on <main> above for why. */}
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
