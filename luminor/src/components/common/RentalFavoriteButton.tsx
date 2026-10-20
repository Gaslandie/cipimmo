"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { cipRentals, type Rental } from "@/data/cipRentals";

const storageKey = "cipimmo:favorites:v1";
function readFavorites(raw: string | null): string[] {
    if (!raw || raw.length > 10000) return [];
    try {
        const value: unknown = JSON.parse(raw);
        if (!Array.isArray(value)) return [];
        return [...new Set(value.filter((slug): slug is string => typeof slug === "string" && cipRentals.some(rental => rental.slug === slug)))];
    } catch { return []; }
}
const FavoritesContext = createContext<{
    slugs: string[]; ready: boolean; temporary: boolean; toggle: (slug: string) => void;
} | null>(null);

export function RentalFavoritesProvider({ children }: { children: ReactNode }) {
    const [slugs, setSlugs] = useState<string[]>([]);
    const [ready, setReady] = useState(false);
    const [temporary, setTemporary] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        try { setSlugs(readFavorites(localStorage.getItem(storageKey))); } catch { setTemporary(true); }
        setReady(true);
        const sync = (event: StorageEvent) => {
            if (event.key === storageKey || event.key === null) setSlugs(readFavorites(event.newValue));
        };
        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);
    function toggle(slug: string) {
        if (!ready || !cipRentals.some(rental => rental.slug === slug)) return;
        let current = slugs;
        if (!temporary) {
            try { current = readFavorites(localStorage.getItem(storageKey)); } catch { setTemporary(true); }
        }
        const removing = current.includes(slug);
        const next = removing ? current.filter(item => item !== slug) : [...current, slug];
        setSlugs(next);
        let saved = false;
        try { localStorage.setItem(storageKey, JSON.stringify(next)); saved = true; } catch { setTemporary(true); }
        setMessage(`${removing ? "Logement retiré des favoris." : "Logement ajouté aux favoris."}${saved ? "" : " Votre navigateur ne peut pas les conserver après cette visite."}`);
    }
    return <FavoritesContext.Provider value={{ slugs, ready, temporary, toggle }}>
        {children}
        <p className="visually-hidden" role="status">{message}</p>
    </FavoritesContext.Provider>;
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("RentalFavoritesProvider missing");
    return context;
}

export function RentalFavoriteButton({ rental }: { rental: Rental }) {
    const { slugs, ready, toggle } = useFavorites();
    const selected = slugs.includes(rental.slug);
    return <button type="button" className="rental-favorite-button" aria-pressed={selected} disabled={!ready}
        aria-label={`${selected ? "Retirer des favoris" : "Garder dans mes favoris"} : ${rental.title}, référence ${rental.slug}`}
        onClick={() => toggle(rental.slug)}>
        <span aria-hidden="true">{selected ? "♥" : "♡"}</span>
        <span className="rental-action-label">{selected ? "Retirer des favoris" : "Garder dans mes favoris"}</span>
    </button>;
}

