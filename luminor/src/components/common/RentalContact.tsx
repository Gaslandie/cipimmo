"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { rentalLocation, rentalStayError, rentalToday, type Rental } from "@/data/cipRentals";

export default function RentalContact({ rental, visit = false, compact = false, withDates = false }: { rental: Rental; visit?: boolean; compact?: boolean; withDates?: boolean }) {
    const [origin, setOrigin] = useState("");
    const [today, setToday] = useState("");
    const [arrival, setArrival] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef<HTMLParagraphElement>(null);
    const id = useId();
    useEffect(() => { setOrigin(window.location.origin); setToday(rentalToday()); }, []);
    const message = `Bonjour CIP IMMO, ${visit ? "je souhaite organiser une visite ou recevoir une vidéo" : "je souhaite connaître la disponibilité et les conditions de location"} pour « ${rental.title} » à ${rentalLocation(rental)}. Référence : ${rental.slug}.${origin ? `\n${origin}${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logements/${encodeURIComponent(rental.slug)}/` : ""}`;
    function requestStay(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const start = data.get("arrival"), end = data.get("departure");
        const invalid = data.getAll("arrival").length !== 1 || data.getAll("departure").length !== 1 || typeof start !== "string" || typeof end !== "string";
        const error = invalid ? "Vérifiez les dates saisies." : rentalStayError(start, end);
        if (error) {
            setError(error);
            requestAnimationFrame(() => errorRef.current?.focus());
            return;
        }
        setError("");
        const format = (date: string) => date.split("-").reverse().join("/");
        const dates = typeof start === "string" && start ? `\nArrivée souhaitée : ${format(start)}.\nDépart souhaité : ${typeof end === "string" && end ? format(end) : "à préciser"}.` : "";
        window.location.assign(`https://wa.me/224623417510?text=${encodeURIComponent(message + dates)}`);
    }
    if (withDates) return <form className="rental-stay-form" onSubmit={requestStay} aria-label="Demander la disponibilité de ce logement">
        <fieldset disabled={!origin}>
            <legend>Vos dates souhaitées (facultatif)</legend>
            <p id={`${id}-help`} className="mb_16">Vous pouvez laisser les dates vides. Elles seront ajoutées à votre message WhatsApp ; CIP IMMO vous confirmera la disponibilité.</p>
            <div><label htmlFor={`${id}-arrival`}>Arrivée souhaitée</label><input id={`${id}-arrival`} name="arrival" type="date" min={today || undefined} value={arrival} onChange={event => setArrival(event.target.value)} aria-describedby={`${id}-help`} /></div>
            <div><label htmlFor={`${id}-departure`}>Départ souhaité</label><input id={`${id}-departure`} name="departure" type="date" min={arrival || today || undefined} aria-describedby={`${id}-help`} /></div>
        </fieldset>
        {error && <p ref={errorRef} role="alert" tabIndex={-1}>{error}</p>}
        <div className="rental-contact">
            <button type="submit" disabled={!origin} className="tf-btn btn-bg-1"><span>Continuer sur WhatsApp</span></button>
            <a href="tel:+224613585198" className="tf-btn" aria-label={`Appeler CIP IMMO pour ${rental.title}`}><span>Appeler</span></a>
        </div>
        <p className="mt_16">Vérifiez le message dans WhatsApp avant de l’envoyer. Cette demande ne réserve pas le logement.</p>
        <p><Link href="/privacy-policy#rights">Confidentialité et droits sur vos données</Link>.</p>
        <noscript><p><a href={`https://wa.me/224623417510?text=${encodeURIComponent(message)}`}>Demander ce logement sur WhatsApp</a>.</p></noscript>
    </form>;
    return <div className={`rental-contact${compact ? " rental-contact--compact" : ""}`}>
        <a href={`https://wa.me/224623417510?text=${encodeURIComponent(message)}`} className="tf-btn btn-bg-1" aria-label={`${visit ? "Demander une visite ou une vidéo" : "Écrire sur WhatsApp"} : ${rental.title}, référence ${rental.slug}`}>
            {compact && <svg className="rental-action-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.3A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 7.5c0 4 3.5 7.5 7.5 7.5l1-2.5-2.5-1-1 1c-1.5-.7-2.3-1.5-3-3l1-1-1-2.5Z"/></svg>}
            <span className="rental-action-label">{visit ? "Demander une visite ou une vidéo" : "WhatsApp"}</span>
        </a>
        {!visit && <a href="tel:+224613585198" className="tf-btn" aria-label={`Appeler CIP IMMO au +224 613 58 51 98 pour ${rental.title}`}>{compact && <i className="icon-PhoneCall rental-action-icon" aria-hidden="true" />}<span className="rental-action-label">Appeler</span></a>}
    </div>;
}
