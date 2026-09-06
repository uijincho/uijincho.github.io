import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required by next-mdx-remote when using Turbopack (our default dev/build
  // engine) — see node_modules/next-mdx-remote/README.md.
  transpilePackages: ["next-mdx-remote"],
  // Static export for GitHub Pages (github.com/uijincho/uijincho.github.io) —
  // see node_modules/next/dist/docs/01-app/02-guides/static-exports.md.
  output: "export",
  // GitHub Pages has no image optimization server, so next/image must skip it.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
