import type { NextConfig } from "next";

const pages = process.env.PAGES_EXPORT === "1";
const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  ...(pages ? {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/cipimmo",
    trailingSlash: true,
    images: { unoptimized: true },
    distDir: ".next-pages",
  } : {}),
};

export default nextConfig;
