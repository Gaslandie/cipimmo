import type { Metadata } from "next";

export const siteOrigin = "https://cipimmo.com";

export function pageMetadata(title: string, description: string, path: string, index = true): Metadata {
    const canonical = new URL(path, siteOrigin).href;
    const image = {
        url: `${siteOrigin}/assets/social/cip-immo-share-v1.jpg`,
        width: 1200,
        height: 630,
        alt: "CIP IMMO — Votre logement en Guinée",
        type: "image/jpeg",
    };
    return {
        title,
        description,
        alternates: { canonical },
        robots: { index: index && !process.env.NEXT_PUBLIC_BASE_PATH, follow: true },
        openGraph: { title, description, url: canonical, siteName: "CIP IMMO", locale: "fr_GN", type: "website", images: [image] },
        twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
    };
}
