import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the project root so Turbopack doesn't pick up an unrelated lockfile above this repo
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
