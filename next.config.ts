import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Static export — plain files for cPanel. Dev runs as a normal server so
  // the /edit editor and its save/publish API routes work; neither is ever
  // part of the exported site.
  output: isDev ? undefined : "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Editor-only routes use .dev.tsx/.dev.ts extensions, so production
  // builds (which only match .tsx/.ts) exclude them automatically.
  pageExtensions: isDev ? ["dev.tsx", "dev.ts", "tsx", "ts"] : ["tsx", "ts"],
  // Lets a publish (`next build`) run while the dev server is running,
  // without the two fighting over .next/.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: { root: process.cwd() },
};

export default nextConfig;
