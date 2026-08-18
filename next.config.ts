import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required by next-mdx-remote when using Turbopack (our default dev/build
  // engine) — see node_modules/next-mdx-remote/README.md.
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
