"use client";

import { emptyRentalFilters as emptyFilters, rentalLocationOptions, rentalDistrictsForCity, rentalSizes as sizes, readRentalFilters, rentalFilterQuery, filterRentals } from "@/data/cipRentals";
import RentalBudgetFields from "../common/RentalBudgetFields";
import RentalCard from "../common/RentalCard";
import RentalHelp from "../common/RentalHelp";
import Link from "next/link";
import { useEffect, useState } from "react";

const sortOptions = ["default", "price-asc", "price-desc", "area-desc", "beds-desc"];
const cities = rentalLocationOptions;

export default function Properties3() {
    const [filters, setFilters] = useState(emptyFilters);
    const [invalid, setInvalid] = useState(false);
    useEffect(() => {
        const read = () => {
            const params = new URLSearchParams(window.location.search);
            const parsed = readRentalFilters(params);
            const sort = params.get("sort") || "default", view = params.get("view") || "grid";
            const invalidView = !sortOptions.includes(sort) || !["grid", "list"].includes(view) || params.getAll("sort").length > 1 || params.getAll("view").length > 1;
            setFilters(parsed.filters); setSorting(sortOptions.includes(sort) ? sort : "default"); setLayout(view === "list" ? "list" : "grid");
            setInvalid(parsed.invalid || invalidView);
        };
        read();
        window.addEventListener("popstate", read);
        return () => window.removeEventListener("popstate", read);
    }, []);
    const [sorting, setSorting] = useState("default");
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const saveQuery = (next: typeof emptyFilters, sort = sorting, view = layout) => {
        const params = new URLSearchParams(rentalFilterQuery(next));
        if (sort !== "default") params.set("sort", sort);
        if (view !== "grid") params.set("view", view);
        const query = params.toString();
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
    };
    const updateFilters = (next: typeof emptyFilters) => {
        setFilters(next); setInvalid(readRentalFilters(new URLSearchParams(rentalFilterQuery(next))).invalid); saveQuery(next);
    };
    const change = (key: keyof typeof emptyFilters, value: string) => updateFilters({ ...filters, [key]: value, ...(key === "city" ? { district: "" } : {}) });
    const changeLayout = (view: "grid" | "list") => { setLayout(view); saveQuery(filters, sorting, view); };
    const changeSorting = (sort: string) => { if (sortOptions.includes(sort)) { setSorting(sort); saveQuery(filters, sort); } };
    const reset = () => { setFilters({ ...emptyFilters }); setInvalid(false); setSorting("default"); setLayout("grid"); saveQuery(emptyFilters, "default", "grid"); };
    const rentals = invalid ? [] : filterRentals(filters);
    if (sorting !== "default") {
        // Keep daily and monthly prices in separate groups instead of comparing unlike periods.
        rentals.sort((a, b) => {
            if (sorting === "area-desc") return (b.area ?? -1) - (a.area ?? -1);
            if (sorting === "beds-desc") return (b.beds ?? -1) - (a.beds ?? -1);
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
            <select id={`rental-${key}`} className="nice-select w-full" value={filters[key]} disabled={key === "district" && !filters.city} onChange={(event) => change(key, event.target.value)}>
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
                                <button type="button" className={`btn-layout grid nav-link-item ${layout === "grid" ? "active" : ""}`} aria-label="Afficher en grille" aria-pressed={layout === "grid"} onClick={() => changeLayout("grid")}><i className="icon-SquaresFour" aria-hidden="true" /></button>
                                <button type="button" className={`btn-layout list nav-link-item ${layout === "list" ? "active" : ""}`} aria-label="Afficher en liste" aria-pressed={layout === "list"} onClick={() => changeLayout("list")}><i className="icon-Rows" aria-hidden="true" /></button>
                            </div>
                            <select className="nice-select list-sort" aria-label="Trier les logements" value={sorting} onChange={(event) => changeSorting(event.target.value)}>
                                <option value="default">Tri par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                                <option value="area-desc">Les plus grands d’abord</option>
                                <option value="beds-desc">Le plus de chambres d’abord</option>
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
                                                <button type="button" className={`text-title tab-link fw-6 ${filters.duration === duration ? "active" : ""}`} aria-pressed={filters.duration === duration} onClick={() => updateFilters({ ...filters, duration: filters.duration === duration ? "" : duration, budget: "", budgetPeriod: "" })}>{duration}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="form-sl"><div className="wd-filter-select"><div className="inner-group d-grid gap_16">
                                    <div>
                                        <label htmlFor="rental-keyword" className="text-button text_primary-color mb_8">Votre recherche</label>
                                        <input id="rental-keyword" type="search" placeholder="Ville, logement…" maxLength={200} value={filters.keyword} onChange={(event) => change("keyword", event.target.value)} />
                                    </div>
                                    {select("city", "Ville", "Toutes les villes", cities.map((city) => ({ value: city, label: city })))}
                                    {select("district", "Quartier", filters.city ? "Tous les quartiers" : "Choisissez d’abord une ville", rentalDistrictsForCity(filters.city).map(district => ({ value: district, label: district })))}
                                    {select("bedrooms", "Chambres", "Toutes", ["1", "2", "3", "4+"].map((beds) => ({ value: beds, label: beds === "4+" ? "4 chambres ou plus" : `${beds} chambre${beds === "1" ? "" : "s"}` })))}
                                    {select("furnished", "Mobilier", "Tous les logements", ["Meublé", "Non meublé"].map((label) => ({ value: label, label })))}
                                    <RentalBudgetFields id="rental" amount={filters.budget} period={filters.budgetPeriod} duration={filters.duration}
                                        onChange={(budget, budgetPeriod) => updateFilters({ ...filters, budget, budgetPeriod })} />
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
                            {sorting.startsWith("price-") && !filters.duration && <p className="mb_20">Prix regroupés par période : les tarifs par jour, par nuit et par mois restent séparés.</p>}
                            {rentals.length === 0 ? (
                                <div className="tf-filter-sidebar">
                                    <h2 className="h5 mb_12">Aucun logement ne correspond à votre recherche.</h2>
                                    <p className="mb_20">Essayez une autre ville ou élargissez vos critères.</p>
                                    <button type="button" className="tf-btn btn-bg-1" onClick={reset}>Voir tous les logements</button>
                                    <RentalHelp />
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
