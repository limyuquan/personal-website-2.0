/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    // Pin the workspace root to this project. Without this, a stray lockfile
    // in a parent directory (e.g. ~/package-lock.json) makes Next infer the
    // wrong root and Tailwind fails to resolve from node_modules.
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default config;
