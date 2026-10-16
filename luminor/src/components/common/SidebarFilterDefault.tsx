"use client";

import { useState } from "react";
import { rentalLocationOptions, rentalDistrictOptions, rentalBudgets } from "@/data/cipRentals";

export default function SidebarFilterDefault() {
    const [duration, setDuration] = useState("");
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
                        <select id="home-duration" name="duration" value={duration} onChange={event => setDuration(event.target.value)}>
                            <option value="">Toutes les durées</option><option value="courte">Court séjour</option><option value="longue">Longue durée</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="home-budget">Budget maximal</label>
                        <select id="home-budget" name="budget" key={duration} defaultValue="" aria-describedby="home-budget-help">
                            <option value="">Sans maximum</option>
                            {rentalBudgets.filter(b => !duration || (duration === "courte" ? !b.value.endsWith(":mois") : b.value.endsWith(":mois"))).map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="tf-btn btn-bg-1"><span>Rechercher</span></button>
                </div>
                <p id="home-budget-help" className="rental-search-help">Le budget s’applique à la période choisie : jour, nuit ou mois.</p>
                <details className="rental-more-filters">
                    <summary>Plus de critères</summary>
                    <div className="rental-search-fields">
                        <div><label htmlFor="home-keyword">Votre recherche</label><input type="search" id="home-keyword" name="keyword" maxLength={200} placeholder="Nom du logement, quartier…" /></div>
                        <div><label htmlFor="home-bedrooms">Chambres</label><select id="home-bedrooms" name="bedrooms" defaultValue=""><option value="">Peu importe</option>{["1", "2", "3", "4+"].map(n => <option key={n} value={n}>{n === "4+" ? "4 chambres ou plus" : `${n} chambre${n === "1" ? "" : "s"}`}</option>)}</select></div>
                        <div><label htmlFor="home-furnished">Mobilier</label><select id="home-furnished" name="furnished" defaultValue=""><option value="">Tous les logements</option><option value="meuble">Meublé</option><option value="non-meuble">Non meublé</option></select></div>
                    </div>
                </details>
            </form>
        </div>
    </div>;
}
