import type { Metadata } from "next";

export const siteOrigin = "https://cipimmo.com";

export function pageMetadata(title: string, description: string, path: string, index = true): Metadata {
    const canonical = new URL(path, siteOrigin).href;
    return {
        title,
        description,
        alternates: { canonical },
        robots: { index: index && !process.env.NEXT_PUBLIC_BASE_PATH, follow: true },
        openGraph: { title, description, url: canonical, siteName: "CIP IMMO", locale: "fr_GN", type: "website" },
        twitter: { card: "summary", title, description },
    };
}
