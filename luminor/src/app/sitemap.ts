import type { MetadataRoute } from "next";
import { cipRentals } from "@/data/cipRentals";
import { siteOrigin } from "@/data/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    if (process.env.NEXT_PUBLIC_BASE_PATH) return [];
    const pages = ["/", "/listing-left-sidebar/", "/comment-louer/", "/about-us/", "/contacts/", "/FAQs/", "/our-pricing/", "/privacy-policy/"];
    return [...pages, ...cipRentals.map((rental) => `/logements/${rental.slug}/`)]
        .map((path) => ({ url: new URL(path, siteOrigin).href }));
}
