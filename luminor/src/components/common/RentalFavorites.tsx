"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cipRentals } from "@/data/cipRentals";
import RentalCard from "./RentalCard";
import { useFavorites } from "./RentalFavoriteButton";

export default function RentalFavorites() {
    const { slugs, ready, temporary } = useFavorites();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const previousCount = useRef(0);
    useEffect(() => {
        if (slugs.length < previousCount.current && document.activeElement === document.body) titleRef.current?.focus();
        previousCount.current = slugs.length;
    }, [slugs.length]);
    return <div className="tf-container tf-spacing-1 rental-favorites-page">
        <h1 className="h3 mb_20" ref={titleRef} tabIndex={-1}>Mes favoris</h1>
        <p className="mb_20">Retrouvez ici les logements que vous avez gardés pour les comparer. Votre sélection reste dans ce navigateur, sur cet appareil. Elle ne réserve aucun logement.</p>
        {temporary && <p className="rental-demo-note mb_20">Votre navigateur ne peut pas enregistrer les favoris. Ils restent accessibles pendant cette visite, puis peuvent disparaître.</p>}
        {!ready ? <p role="status">Chargement de vos favoris…</p> : slugs.length ? <>
            <p role="status" className="mb_20">{slugs.length} logement{slugs.length > 1 ? "s" : ""} dans vos favoris.</p>
            <div className="tf-grid-layout md-col-2 lg-col-3 rental-card-grid">{cipRentals.filter(rental => slugs.includes(rental.slug)).map(rental => <RentalCard key={rental.slug} rental={rental} />)}</div>
        </> : <p className="mb_20">Vous n’avez pas encore de favoris. Utilisez le bouton « Garder dans mes favoris » sur un logement.</p>}
        <Link className="tf-btn btn-bg-1 mt_24" href="/listing-left-sidebar"><span>Voir les logements</span></Link>
    </div>;
}
