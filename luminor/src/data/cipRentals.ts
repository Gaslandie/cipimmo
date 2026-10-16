// Tarifs de Coléah, Coyah et Ansoumaniah confirmés par le client le 11 octobre 2026.
// Les photos historiques sont celles de la maquette.
// Kankan : caractéristiques confirmées par le client ; tarifs et photos en attente.
// Les liens distincts conservent une fiche par appartement d’Ansoumaniah, avec le même titre visible.
export type Rental = {
    slug: string; title: string; city: string; municipality: string;
    duration: string; furnished: string; price: number | null; period: string;
    beds: number; area: number; imgSrc: string; imageAlt: string;
    description: string; category: string; imgWidth: number; imgHeight: number;
    // Only confirmed information belongs here. Missing values remain unknown.
    amenities?: Partial<Record<"Eau" | "Électricité" | "Climatisation" | "Cuisine" | "Parking" | "Wi-Fi", string>>;
    sharedAmenities?: string[];
    charges?: { included: string[]; extra: string[] };
    neighbourhood?: string[];
    video?: { src: string; poster: string; description: string; captions?: string };
};

export const cipRentals: Rental[] = [
    {
        "slug": "appartement-coleah",
        "title": "Appartement à Coléah",
        "city": "Coléah",
        "municipality": "Conakry",
        "duration": "Court séjour",
        "furnished": "",
        "price": 1000000,
        "period": "jour",
        "beds": 2,
        "area": 75,
        "imgSrc": "/assets/images/home/cip-apartment-interior.jpg",
        "imageAlt": "Salon lumineux avec cuisine ouverte",
        "description": "À Coléah, cet appartement de 75 m² dispose de deux chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement",
        "imgWidth": 977,
        "imgHeight": 733
    },
    {
        "slug": "appartement-coyah-km54",
        "title": "Appartement à Coyah Km54",
        "city": "Coyah Km54",
        "municipality": "Coyah",
        "duration": "Longue durée",
        "furnished": "",
        "price": 1500000,
        "period": "mois",
        "beds": 2,
        "area": 75,
        "imgSrc": "/assets/images/home/cip-hero-interior.jpg",
        "imageAlt": "Salon contemporain avec escalier et grandes fenêtres",
        "description": "À Coyah Km54, cet appartement de 75 m² dispose de deux chambres et d’un salon.",
        "category": "Appartement",
        "imgWidth": 800,
        "imgHeight": 1200
    },
    {
        "slug": "appartement-ansoumaniah-1",
        "title": "Appartement à Ansoumaniah",
        "city": "Ansoumaniah",
        "municipality": "Conakry",
        "duration": "Longue durée",
        "furnished": "Non meublé",
        "price": 3000000,
        "period": "mois",
        "beds": 3,
        "area": 92,
        "imgSrc": "/assets/images/home/cip-apartment-interior.jpg",
        "imageAlt": "Salon lumineux avec cuisine ouverte",
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement",
        "imgWidth": 977,
        "imgHeight": 733
    },
    {
        "slug": "appartement-ansoumaniah-2",
        "title": "Appartement à Ansoumaniah",
        "city": "Ansoumaniah",
        "municipality": "Conakry",
        "duration": "Longue durée",
        "furnished": "Non meublé",
        "price": 3000000,
        "period": "mois",
        "beds": 3,
        "area": 92,
        "imgSrc": "/assets/images/home/cip-apartment-interior.jpg",
        "imageAlt": "Salon lumineux avec cuisine ouverte",
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement",
        "imgWidth": 977,
        "imgHeight": 733
    },
    {
        "slug": "appartement-ansoumaniah-3",
        "title": "Appartement à Ansoumaniah",
        "city": "Ansoumaniah",
        "municipality": "Conakry",
        "duration": "Longue durée",
        "furnished": "Non meublé",
        "price": 3000000,
        "period": "mois",
        "beds": 3,
        "area": 92,
        "imgSrc": "/assets/images/home/cip-apartment-interior.jpg",
        "imageAlt": "Salon lumineux avec cuisine ouverte",
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement",
        "imgWidth": 977,
        "imgHeight": 733
    },
    {
        "slug": "duplex-kankan-aeroport",
        "title": "Duplex à Kankan — Aéroport",
        "city": "Aéroport",
        "municipality": "Kankan",
        "duration": "Court séjour",
        "furnished": "Non meublé",
        "price": null,
        "period": "nuit",
        "beds": 4,
        "area": 200,
        "imgSrc": "/assets/images/home/photos-a-venir.svg",
        "imageAlt": "Photos du duplex à Kankan à venir",
        "description": "Au quartier Aéroport à Kankan, ce duplex non meublé de 200 m² est proposé pour un court séjour. Il dispose de quatre chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Duplex",
        "imgWidth": 820,
        "imgHeight": 616
    },
    {
        "slug": "appartement-kankan-sinkefara",
        "title": "Appartement à Kankan — Sinkefara",
        "city": "Sinkefara",
        "municipality": "Kankan",
        "duration": "Court séjour",
        "furnished": "Non meublé",
        "price": null,
        "period": "nuit",
        "beds": 1,
        "area": 40,
        "imgSrc": "/assets/images/home/photos-a-venir.svg",
        "imageAlt": "Photos de l’appartement à Kankan à venir",
        "description": "Au quartier Sinkefara à Kankan, cet appartement non meublé de 40 m² est proposé pour un court séjour. Il dispose d’une chambre et d’un salon.",
        "category": "Appartement",
        "imgWidth": 820,
        "imgHeight": 616
    }
];


type RentalLocation = { city: string; municipality: string };

export function rentalPrice(rental: { price: number | null; period: string }) {
    return rental.price === null ? "Tarif à confirmer" : `${rental.price.toLocaleString("fr-FR")} GNF`;
}

export function rentalLocation(rental: RentalLocation) {
    return rental.city === rental.municipality ? rental.city : `${rental.city}, ${rental.municipality}`;
}

export function matchesRentalLocation(rental: RentalLocation, location: string) {
    return rental.municipality === location || rental.city === location;
}

export const rentalLocationOptions = [...new Set(cipRentals.map((rental) => rental.municipality))];

export const rentalDistrictOptions = [...new Set(cipRentals.map((rental) => rental.city))];
export const rentalAvailability = "Contactez-nous pour vérifier la disponibilité";

// Local media only; never accept arbitrary embed HTML or external tracking URLs.
export function safeRentalMedia(path: string, kind: "video" | "poster" | "captions") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (basePath && path.startsWith(`${basePath}/`)) path = path.slice(basePath.length);
    const extensions = { video: /\.(mp4|webm)$/i, poster: /\.(jpg|jpeg|png|webp)$/i, captions: /\.vtt$/i };
    return /^\/assets\/[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(path) && extensions[kind].test(path);
}

export const emptyRentalFilters = { keyword: "", duration: "", city: "", bedrooms: "", furnished: "", budget: "", minSize: "", maxSize: "" };
export type RentalFilters = typeof emptyRentalFilters;
export const rentalBudgets = [
    ...["jour", "nuit"].flatMap(period => [300000, 500000, 1000000].map(price => ({ value: `${price}:${period}`, label: `${price.toLocaleString("fr-FR")} GNF / ${period}` }))),
    ...[2000000, 3000000, 4000000, 5000000].map(price => ({ value: `${price}:mois`, label: `${price.toLocaleString("fr-FR")} GNF / mois` })),
];
export const rentalSizes = [40, 50, 75, 90, 100, 150, 200].map(size => ({ value: String(size), label: `${size} m²` }));
export function readRentalFilters(params: URLSearchParams): { filters: RentalFilters; invalid: boolean } {
    const filters = { ...emptyRentalFilters };
    let invalid = false;
    const allowed: Record<string, string[]> = {
        duration: ["courte", "longue"], city: [...rentalLocationOptions, ...rentalDistrictOptions],
        bedrooms: ["1", "2", "3", "4+"], furnished: ["meuble", "non-meuble"],
        budget: rentalBudgets.map(b => b.value), minSize: rentalSizes.map(s => s.value), maxSize: rentalSizes.map(s => s.value),
    };
    for (const key of Object.keys(filters) as (keyof RentalFilters)[]) {
        const values = params.getAll(key);
        const value = values[0] || "";
        if (values.length > 1 || (key === "keyword" ? value.length > 200 : value && !allowed[key].includes(value))) invalid = true;
        else filters[key] = value;
    }
    filters.duration = filters.duration === "courte" ? "Court séjour" : filters.duration === "longue" ? "Longue durée" : "";
    filters.furnished = filters.furnished === "meuble" ? "Meublé" : filters.furnished === "non-meuble" ? "Non meublé" : "";
    return { filters, invalid };
}
export function rentalFilterQuery(filters: RentalFilters) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        if (!value) continue;
        params.set(key, key === "duration" ? value === "Court séjour" ? "courte" : "longue" : key === "furnished" ? value === "Meublé" ? "meuble" : "non-meuble" : value);
    }
    return params.toString();
}
const normalizeRentalSearch = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
export function filterRentals(filters: RentalFilters) {
    const [maxBudget, budgetPeriod] = filters.budget.split(":");
    const keyword = normalizeRentalSearch(filters.keyword.trim());
    return cipRentals.filter(rental =>
        (!filters.duration || rental.duration === filters.duration) &&
        (!filters.city || matchesRentalLocation(rental, filters.city)) &&
        (!filters.bedrooms || (filters.bedrooms === "4+" ? rental.beds >= 4 : rental.beds === Number(filters.bedrooms))) &&
        (!filters.furnished || rental.furnished === filters.furnished) &&
        (!filters.budget || (rental.price !== null && rental.period === budgetPeriod && rental.price <= Number(maxBudget))) &&
        (!filters.minSize || rental.area >= Number(filters.minSize)) &&
        (!filters.maxSize || rental.area <= Number(filters.maxSize)) &&
        (!keyword || normalizeRentalSearch(`${rental.title} ${rentalLocation(rental)} ${rental.description}`).includes(keyword))
    );
}
