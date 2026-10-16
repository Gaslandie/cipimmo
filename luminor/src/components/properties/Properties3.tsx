"use client";

import { emptyRentalFilters as emptyFilters, rentalLocationOptions, rentalDistrictOptions, rentalBudgets as budgets, rentalSizes as sizes, readRentalFilters, rentalFilterQuery, filterRentals } from "@/data/cipRentals";
import RentalCard from "../common/RentalCard";
import Link from "next/link";
import { useEffect, useState } from "react";

const cities = [...new Set([...rentalLocationOptions, ...rentalDistrictOptions])];

export default function Properties3() {
    const [filters, setFilters] = useState(emptyFilters);
    const [invalid, setInvalid] = useState(false);
    useEffect(() => {
        const read = () => {
            const parsed = readRentalFilters(new URLSearchParams(window.location.search));
            setFilters(parsed.filters);
            setInvalid(parsed.invalid);
        };
        read();
        window.addEventListener("popstate", read);
        return () => window.removeEventListener("popstate", read);
    }, []);
    const [sorting, setSorting] = useState("default");
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const updateFilters = (next: typeof emptyFilters) => {
        setFilters(next);
        setInvalid(false);
        const query = rentalFilterQuery(next);
        window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    };
    const change = (key: keyof typeof emptyFilters, value: string) => updateFilters({ ...filters, [key]: value });
    const reset = () => { updateFilters({ ...emptyFilters }); setSorting("default"); };
    const rentals = invalid ? [] : filterRentals(filters);
    if (sorting !== "default") {
        // Keep daily and monthly prices in separate groups instead of comparing unlike periods.
        rentals.sort((a, b) => {
            if (a.price === null) return b.price === null ? 0 : 1;
            if (b.price === null) return -1;
            return a.period === b.period
                ? (sorting === "price-asc" ? a.price - b.price : b.price - a.price)
                : ["jour", "nuit", "mois"].indexOf(a.period) - ["jour", "nuit", "mois"].indexOf(b.period);
        });
    }
    const select = (key: keyof typeof emptyFilters, label: string, placeholder: string, options: { value: string; label: string }[]) => (
        <div>
            <label htmlFor={`rental-${key}`} className="text-button text_primary-color mb_8">{label}</label>
            <select id={`rental-${key}`} className="nice-select w-full" value={filters[key]} onChange={(event) => change(key, event.target.value)}>
                <option value="">{placeholder}</option>
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
        </div>
    );

    return (
        <div className="main-content">
            <div className="tf-spacing-1 section-properties cip-rentals">
                <div className="tf-container">
                    <div className="box-title mb_40">
                        <div>
                            <ul className="breadcrumb style-1 text-button fw-4 mb_4">
                                <li><Link href="/">Accueil</Link></li>
                                <li>Nos logements</li>
                            </ul>
                            <h1 className="h4">Nos logements à louer</h1>
                        </div>
                        <div className="right d-flex gap_12">
                            <div className="nav-tab-filter align-items-center group-layout d-flex gap_12" aria-label="Affichage des logements">
                                <button type="button" className={`btn-layout grid nav-link-item ${layout === "grid" ? "active" : ""}`} aria-label="Afficher en grille" aria-pressed={layout === "grid"} onClick={() => setLayout("grid")}><i className="icon-SquaresFour" aria-hidden="true" /></button>
                                <button type="button" className={`btn-layout list nav-link-item ${layout === "list" ? "active" : ""}`} aria-label="Afficher en liste" aria-pressed={layout === "list"} onClick={() => setLayout("list")}><i className="icon-Rows" aria-hidden="true" /></button>
                            </div>
                            <select className="nice-select list-sort" aria-label="Trier les logements" value={sorting} onChange={(event) => setSorting(event.target.value)}>
                                <option value="default">Tri par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="tf-btn btn-bg-1 d-lg-none mb_20"
                        aria-expanded={showFilters}
                        aria-controls="rental-filter-panel"
                        onClick={() => setShowFilters((visible) => !visible)}
                    >
                        <span>{showFilters ? "Masquer les filtres" : "Modifier ma recherche"}</span>
                    </button>
                    <div className="row">
                        <div id="rental-filter-panel" className={`col-lg-4 rental-filter-panel${showFilters ? " is-open" : ""}`}>
                            <form className="tf-filter-sidebar" aria-label="Rechercher un logement" onSubmit={(event) => {
                                event.preventDefault();
                                const results = document.getElementById("rental-results");
                                results?.focus({ preventScroll: true });
                                results?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
                            }}>
                                <div className="tab-slide mb_14">
                                    <ul className="menu-tab tf-grid-layout tf-col-2 gap_8">
                                        <li className="item-slide-effect" aria-hidden="true" style={{ width: "calc((100% - 8px) / 2)", transform: filters.duration === "Longue durée" ? "translateX(calc(100% + 8px))" : "translateX(0)", opacity: filters.duration ? 1 : 0 }} />
                                        {["Court séjour", "Longue durée"].map((duration) => (
                                            <li key={duration} className={`nav-tab-item ${filters.duration === duration ? "active" : ""}`}>
                                                <button type="button" className={`text-title tab-link fw-6 ${filters.duration === duration ? "active" : ""}`} aria-pressed={filters.duration === duration} onClick={() => updateFilters({ ...filters, duration: filters.duration === duration ? "" : duration, budget: "" })}>{duration}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="form-sl"><div className="wd-filter-select"><div className="inner-group d-grid gap_16">
                                    <div>
                                        <label htmlFor="rental-keyword" className="text-button text_primary-color mb_8">Votre recherche</label>
                                        <input id="rental-keyword" type="search" placeholder="Ville, logement…" maxLength={200} value={filters.keyword} onChange={(event) => change("keyword", event.target.value)} />
                                    </div>
                                    {select("city", "Ville ou quartier", "Tous les lieux", cities.map((city) => ({ value: city, label: city })))}
                                    {select("bedrooms", "Chambres", "Toutes", ["1", "2", "3", "4+"].map((beds) => ({ value: beds, label: beds === "4+" ? "4 chambres ou plus" : `${beds} chambre${beds === "1" ? "" : "s"}` })))}
                                    {select("furnished", "Mobilier", "Tous les logements", ["Meublé", "Non meublé"].map((label) => ({ value: label, label })))}
                                    {select("budget", "Budget maximal", "Tous les budgets", budgets.filter((budget) => !filters.duration || (filters.duration === "Court séjour" ? !budget.value.endsWith(":mois") : budget.value.endsWith(":mois"))))}
                                    <div className="tf-grid-layout sm-col-2 gap_20">
                                        {select("minSize", "Surface min.", "Sans minimum", sizes)}
                                        {select("maxSize", "Surface max.", "Sans maximum", sizes)}
                                    </div>
                                    <div className="form-style">
                                        <button type="submit" className="tf-btn w-full"><span>Rechercher</span><span className="bg-effect" /></button>
                                    </div>
                                    <button type="button" className="rental-reset text-button" onClick={reset}>Réinitialiser les filtres</button>
                                </div></div></div>
                            </form>
                        </div>
                        <div className="col-lg-8" id="rental-results" tabIndex={-1} aria-label="Résultats de votre recherche">
                            {invalid && <p role="alert" className="rental-demo-note mb_20">Certains critères du lien sont invalides. Réinitialisez les filtres pour recommencer.</p>}
                            <p className="mb_20" role="status">{rentals.length} logement{rentals.length > 1 ? "s" : ""}{filters.duration ? ` · ${filters.duration}` : " · Toutes les durées"}</p>
                            {sorting !== "default" && !filters.duration && <p className="mb_20">Prix regroupés par période : les tarifs par jour, par nuit et par mois restent séparés.</p>}
                            {rentals.length === 0 ? (
                                <div className="tf-filter-sidebar">
                                    <h2 className="h5 mb_12">Aucun logement ne correspond à votre recherche.</h2>
                                    <p className="mb_20">Essayez une autre ville ou élargissez vos critères.</p>
                                    <button type="button" className="tf-btn btn-bg-1" onClick={reset}>Voir tous les logements</button>
                                </div>
                            ) : (
                                <div className={`rental-results-layout ${layout === "grid" ? "tf-grid-layout md-col-2" : "d-grid gap_20"}`}>
                                    {rentals.map(rental => <RentalCard key={rental.slug} rental={rental} list={layout === "list"} />)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
