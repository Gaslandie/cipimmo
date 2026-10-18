// Inventaire transmis les 9 et 11 octobre 2026, complété par Nongo — Résidence Kinsi le 18 octobre.
// Tarifs de Coléah, Coyah et Ansoumaniah reçus le 11 octobre ; jour/mois conservés.
// Photos de Coléah, Nongo — Résidence Kinsi, Kankan — Aéroport et Ansoumaniah reçues le 18 octobre 2026.
// Kankan : tarif et unité de facturation non communiqués.
// Les liens distincts conservent une fiche par appartement d’Ansoumaniah, avec le même titre visible.
export type RentalPhoto = { src: string; alt: string; width: number; height: number; caption?: string; originalSrc?: string };
export type Rental = {
    slug: string; title: string; city: string; municipality: string;
    duration: string; furnished: string; price: number | null; period: string;
    beds: number | null; area: number | null; imgSrc: string; imageAlt: string;
    description: string; category: string; imgWidth: number; imgHeight: number;
    // Only confirmed information belongs here. Missing values remain unknown.
    amenities?: Partial<Record<"Eau" | "Électricité" | "Climatisation" | "Cuisine" | "Parking" | "Wi-Fi", string>>;
    sharedAmenities?: string[];
    charges?: { included: string[]; extra: string[] };
    neighbourhood?: string[];
    video?: { src: string; poster: string; description: string; captions?: string };
    photos?: RentalPhoto[];
    photoNotice?: string;
};

// Même immeuble : photos partagées temporairement entre les trois annonces, à la demande de Gassama.
const ansoumaniahMedia = {
    imgSrc: "/assets/images/properties/ansoumaniah/immeuble-retouche.webp",
    imageAlt: "Immeuble des trois appartements à Ansoumaniah, façade éclairée de nuit, photo retouchée",
    imgWidth: 1798,
    imgHeight: 875,
    photoNotice: "Ces photos sont utilisées temporairement pour les trois appartements de cet immeuble à Ansoumaniah. La disposition exacte de chaque logement est à confirmer lors de la visite.",
    photos: [
        { src: "/assets/images/properties/ansoumaniah/immeuble-retouche.webp", alt: "Façade de nuit de l’immeuble à Ansoumaniah avec balcons et escalier extérieur", width: 1798, height: 875, caption: "Photo retouchée : lumière équilibrée, personnes et petits débris retirés.", originalSrc: "/assets/images/properties/ansoumaniah/immeuble-original.jpeg" },
        { src: "/assets/images/properties/ansoumaniah/sejour-retouche.webp", alt: "Séjour vide avec carrelage veiné et fenêtres à cadres noirs", width: 1448, height: 1086, caption: "Photo retouchée : objets de chantier posés au sol et salissures retirés. Finitions et état actuel à confirmer lors de la visite.", originalSrc: "/assets/images/properties/ansoumaniah/sejour-original.jpeg" },
        { src: "/assets/images/properties/ansoumaniah/degagement-retouche.webp", alt: "Dégagement intérieur avec portes en bois et sol carrelé beige", width: 1086, height: 1448, caption: "Photo retouchée : poussière et salissures au sol atténuées. État actuel à confirmer lors de la visite.", originalSrc: "/assets/images/properties/ansoumaniah/degagement-original.jpeg" },
        { src: "/assets/images/properties/ansoumaniah/salle-eau-retouchee.webp", alt: "Salle d’eau avec douche noire, meuble lavabo et toilettes", width: 1086, height: 1448, caption: "Photo retouchée : cartons, objets de chantier et salissures retirés. Finitions et état actuel à confirmer lors de la visite.", originalSrc: "/assets/images/properties/ansoumaniah/salle-eau-originale.jpeg" }
    ] satisfies RentalPhoto[]
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
        "imgSrc": "/assets/images/properties/coleah/sejour-salle-a-manger.jpeg",
        "imageAlt": "Séjour et salle à manger de l’appartement à Coléah",
        "description": "À Coléah, cet appartement de 75 m² dispose de deux chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "photos": [
            { "src": "/assets/images/properties/coleah/sejour-salle-a-manger.jpeg", "alt": "Séjour et salle à manger avec canapé, fauteuils et télévision", "width": 1080, "height": 810 },
            { "src": "/assets/images/properties/coleah/sejour-entree.jpeg", "alt": "Séjour et salle à manger vus depuis l’espace télévision", "width": 1080, "height": 810 },
            { "src": "/assets/images/properties/coleah/cuisine-equipee.jpeg", "alt": "Cuisine avec réfrigérateur, four, micro-ondes, évier et rangements", "width": 810, "height": 1080 },
            { "src": "/assets/images/properties/coleah/cuisine-lave-linge.jpeg", "alt": "Plan de travail de la cuisine avec évier et lave-linge", "width": 1080, "height": 810 },
            { "src": "/assets/images/properties/coleah/chambre-lit-double.jpeg", "alt": "Chambre avec lit double, fauteuil et climatisation", "width": 810, "height": 1080 },
            { "src": "/assets/images/properties/coleah/chambre-lit-rayures.jpeg", "alt": "Lit, fenêtre et climatisation dans une chambre", "width": 810, "height": 1080 },
            { "src": "/assets/images/properties/coleah/salle-eau-douche.jpeg", "alt": "Salle d’eau avec lavabo et cabine de douche", "width": 810, "height": 1080 },
            { "src": "/assets/images/properties/coleah/salle-eau-lavabo.jpeg", "alt": "Salle d’eau avec toilettes fermées et lavabo", "width": 810, "height": 1080 }
        ],
        "category": "Appartement",
        "imgWidth": 1080,
        "imgHeight": 810
    },
    {
        "slug": "nongo-residence-kinsi",
        "title": "Nongo — Résidence Kinsi",
        "city": "Nongo",
        "municipality": "Conakry",
        "duration": "Court séjour",
        "furnished": "",
        "price": null,
        "period": "",
        "beds": null,
        "area": null,
        "imgSrc": "/assets/images/properties/nongo-kinsi/sejour.jpeg",
        "imageAlt": "Séjour de la résidence Kinsi à Nongo avec fauteuils et canapés sous housses de protection",
        "description": "À Nongo, à Conakry, ce logement de la résidence Kinsi est proposé pour un court séjour. Les photos reçues montrent un séjour avec des assises encore sous housses de protection, une chambre avec un lit et des rangements, une pièce vide et une salle d’eau. Le tarif, la surface, le nombre de chambres et le mobilier fourni sont à confirmer auprès de CIP IMMO.",
        "category": "Logement",
        "imgWidth": 1280,
        "imgHeight": 960,
        "photos": [
            { "src": "/assets/images/properties/nongo-kinsi/sejour.jpeg", "alt": "Séjour avec fauteuils et canapés sous housses de protection", "width": 1280, "height": 960 },
            { "src": "/assets/images/properties/nongo-kinsi/chambre.jpeg", "alt": "Chambre avec lit, oreillers et tables de chevet", "width": 1280, "height": 960 },
            { "src": "/assets/images/properties/nongo-kinsi/rangements.jpeg", "alt": "Armoire de la chambre et miroir posé contre le mur", "width": 960, "height": 1280 },
            { "src": "/assets/images/properties/nongo-kinsi/piece-vide.jpeg", "alt": "Pièce vide avec sol carrelé et rideaux orange", "width": 960, "height": 1280 },
            { "src": "/assets/images/properties/nongo-kinsi/salle-eau.jpeg", "alt": "Salle d’eau avec cabine de douche et meuble lavabo", "width": 960, "height": 1280 },
            { "src": "/assets/images/properties/nongo-kinsi/douche.jpeg", "alt": "Colonne de douche noire derrière une paroi vitrée", "width": 960, "height": 1280 }
        ]
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
        "imgSrc": "",
        "imageAlt": "",
        "description": "À Coyah Km54, cet appartement de 75 m² dispose de deux chambres et d’un salon.",
        "category": "Appartement",
        "imgWidth": 820,
        "imgHeight": 616
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
        ...ansoumaniahMedia,
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement"
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
        ...ansoumaniahMedia,
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement"
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
        ...ansoumaniahMedia,
        "description": "À Ansoumaniah, à Conakry, cet appartement non meublé de 92 m² dispose de trois chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "category": "Appartement"
    },
    {
        "slug": "duplex-kankan-aeroport",
        "title": "Duplex à Kankan — Aéroport",
        "city": "Aéroport",
        "municipality": "Kankan",
        "duration": "Court séjour",
        "furnished": "Non meublé",
        "price": null,
        "period": "",
        "beds": 4,
        "area": 200,
        "imgSrc": "/assets/images/properties/kankan-aeroport/facade-retouchee.webp",
        "imageAlt": "Façade du duplex à Kankan près de l’aéroport, photo retouchée pour atténuer la boue au sol",
        "description": "À Kankan, près de l’aéroport, ce duplex non meublé de 200 m² est proposé pour un court séjour. Il dispose de quatre chambres, d’un salon et d’une cuisine.",
        "amenities": { "Cuisine": "Présente dans le logement" },
        "photos": [
            { "src": "/assets/images/properties/kankan-aeroport/facade-retouchee.webp", "alt": "Façade du duplex avec balcon, colonnes et entrée sur terrain en terre", "width": 1448, "height": 1086, "caption": "Photo retouchée : boue, flaque et débris atténués au sol. État actuel des abords à confirmer lors de la visite.", "originalSrc": "/assets/images/properties/kankan-aeroport/facade-originale.jpeg" },
            { "src": "/assets/images/properties/kankan-aeroport/salon-retouche.webp", "alt": "Salon vide aux murs de briques apparentes et au sol carrelé", "width": 1086, "height": 1448, "caption": "Photo retouchée : salissures au sol atténuées. État actuel à confirmer lors de la visite.", "originalSrc": "/assets/images/properties/kankan-aeroport/salon-original.jpeg" },
            { "src": "/assets/images/properties/kankan-aeroport/piece-retouchee.webp", "alt": "Pièce vide carrelée avec murs de briques et porte vitrée", "width": 1086, "height": 1448, "caption": "Photo retouchée : traces de boue au sol atténuées. État actuel à confirmer lors de la visite.", "originalSrc": "/assets/images/properties/kankan-aeroport/piece-originale.jpeg" },
            { "src": "/assets/images/properties/kankan-aeroport/salle-eau-retouchee.webp", "alt": "Salle d’eau carrelée avec toilettes, lavabo et chauffe-eau", "width": 1086, "height": 1448, "caption": "Photo retouchée : salissures au sol atténuées. État actuel à confirmer lors de la visite.", "originalSrc": "/assets/images/properties/kankan-aeroport/salle-eau-originale.jpeg" }
        ],
        "category": "Duplex",
        "imgWidth": 1448,
        "imgHeight": 1086
    },
    {
        "slug": "appartement-kankan-sinkefara",
        "title": "Appartement à Kankan — Sinkefara",
        "city": "Sinkefara",
        "municipality": "Kankan",
        "duration": "Court séjour",
        "furnished": "Non meublé",
        "price": null,
        "period": "",
        "beds": 1,
        "area": 40,
        "imgSrc": "",
        "imageAlt": "",
        "description": "Au quartier Sinkefara à Kankan, cet appartement non meublé de 40 m² est proposé pour un court séjour. Il dispose d’une chambre et d’un salon.",
        "category": "Appartement",
        "imgWidth": 820,
        "imgHeight": 616
    }
];


type RentalLocation = { city: string; municipality: string };

export function rentalPrice(rental: { price: number | null; period: string }) {
    return rental.price === null ? "À discuter" : `${rental.price.toLocaleString("fr-FR")} GNF`;
}

export function rentalLocation(rental: RentalLocation) {
    return rental.city === rental.municipality ? rental.city : `${rental.city}, ${rental.municipality}`;
}

export function matchesRentalLocation(rental: RentalLocation, location: string) {
    return rental.municipality === location || rental.city === location;
}

export const rentalLocationOptions = [...new Set(cipRentals.map((rental) => rental.municipality))];

export const cipStatistics = {
    rentals: cipRentals.length,
    cities: rentalLocationOptions.length,
    // Valeur demandée par Gassama le 16 octobre 2026 ; à actualiser sur information du client.
    accompaniedClients: 20,
};

export const rentalDistrictOptions = [...new Set(cipRentals.map((rental) => rental.city))];
export const rentalAvailability = "Contactez-nous pour vérifier la disponibilité";

// Local media only; never accept arbitrary embed HTML or external tracking URLs.
export function safeRentalMedia(path: string, kind: "video" | "poster" | "captions") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (basePath && path.startsWith(`${basePath}/`)) path = path.slice(basePath.length);
    const extensions = { video: /\.(mp4|webm)$/i, poster: /\.(jpg|jpeg|png|webp)$/i, captions: /\.vtt$/i };
    return /^\/assets\/[a-zA-Z0-9/_-]+\.[a-zA-Z0-9]+$/.test(path) && extensions[kind].test(path);
}

export function rentalPhotos(rental: Rental): RentalPhoto[] {
    const seen = new Set<string>();
    const photos = (rental.photos || []).filter(photo => {
        if (!safeRentalMedia(photo.src, "poster") || !photo.alt.trim() || seen.has(photo.src) ||
            !Number.isInteger(photo.width) || !Number.isInteger(photo.height) || photo.width < 1 || photo.height < 1 || photo.width > 20000 || photo.height > 20000) return false;
        seen.add(photo.src);
        return true;
    }).slice(0, 20);
    if (photos.length) return photos;
    return rental.imgSrc && safeRentalMedia(rental.imgSrc, "poster") && rental.imageAlt.trim()
        ? [{ src: rental.imgSrc, alt: rental.imageAlt, width: rental.imgWidth, height: rental.imgHeight }] : [];
}

export function similarRentals(rental: Rental) {
    const score = (other: Rental) => (other.city === rental.city ? 4 : 0) +
        (other.municipality === rental.municipality ? 2 : 0) +
        (other.beds !== null && rental.beds !== null ? Math.max(0, 2 - Math.abs(other.beds - rental.beds)) : 0) +
        (other.category === rental.category ? 1 : 0);
    return cipRentals.filter(other => other.slug !== rental.slug && other.duration === rental.duration)
        .sort((a, b) => score(b) - score(a)).slice(0, 3);
}

export function rentalToday(now = new Date()) {
    // CIP IMMO operates in Guinea (UTC); dates are calendar dates, never shifted by the visitor's timezone.
    return now.toISOString().slice(0, 10);
}

export function rentalStayError(arrival: string, departure: string, today = rentalToday()) {
    const validDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) &&
        Number.isFinite(Date.parse(`${value}T00:00:00Z`)) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
    if ((arrival && !validDate(arrival)) || (departure && !validDate(departure))) return "Indiquez des dates valides.";
    if (departure && !arrival) return "Indiquez aussi votre date d’arrivée.";
    if (arrival && arrival < today) return "La date d’arrivée ne peut pas être dans le passé.";
    if (departure && departure <= arrival) return "Le départ doit être après l’arrivée.";
    return "";
}

export const emptyRentalFilters = { keyword: "", duration: "", city: "", bedrooms: "", furnished: "", budget: "", budgetPeriod: "", minSize: "", maxSize: "" };
export type RentalFilters = typeof emptyRentalFilters;
export function rentalBudgetPeriods(duration: string) {
    return ["courte", "Court séjour"].includes(duration) ? ["jour", "nuit"] : ["longue", "Longue durée"].includes(duration) ? ["mois"] : ["mois", "jour", "nuit"];
}
export function validRentalBudget(value: string) {
    return /^[0-9]{1,12}$/.test(value) && Number(value) > 0;
}
export function rentalCountLabel(location = "") {
    const count = cipRentals.filter(rental => !location || matchesRentalLocation(rental, location)).length;
    return `${count} logement${count > 1 ? "s" : ""} proposé${count > 1 ? "s" : ""}`;
}
export const rentalSizes = [40, 50, 75, 90, 100, 150, 200].map(size => ({ value: String(size), label: `${size} m²` }));
export function readRentalFilters(params: URLSearchParams): { filters: RentalFilters; invalid: boolean } {
    params = new URLSearchParams(params);
    const filters = { ...emptyRentalFilters };
    let invalid = false;
    // Preserve previously shared links, without accepting duplicate or conflicting periods.
    const legacyBudget = params.get("budget") || "";
    if (legacyBudget.includes(":")) {
        if (params.getAll("budget").length === 1 && !params.has("budgetPeriod") && /^[0-9]{1,12}:(jour|nuit|mois)$/.test(legacyBudget)) {
            const [amount, period] = legacyBudget.split(":");
            params.set("budget", amount);
            params.set("budgetPeriod", period);
        } else invalid = true;
    }
    const allowed: Record<string, string[]> = {
        duration: ["courte", "longue"], city: [...rentalLocationOptions, ...rentalDistrictOptions],
        bedrooms: ["1", "2", "3", "4+"], furnished: ["meuble", "non-meuble"],
        budgetPeriod: ["jour", "nuit", "mois"], minSize: rentalSizes.map(s => s.value), maxSize: rentalSizes.map(s => s.value),
    };
    for (const key of Object.keys(filters) as (keyof RentalFilters)[]) {
        const values = params.getAll(key);
        const value = values[0] || "";
        if (values.length > 1 || (key === "keyword" ? value.length > 200 : value && (key === "budget" ? !validRentalBudget(value) : !allowed[key].includes(value)))) invalid = true;
        else filters[key] = value;
    }
    filters.duration = filters.duration === "courte" ? "Court séjour" : filters.duration === "longue" ? "Longue durée" : "";
    filters.furnished = filters.furnished === "meuble" ? "Meublé" : filters.furnished === "non-meuble" ? "Non meublé" : "";
    if (filters.budget && !rentalBudgetPeriods(filters.duration).includes(filters.budgetPeriod)) invalid = true;
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
    const keyword = normalizeRentalSearch(filters.keyword.trim());
    return cipRentals.filter(rental =>
        (!filters.duration || rental.duration === filters.duration) &&
        (!filters.city || matchesRentalLocation(rental, filters.city)) &&
        (!filters.bedrooms || (rental.beds !== null && (filters.bedrooms === "4+" ? rental.beds >= 4 : rental.beds === Number(filters.bedrooms)))) &&
        (!filters.furnished || rental.furnished === filters.furnished) &&
        (!filters.budget || (validRentalBudget(filters.budget) && rentalBudgetPeriods(filters.duration).includes(filters.budgetPeriod) && rental.price !== null && rental.period === filters.budgetPeriod && rental.price <= Number(filters.budget))) &&
        (!filters.minSize || (rental.area !== null && rental.area >= Number(filters.minSize))) &&
        (!filters.maxSize || (rental.area !== null && rental.area <= Number(filters.maxSize))) &&
        (!keyword || normalizeRentalSearch(`${rental.title} ${rentalLocation(rental)} ${rental.description}`).includes(keyword))
    );
}
