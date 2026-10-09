"use client";

import { cipRentals } from "@/data/cipRentals";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const emptyFilters = { keyword: "", duration: "", city: "", bedrooms: "", furnished: "", budget: "", minSize: "", maxSize: "" };
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
const cities = [...new Set(cipRentals.map((property) => property.city))];
const budgets = [
    { value: "300000:nuit", label: "300 000 GNF / nuit" },
    { value: "500000:nuit", label: "500 000 GNF / nuit" },
    { value: "1000000:nuit", label: "1 000 000 GNF / nuit" },
    { value: "2000000:mois", label: "2 000 000 GNF / mois" },
    { value: "3000000:mois", label: "3 000 000 GNF / mois" },
    { value: "4000000:mois", label: "4 000 000 GNF / mois" },
    { value: "5000000:mois", label: "5 000 000 GNF / mois" },
];

export default function Properties3() {
    const [filters, setFilters] = useState(emptyFilters);
    const [sorting, setSorting] = useState("default");
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [favorites, setFavorites] = useState<string[]>([]);
    const change = (key: keyof typeof emptyFilters, value: string) => setFilters((previous) => ({ ...previous, [key]: value }));
    const reset = () => { setFilters(emptyFilters); setSorting("default"); };
    const [maxBudget, budgetPeriod] = filters.budget.split(":");
    const keyword = normalize(filters.keyword.trim());
    const rentals = cipRentals.filter((property) =>
        (!filters.duration || property.duration === filters.duration) &&
        (!filters.city || property.city === filters.city) &&
        (!filters.bedrooms || (filters.bedrooms === "4+" ? property.beds >= 4 : property.beds === Number(filters.bedrooms))) &&
        (!filters.furnished || property.furnished === filters.furnished) &&
        (!filters.budget || (property.period === budgetPeriod && property.price <= Number(maxBudget))) &&
        (!filters.minSize || property.area >= Number(filters.minSize)) &&
        (!filters.maxSize || property.area <= Number(filters.maxSize)) &&
        (!keyword || normalize(`${property.title} ${property.city} ${property.description}`).includes(keyword))
    );
    if (sorting !== "default") {
        // Keep nightly and monthly prices in separate groups instead of comparing unlike periods.
        rentals.sort((a, b) => a.period === b.period
            ? (sorting === "price-asc" ? a.price - b.price : b.price - a.price)
            : a.period === "nuit" ? -1 : 1);
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
    const sizes = [50, 75, 90, 100, 150].map((size) => ({ value: String(size), label: `${size} m²` }));

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
                    <div className="row">
                        <div className="col-lg-4">
                            <form className="tf-filter-sidebar" aria-label="Rechercher un logement" onSubmit={(event) => {
                                event.preventDefault();
                                document.getElementById("rental-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}>
                                <div className="tab-slide mb_14">
                                    <ul className="menu-tab tf-grid-layout tf-col-2 gap_8">
                                        <li className="item-slide-effect" aria-hidden="true" style={{ width: "calc((100% - 8px) / 2)", transform: filters.duration === "Longue durée" ? "translateX(calc(100% + 8px))" : "translateX(0)", opacity: filters.duration ? 1 : 0 }} />
                                        {["Court séjour", "Longue durée"].map((duration) => (
                                            <li key={duration} className={`nav-tab-item ${filters.duration === duration ? "active" : ""}`}>
                                                <button type="button" className={`text-title tab-link fw-6 ${filters.duration === duration ? "active" : ""}`} aria-pressed={filters.duration === duration} onClick={() => setFilters((previous) => ({ ...previous, duration: previous.duration === duration ? "" : duration, budget: "" }))}>{duration}</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="form-sl"><div className="wd-filter-select"><div className="inner-group d-grid gap_16">
                                    <div>
                                        <label htmlFor="rental-keyword" className="text-button text_primary-color mb_8">Votre recherche</label>
                                        <input id="rental-keyword" type="search" placeholder="Quartier, logement…" maxLength={200} value={filters.keyword} onChange={(event) => change("keyword", event.target.value)} />
                                    </div>
                                    {select("city", "Localisation", "Tous les quartiers", cities.map((city) => ({ value: city, label: city })))}
                                    {select("bedrooms", "Chambres", "Toutes", ["1", "2", "3", "4+"].map((beds) => ({ value: beds, label: beds === "4+" ? "4 chambres ou plus" : `${beds} chambre${beds === "1" ? "" : "s"}` })))}
                                    {select("furnished", "Mobilier", "Tous les logements", ["Meublé", "Non meublé"].map((label) => ({ value: label, label })))}
                                    {select("budget", "Budget maximal", "Tous les budgets", budgets.filter((budget) => !filters.duration || budget.value.endsWith(filters.duration === "Court séjour" ? ":nuit" : ":mois")))}
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
                        <div className="col-lg-8" id="rental-results">
                            <p className="mb_20" role="status">{rentals.length} logement{rentals.length > 1 ? "s" : ""}{filters.duration ? ` · ${filters.duration}` : " · Toutes les durées"}</p>
                            {sorting !== "default" && !filters.duration && <p className="mb_20">Prix triés par durée : à la nuit, puis au mois.</p>}
                            {rentals.length === 0 ? (
                                <div className="tf-filter-sidebar">
                                    <h5 className="mb_12">Aucun logement ne correspond à votre recherche.</h5>
                                    <p className="mb_20">Essayez un autre quartier ou élargissez vos critères.</p>
                                    <button type="button" className="tf-btn btn-bg-1" onClick={reset}>Voir tous les logements</button>
                                </div>
                            ) : (
                                <div className={layout === "grid" ? "tf-grid-layout md-col-2" : "d-grid gap_20"}>
                                    {rentals.map((property) => (
                                        <article key={property.slug} className={`card-house ${layout === "grid" ? "style-default hover-image" : "style-list v3"}`} data-slug={property.slug}>
                                            <div className={layout === "list" ? "wrap-img" : ""}>
                                                <div className={`img-style ${layout === "grid" ? "mb_20" : ""}`}>
                                                    <Image src={property.imgSrc} width={410} height={308} alt={property.imageAlt} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" />
                                                    {layout === "grid" && <div className="wrap-tag d-flex gap_8 mb_12">
                                                        <span className="tag rent text-button-small fw-6 text_primary-color">{property.duration}</span>
                                                        <span className="tag categoreis text-button-small fw-6 text_primary-color">{property.category}</span>
                                                    </div>}
                                                    <Link href={`/logements/${property.slug}`} className="overlay-link" aria-label={`Voir ${property.title}`} />
                                                    <div className="wishlist"><button type="button" className="box-icon" aria-label={`${favorites.includes(property.slug) ? "Retirer des" : "Ajouter aux"} favoris : ${property.title}`} aria-pressed={favorites.includes(property.slug)} onClick={() => setFavorites((previous) => previous.includes(property.slug) ? previous.filter((slug) => slug !== property.slug) : [...previous, property.slug])}><span className="icon icon-Heart" aria-hidden="true" /></button></div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h4 className="price mb_12">{property.price.toLocaleString("fr-FR")} GNF<span className="text_secondary-color text-body-default"> / {property.period}</span></h4>
                                                {layout === "list" && <div className="wrap-tag d-flex gap_8 mb_12"><span className="tag rent text-button-small fw-6">{property.duration}</span><span className="tag categoreis text-button-small fw-6">{property.category}</span></div>}
                                                <Link href={`/logements/${property.slug}`} className="title mb_8 h5 link text_primary-color">{property.title}</Link>
                                                <p>{property.city}, Guinée</p>
                                                <ul className="info d-flex">
                                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"><i className="icon-Bed" aria-hidden="true" />{property.beds} ch.</li>
                                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"><i className="icon-HouseLine" aria-hidden="true" />{property.furnished || "Salon"}</li>
                                                    <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6"><i className="icon-Ruler" aria-hidden="true" />{property.area} m²</li>
                                                </ul>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
