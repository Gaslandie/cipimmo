import { rentalPhotos, type Rental } from "./cipRentals";
import { siteOrigin } from "./seo";

const organizationId = `${siteOrigin}/#organization`;
const websiteId = `${siteOrigin}/#website`;

export function serializeStructuredData(data: Record<string, unknown>): string {
    // A catalogue description must never be able to close the HTML script tag.
    return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

export function siteStructuredData() {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "RealEstateAgent",
                "@id": organizationId,
                name: "CIP IMMO",
                url: `${siteOrigin}/`,
                logo: `${siteOrigin}/assets/images/logo/cip-immo-horizontal.svg`,
                image: `${siteOrigin}/assets/social/cip-immo-share-v1.jpg`,
                telephone: "+224613585198",
                email: "contact@cipsarlu.com",
                address: { "@type": "PostalAddress", streetAddress: "Nongo Kiroti", addressLocality: "Conakry", addressCountry: "GN" },
                sameAs: ["https://www.facebook.com/profile.php?id=61595249675572"],
            },
            {
                "@type": "WebSite",
                "@id": websiteId,
                name: "CIP IMMO",
                url: `${siteOrigin}/`,
                inLanguage: "fr",
                publisher: { "@id": organizationId },
            },
        ],
    };
}

export function breadcrumbStructuredData(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: new URL(item.path, siteOrigin).href,
        })),
    };
}

export function rentalStructuredData(rental: Rental) {
    const url = `${siteOrigin}/logements/${rental.slug}/`;
    const images = rentalPhotos(rental).map((photo) => ({
        "@type": "ImageObject",
        url: new URL(photo.src, siteOrigin).href,
        caption: photo.caption || photo.alt,
        width: photo.width,
        height: photo.height,
    }));
    const hasPrice = rental.price !== null && Number.isFinite(rental.price) && rental.price >= 0 && !!rental.period.trim();
    return {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        url,
        name: rental.title,
        description: rental.description,
        inLanguage: "fr",
        isPartOf: { "@id": websiteId },
        publisher: { "@id": organizationId },
        mainEntity: {
            "@type": rental.category === "Appartement" ? "Apartment" : "Accommodation",
            "@id": `${url}#accommodation`,
            name: rental.title,
            identifier: rental.slug,
            description: [rental.description, rental.photoNotice].filter(Boolean).join(" "),
            url,
            address: { "@type": "PostalAddress", addressLocality: rental.municipality, addressCountry: "GN" },
            ...(rental.beds !== null && Number.isInteger(rental.beds) && rental.beds >= 0 ? { numberOfBedrooms: rental.beds } : {}),
            ...(rental.area !== null && Number.isFinite(rental.area) && rental.area > 0 ? { floorSize: { "@type": "QuantitativeValue", value: rental.area, unitCode: "MTK" } } : {}),
            ...(images.length ? { image: images } : {}),
        },
        ...(hasPrice ? {
            offers: {
                "@type": "Offer",
                url,
                businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
                seller: { "@id": organizationId },
                priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: rental.price,
                    priceCurrency: "GNF",
                    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: rental.period },
                },
            },
        } : {}),
    };
}
