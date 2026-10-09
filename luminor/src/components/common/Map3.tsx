"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapFallback from "./MapFallback";

export default function Map3() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
        if (!accessToken) {
            setError("Découvrez nos logements à Coléah, Coyah Km54 et Ansoumaniah.");
            return;
        }

        if (!mapContainer.current) return;

        let map: mapboxgl.Map | undefined;
        try {
            mapboxgl.accessToken = accessToken;
            const officeCoordinates: [number, number] = [-13.4, 9.7];

            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/light-v11",
                center: officeCoordinates,
                zoom: 13,
                bearing: 0,
                pitch: 0,
                cooperativeGestures: true,
            });

            map.on("load", () => {
                const markerElement = document.createElement("div");
                markerElement.className = "office-marker";
                markerElement.innerHTML = `<i class="icon-HouseLine"></i>`;
                const popupContent = `
                    <div class="office-popup">
                        <div class="text-title text_primary-color fw-6 mb_4">CIP IMMO · Secteur de Coyah</div>
                        <p>Coyah, Guinée</p>
                    </div>
                `;

                const popup = new mapboxgl.Popup({
                    closeButton: true,
                    closeOnClick: false,
                    offset: [0, -60],
                }).setHTML(popupContent);

                // TypeScript: map is always defined here
                new mapboxgl.Marker({
                    element: markerElement,
                    anchor: "bottom",
                })
                    .setLngLat(officeCoordinates)
                    .setPopup(popup)
                    .addTo(map! as mapboxgl.Map)
                    .togglePopup();

                map!.addControl(new mapboxgl.NavigationControl(), "top-right");
                map!.addControl(new mapboxgl.FullscreenControl(), "top-right");
            });

            map.on("error", (e) => {
                console.error("Mapbox error:", e);
                setError("Découvrez nos logements à Coléah, Coyah Km54 et Ansoumaniah.");
            });
        } catch (err) {
            console.error("Map init error:", err);
            setError("Découvrez nos logements à Coléah, Coyah Km54 et Ansoumaniah.");
        }

        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    if (error) return <MapFallback />;
    return <div ref={mapContainer} className="map-container" />;
}
