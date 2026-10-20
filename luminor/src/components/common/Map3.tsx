"use client";

import { useState } from "react";

export default function Map3() {
    const [showMap, setShowMap] = useState(false);
    return <div className="map-container">
        <p>Nongo Kiroti, Conakry, Guinée</p>
        <p>La carte est fournie par Google. Son affichage transmet des données de connexion à ce service.</p>
        <button type="button" className="tf-btn btn-bg-1" aria-expanded={showMap} aria-controls="office-sector-map" onClick={() => setShowMap((visible) => !visible)}>
            {showMap ? "Fermer la carte" : "Voir le secteur sur la carte"}
        </button>
        {showMap && <div id="office-sector-map">
            <p>Vue du secteur de Nongo Kiroti. Contactez-nous pour le repère exact du bureau.</p>
            <iframe
                src="https://www.google.com/maps?q=Nongo%20Kiroti%2C%20Conakry%2C%20Guin%C3%A9e&output=embed"
                title="Carte de Nongo Kiroti, Conakry, Guinée — secteur de CIP IMMO"
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
            />
        </div>}
    </div>;
}
