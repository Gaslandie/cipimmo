import type { NextConfig } from "next";

const pages = process.env.PAGES_EXPORT === "1";
const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    loader: "custom",
    loaderFile: "./src/image-loader.ts",
    deviceSizes: [480, 768, 1280, 1920],
    imageSizes: [96, 192, 384],
  },
  ...(pages ? {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/cipimmo",
    trailingSlash: true,
    distDir: ".next-pages",
  } : {}),
};

export default nextConfig;
