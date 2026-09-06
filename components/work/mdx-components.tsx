import { Children, isValidElement, type ComponentProps } from "react";
import { TYPE } from "@/lib/design/type-scale";
import { FlatFrame } from "@/components/frames/FlatFrame";
import { Figure } from "@/components/mdx/Figure";
import { ImagePair } from "@/components/mdx/ImagePair";
import { FullBleed } from "@/components/mdx/FullBleed";
import { PullQuote } from "@/components/mdx/PullQuote";
import { Callout } from "@/components/mdx/Callout";

/**
 * Detects a paragraph whose only content is an image, so the <p> wrapper
 * can be skipped (avoids nesting a <figure> inside a <p>).
 */
function isSoleImageChild(children: React.ReactNode): boolean {
  const childArray = Children.toArray(children);
  return (
    childArray.length === 1 && isValidElement(childArray[0]) && typeof (childArray[0].props as { src?: unknown }).src === "string"
  );
}

/**
 * Component overrides passed to <MDXRemote components={...} />.
 * Body prose renders in Newsreader (TYPE.bodySerif). Images go through
 * FlatFrame at a default 800x500 placeholder ratio.
 */
export const mdxComponents = {
  // Renders a top-level `#` as h2, since the page's own h1 is the project title.
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
  // Inline `code` gets a small mono chip; stripped back off inside fenced blocks (see `pre` below).
  code: (props: ComponentProps<"code">) => (
    <code className="rounded bg-raised px-1 py-0.5 font-mono text-[0.85em] text-ink" {...props} />
  ),
  // Warm paper-toned background (--color-code) instead of shiki's default theme background.
  pre: (props: ComponentProps<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded border border-rule bg-code p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  img: (props: ComponentProps<"img">) => {
    const { src, alt } = props;
    if (typeof src !== "string") return null;
    return <FlatFrame src={src} alt={alt ?? ""} width={800} height={500} fluid className="my-6" />;
  },
  // Raw <video> tags authored directly in MDX. Centered, capped to the prose column width.
  video: (props: ComponentProps<"video">) => (
    <video className="mx-auto my-6 block max-w-full" {...props} />
  ),
  // Used for YouTube embeds and the PDF poster viewer.
  iframe: (props: ComponentProps<"iframe">) => (
    <iframe className="mx-auto my-6 block max-w-full" {...props} />
  ),

  // Custom components authors use directly in MDX bodies.
  Figure,
  ImagePair,
  FullBleed,
  PullQuote,
  Callout,
};
