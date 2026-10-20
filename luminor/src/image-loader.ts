import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width }: ImageLoaderProps): string {
    const [pathname, query] = src.split("?", 2);
    // Uploaded media and external URLs keep their existing, validated source.
    if (!/^\/assets\/images\/(?!properties\/admin\/)[a-zA-Z0-9_./-]+\.(?:jpe?g|png|webp)$/i.test(pathname)
        || pathname.split("/").includes("..")) return src;
    return `${pathname.replace("/assets/images/", "/assets/optimized/")}.w${width}.webp${query ? `?${query}` : ""}`;
}
