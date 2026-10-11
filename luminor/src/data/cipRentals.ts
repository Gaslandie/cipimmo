// Tarifs de Coléah, Coyah et Ansoumaniah confirmés par le client le 11 octobre 2026.
// Les photos historiques sont celles de la maquette.
// Kankan : caractéristiques confirmées par le client ; tarifs et photos en attente.
// Les liens distincts conservent une fiche par appartement d’Ansoumaniah, avec le même titre visible.
export const cipRentals = [
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
    return rental.municipality === location;
}

export const rentalLocationOptions = [...new Set(cipRentals.map((rental) => rental.municipality))];
