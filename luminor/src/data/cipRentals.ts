// Inventaire transmis les 9 et 11 octobre 2026, complété par Nongo — Résidence Kinsi le 18 octobre.
// Tarifs de Coléah, Coyah et Ansoumaniah reçus le 11 octobre ; jour/mois conservés.
// Photos de Coléah, Nongo — Résidence Kinsi, Kankan — Aéroport et Ansoumaniah reçues le 18 octobre 2026.
// Kankan : tarif et unité de facturation non communiqués.
// Les liens distincts conservent une fiche par appartement d’Ansoumaniah, avec le même titre visible.
import catalogue from './catalogue.json';

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
    availability?: 'À confirmer' | 'Disponible' | 'Indisponible';
    published?: boolean;
};

// Le transfert du back-office remplace seulement ce fichier JSON, après validation.
export const cipRentals: Rental[] = (catalogue as Rental[]).filter(rental => rental.published !== false);


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
export function rentalAvailability(rental: Rental) {
    return rental.availability === 'Disponible' ? 'Disponible — à confirmer avec CIP IMMO pour vos dates'
        : rental.availability === 'Indisponible' ? 'Actuellement indisponible'
        : 'Contactez-nous pour vérifier la disponibilité';
}

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
