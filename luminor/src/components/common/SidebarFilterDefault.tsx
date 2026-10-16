"use client";

import { useState } from "react";
import { rentalLocationOptions, rentalDistrictOptions } from "@/data/cipRentals";

import RentalBudgetFields from "./RentalBudgetFields";

export default function SidebarFilterDefault() {
    const [duration, setDuration] = useState("");
    const [budget, setBudget] = useState({ amount: "", period: "" });
    return <div className="flat-tab flat-tab-form">
        <div className="tf-container">
            <form action={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/`} method="get" className="wg-filter rental-home-search" aria-label="Trouver un logement">
                <div className="rental-search-fields">
                    <div>
                        <label htmlFor="home-location">Ville ou quartier</label>
                        <select id="home-location" name="city" defaultValue="">
                            <option value="">Tous les lieux</option>
                            <optgroup label="Villes">{rentalLocationOptions.map(city => <option key={city}>{city}</option>)}</optgroup>
                            <optgroup label="Quartiers">{rentalDistrictOptions.map(city => <option key={city}>{city}</option>)}</optgroup>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="home-duration">Durée de location</label>
                        <select id="home-duration" name="duration" value={duration} onChange={event => { setDuration(event.target.value); setBudget({ amount: "", period: "" }); }}>
                            <option value="">Toutes les durées</option><option value="courte">Court séjour</option><option value="longue">Longue durée</option>
                        </select>
                    </div>
                    <RentalBudgetFields id="home" amount={budget.amount} period={budget.period} duration={duration}
                        onChange={(amount, period) => setBudget({ amount, period })} />
                    <button type="submit" className="tf-btn btn-bg-1"><span>Rechercher</span></button>
                </div>
                <details className="rental-more-filters">
                    <summary>Plus de critères</summary>
                    <div className="rental-search-fields">
                        <div><label htmlFor="home-keyword">Votre recherche</label><input type="search" id="home-keyword" name="keyword" maxLength={200} placeholder="Nom du logement, quartier…" /></div>
                        <div><label htmlFor="home-bedrooms">Chambres</label><select id="home-bedrooms" name="bedrooms" defaultValue=""><option value="">Peu importe</option>{["1", "2", "3", "4+"].map(n => <option key={n} value={n}>{n === "4+" ? "4 chambres ou plus" : `${n} chambre${n === "1" ? "" : "s"}`}</option>)}</select></div>
                        <div><label htmlFor="home-furnished">Mobilier</label><select id="home-furnished" name="furnished" defaultValue=""><option value="">Tous les logements</option><option value="meuble">Meublé</option><option value="non-meuble">Non meublé</option></select></div>
                    </div>
                </details>
                <nav className="rental-shortcuts" aria-label="Recherches en un clic">
                    <p>Recherches en un clic</p>
                    <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=Conakry&duration=courte`}>Court séjour à Conakry</a>
                    <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=Ansoumaniah&bedrooms=3`}>Trois chambres à Ansoumaniah</a>
                    <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=Coyah&duration=longue`}>Location longue durée à Coyah</a>
                </nav>
            </form>
        </div>
    </div>;
}
