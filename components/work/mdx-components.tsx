import { Children, isValidElement, type ComponentProps } from "react";
import { TYPE } from "@/lib/design/type-scale";
import { FlatFrame } from "@/components/frames/FlatFrame";

/**
 * Markdown always wraps a standalone `![]()` in a <p> (images are inline
 * content in HTML semantics), but our img override renders a <figure>
 * (block content) — <p> cannot legally contain block content. Browsers
 * silently close the <p> early to cope, so server and client HTML diverge
 * and React throws a real hydration mismatch (confirmed via console: "In
 * HTML, <figure> cannot be a descendant of <p>"). Detect a paragraph
 * whose only content is an image and skip the <p> wrapper for it.
 */
function isSoleImageChild(children: React.ReactNode): boolean {
  const childArray = Children.toArray(children);
  return (
    childArray.length === 1 && isValidElement(childArray[0]) && typeof (childArray[0].props as { src?: unknown }).src === "string"
  );
}

/**
 * Component overrides passed to <MDXRemote components={...} />.
 *
 * Body prose renders in Newsreader (TYPE.bodySerif) — this is the one
 * place on the site that font is allowed, per the type spec ("long-form
 * article body inside MDX only"). Images go through FlatFrame, never
 * next/image directly and never PhotoFrame — MDX images are project
 * screenshots/diagrams, not photographs. Markdown gives no explicit
 * width/height, so these default to an 800x500 (8:5) placeholder ratio;
 * real dimensions can be added once real screenshots exist.
 */
export const mdxComponents = {
  // Defensive downgrade: MDX content should never author a top-level `#`
  // (the page's own <h1> is the project title), but if it does, render it
  // as an h2 rather than creating a second h1 on the page.
  h1: (props: ComponentProps<"h2">) => <h2 className={`${TYPE.heading} mt-10 text-ink`} {...props} />,
  h2: (props: ComponentProps<"h2">) => <h2 className={`${TYPE.heading} mt-10 text-ink`} {...props} />,
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="mt-8 font-display text-lg font-bold tracking-[-0.02em] text-ink" {...props} />
  ),
  p: (props: ComponentProps<"p">) => {
    if (isSoleImageChild(props.children)) return <>{props.children}</>;
    return <p className={`${TYPE.bodySerif} mt-4 text-ink`} {...props} />;
  },
  a: (props: ComponentProps<"a">) => (
    <a className="text-accent underline underline-offset-2 hover:no-underline" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => <ul className={`${TYPE.bodySerif} mt-4 list-disc pl-6 text-ink`} {...props} />,
  ol: (props: ComponentProps<"ol">) => (
    <ol className={`${TYPE.bodySerif} mt-4 list-decimal pl-6 text-ink`} {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="mt-1" {...props} />,
  strong: (props: ComponentProps<"strong">) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote className="mt-4 border-l-2 border-rule pl-4 text-ink-muted italic" {...props} />
  ),
  // Inline `code` gets a small mono chip. The [&>code]:bg-transparent etc.
  // on `pre` below strips this back off for code nested inside a fenced
  // block, so block code isn't double-boxed.
  code: (props: ComponentProps<"code">) => (
    <code className="rounded bg-raised px-1 py-0.5 font-mono text-[0.85em] text-ink" {...props} />
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded border border-rule bg-raised p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  img: (props: ComponentProps<"img">) => {
    const { src, alt } = props;
    if (typeof src !== "string") return null;
    return <FlatFrame src={src} alt={alt ?? ""} width={800} height={500} fluid className="my-6" />;
  },
};
