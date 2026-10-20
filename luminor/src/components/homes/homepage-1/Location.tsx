import React from "react";
import { rentalCountLabel, rentalLocationOptions } from "@/data/cipRentals";

export default function Location() {
    return (
        <div className="section-location rental-destinations tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Nos destinations
                    </span>
                    <h2 className="h3 split-text effect-blur-fade">
                        Choisissez une ville ou un quartier
                    </h2>
                </div>
                <nav className="rental-destination-counts" aria-label="Logements proposés par ville">
                    {rentalLocationOptions.map(city => <a key={city} href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent(city)}`}>
                        <strong>{city}</strong> · {rentalCountLabel(city)}
                    </a>)}
                </nav>
                <p className="rental-destination-note">La disponibilité de chaque logement reste à confirmer avec CIP IMMO.</p>
                <p className="destination-scroll-hint">Faites glisser les petites cartes pour découvrir les autres destinations.</p>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2 destination-row">
                        <div className="destination-strip" tabIndex={0} role="region" aria-label="Destinations à faire défiler : Coléah et Coyah Km54">
                            <div
                                className="location-item hover-image"
                                data-delay="0.2"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coléah")}`} className="img-style mb_18">
                                    <span className="rental-image-placeholder" aria-label="Voir les logements : Coléah — photos à venir">À venir</span>
                                </a>
                                <div className="content">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coléah")}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Coléah, Conakry
                                    </a>
                                    <p>{rentalCountLabel("Coléah")}</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image"
                                data-delay="0.3"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah Km54")}`} className="img-style mb_18">
                                    <span className="rental-image-placeholder" aria-label="Voir les logements : Coyah Km54 — photos à venir">À venir</span>
                                </a>
                                <div className="content">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah Km54")}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Coyah Km54
                                    </a>
                                    <p>{rentalCountLabel("Coyah Km54")}</p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="location-item hover-image"
                            data-delay="0.4"
                        >
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Ansoumaniah")}`} className="img-style mb_18">
                                <span className="rental-image-placeholder" aria-label="Voir les logements : Ansoumaniah — photos à venir">À venir</span>
                            </a>
                            <div className="content">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Ansoumaniah")}`}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Ansoumaniah, Conakry
                                </a>
                                <p>{rentalCountLabel("Ansoumaniah")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="tf-grid-layout lg-col-2 destination-row">
                        <div
                            className="location-item hover-image"
                            data-delay="0.4"
                        >
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Conakry")}`} className="img-style mb_18">
                                <span className="rental-image-placeholder" aria-label="Voir les logements : Conakry — photos à venir">À venir</span>
                            </a>
                            <div className="content">
                                <a
                                    href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Conakry")}`}
                                    className="mb_4 link h5 text_primary-color"
                                >
                                    Conakry
                                </a>
                                <p>{rentalCountLabel("Conakry")}</p>
                            </div>
                        </div>
                        <div className="destination-strip" tabIndex={0} role="region" aria-label="Destinations à faire défiler : Coyah et la Guinée">
                            <div
                                className="location-item hover-image"
                                data-delay="0.3"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah")}`} className="img-style mb_18">
                                    <span className="rental-image-placeholder" aria-label="Voir les logements : Coyah — photos à venir">À venir</span>
                                </a>
                                <div className="content">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah")}`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        Coyah
                                    </a>
                                    <p>{rentalCountLabel("Coyah")}</p>
                                </div>
                            </div>
                            <div
                                className="location-item hover-image"
                                data-delay="0.2"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/`} className="img-style mb_18">
                                    <span className="rental-image-placeholder" aria-label="Voir les logements : Guinée — photos à venir">À venir</span>
                                </a>
                                <div className="content">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/`}
                                        className="mb_4 link h5 text_primary-color"
                                    >
                                        La Guinée
                                    </a>
                                    <p>{rentalCountLabel("")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
