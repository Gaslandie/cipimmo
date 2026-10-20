"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { readRentalFilters, rentalDistrictOptions, rentalLocationOptions } from "@/data/cipRentals";

import RentalBudgetFields from "./RentalBudgetFields";

export default function RentalHelp() {
    const [duration, setDuration] = useState("");
    const [budgetFields, setBudgetFields] = useState({ amount: "", period: "" });
    const [error, setError] = useState("");
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    const errorRef = useRef<HTMLParagraphElement>(null);

    function prepareMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params = new URLSearchParams();
        for (const key of ["city", "duration", "budget", "budgetPeriod"]) {
            for (const value of data.getAll(key)) params.append(key, typeof value === "string" ? value : "invalid");
        }
        const { filters, invalid } = readRentalFilters(params);
        if (invalid) {
            setError("Vérifiez le lieu, la durée et la période du budget avant de continuer.");
            requestAnimationFrame(() => errorRef.current?.focus());
            return;
        }
        setError("");
        const budget = filters.budget ? `${Number(filters.budget).toLocaleString("fr-FR")} GNF / ${filters.budgetPeriod}` : "À préciser";
        const message = `Bonjour CIP IMMO, aidez-moi à trouver un logement.\nVille ou quartier : ${[filters.district, filters.city].filter(Boolean).join(", ") || "À préciser"}.\nDurée de location : ${filters.duration || "À préciser"}.\nBudget maximal : ${budget}.\nQuels logements pouvez-vous me proposer et à quelles conditions ?`;
        window.location.assign(`https://wa.me/224623417510?text=${encodeURIComponent(message)}`);
    }

    return <details className="rental-help">
        <summary>Aidez-moi à trouver un logement</summary>
        <form onSubmit={prepareMessage} aria-label="Demander de l’aide pour trouver un logement">
            <fieldset disabled={!ready} className="whatsapp-fields">
            <p id="rental-help-description">Vous pouvez laisser ces choix vides si vous hésitez. WhatsApp s’ouvrira avec votre message : vous pourrez le vérifier et l’envoyer vous-même.</p>
            <div className="rental-help-fields">
                <div>
                    <label htmlFor="help-location">Ville ou quartier souhaité</label>
                    <select id="help-location" name="city" defaultValue="">
                        <option value="">À préciser ensemble</option>
                        <optgroup label="Villes">{rentalLocationOptions.map(city => <option key={city}>{city}</option>)}</optgroup>
                        <optgroup label="Quartiers">{rentalDistrictOptions.map(city => <option key={city}>{city}</option>)}</optgroup>
                    </select>
                </div>
                <div>
                    <label htmlFor="help-duration">Durée souhaitée</label>
                    <select id="help-duration" name="duration" value={duration} onChange={event => { setDuration(event.target.value); setBudgetFields({ amount: "", period: "" }); }}>
                        <option value="">À préciser ensemble</option><option value="courte">Court séjour</option><option value="longue">Longue durée</option>
                    </select>
                </div>
                <RentalBudgetFields id="help" amount={budgetFields.amount} period={budgetFields.period} duration={duration}
                    onChange={(amount, period) => setBudgetFields({ amount, period })} />
            </div>
            {error && <p ref={errorRef} role="alert" tabIndex={-1}>{error}</p>}
            <div className="rental-contact">
                <button type="submit" className="tf-btn btn-bg-1" aria-describedby="rental-help-description"><span>Continuer sur WhatsApp</span></button>
                <a href="tel:+224613585198" className="tf-btn" aria-label="Appeler CIP IMMO au +224 613 58 51 98"><span>Appeler CIP IMMO</span></a>
            </div>
            <p className="mt_16">Vos critères sont transmis à WhatsApp pour préparer le message. <Link href="/privacy-policy#rights">Confidentialité et droits sur vos données</Link>.</p>
            </fieldset>
            <noscript><p><a href="https://wa.me/224623417510">Demandez de l’aide sur WhatsApp</a>.</p></noscript>
        </form>
    </details>;
}
