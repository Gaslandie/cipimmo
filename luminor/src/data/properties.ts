import { cipRentals, rentalLocation } from "./cipRentals";

export type Property = {
    id: number;
    slug: string;
    period: string;
    furnished: string;
    imgSrc: string;
    imgSrc2?: string;
    imgSrc3?: string;
    imgWidth?: number;
    imgHeight?: number;
    alt?: string;
    address: string;
    title: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    categories: string;
    type: string;
    lat?: number;
    long?: number;
    filterOptions?: string[];
    features?: string[];
    price: number;
    coordinates: [number, number];
    garages: number;
    description?: string;
    city: string;
    municipality: string;
    authorAvatar?: string;
    authorName?: string;
    authorPosition?: string;
    authorDesc?: string;
};


// Les différentes présentations du thème utilisent le même catalogue CIP.
// Les anciens modèles de pages exigent un tarif chiffré. Le catalogue public
// et les fiches /logements affichent aussi les annonces au tarif en attente.
export const properties: Property[] = cipRentals.filter((rental): rental is typeof rental & { price: number } => rental.price !== null).map((rental, index) => ({
    ...rental,
    id: index + 1,
    beds: rental.beds ?? undefined,
    alt: rental.imageAlt,
    address: rentalLocation(rental) + ", Guinée",
    categories: rental.category,
    type: rental.duration === "Court séjour" ? "Court séjour" : "Longue durée",
    sqft: rental.area ?? undefined,
    baths: 1,
    garages: 0,
    lat: 9.7,
    long: -13.4,
    coordinates: [-13.4, 9.7],
    filterOptions: [rental.category],
    features: ["Salon", ...(rental.city === "Coyah Km54" ? [] : ["Cuisine"]), ...(rental.furnished ? [rental.furnished] : [])],
    imgSrc2: rental.imgSrc,
    imgSrc3: rental.imgSrc,
    authorAvatar: "/assets/images/avatar/avatar-1.jpg?v=cip-photos-1",
    authorName: "CIP IMMO",
    authorPosition: "Votre équipe location",
    authorDesc: "Une équipe à votre écoute pour préparer votre séjour ou votre installation en Guinée.",
}));
export const populor = properties;
export const topProperties = properties;
export const recommendedProperties = properties;
export const propertieslist = properties;
export const allProperties = properties;
