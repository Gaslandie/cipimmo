"use client";

import { useEffect, useState } from "react";
import { rentalLocation, type Rental } from "@/data/cipRentals";

export default function RentalContact({ rental, visit = false, compact = false }: { rental: Rental; visit?: boolean; compact?: boolean }) {
    const [origin, setOrigin] = useState("");
    useEffect(() => { setOrigin(window.location.origin); }, []);
    const message = `Bonjour CIP IMMO, ${visit ? "je souhaite organiser une visite ou recevoir une vidéo" : "je souhaite connaître la disponibilité et les conditions de location"} pour « ${rental.title} » à ${rentalLocation(rental)}. Référence : ${rental.slug}.${origin ? `\n${origin}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logements/${encodeURIComponent(rental.slug)}/` : ""}`;
    return <div className={`rental-contact${compact ? " rental-contact--compact" : ""}`}>
        <a href={`https://wa.me/224623417510?text=${encodeURIComponent(message)}`} className="tf-btn btn-bg-1" aria-label={`${visit ? "Demander une visite" : "Écrire sur WhatsApp"} : ${rental.title}, référence ${rental.slug}`}>
            <span>{visit ? "Demander une visite ou une vidéo" : "WhatsApp"}</span>
        </a>
        {!visit && <a href="tel:+224613585198" className="tf-btn" aria-label={`Appeler CIP IMMO au +224 613 58 51 98 pour ${rental.title}`}><span>Appeler</span></a>}
    </div>;
}
