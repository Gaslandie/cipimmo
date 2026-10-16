import Image from "next/image";
import React from "react";
import { rentalCountLabel, rentalLocationOptions } from "@/data/cipRentals";

export default function Location() {
    return (
        <div className="section-location tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Nos destinations
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Choisissez une ville ou un quartier
                    </h3>
                </div>
                <nav className="rental-destination-counts" aria-label="Logements proposés par ville">
                    {rentalLocationOptions.map(city => <a key={city} href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent(city)}`}>
                        <strong>{city}</strong> · {rentalCountLabel(city)}
                    </a>)}
                </nav>
                <p className="rental-destination-note">La disponibilité de chaque logement reste à confirmer avec CIP IMMO.</p>
                <div className="wrap-location">
                    <div className="tf-grid-layout lg-col-2">
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coléah")}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-1.jpg?v=cip-photos-1"
                                        alt="Voir les logements : Coléah"
                                    />
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
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah Km54")}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-2.jpg?v=cip-photos-1"
                                        alt="Voir les logements : Coyah Km54"
                                    />
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
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Ansoumaniah")}`} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/location-3.jpg?v=cip-photos-1"
                                    alt="Voir les logements : Ansoumaniah"
                                />
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
                    <div className="tf-grid-layout lg-col-2">
                        <div
                            className="location-item hover-image scrolling-effect effectFade"
                            data-delay="0.4"
                        >
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Conakry")}`} className="img-style mb_18">
                                <Image
                                    width={630}
                                    height={300}
                                    src="/assets/images/section/location-4.jpg?v=cip-photos-1"
                                    alt="Voir les logements : Conakry"
                                />
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
                        <div className="d-flex gap_30">
                            <div
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.3"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/?city=${encodeURIComponent("Coyah")}`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-5.jpg?v=cip-photos-1"
                                        alt="Voir les logements : Coyah"
                                    />
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
                                className="location-item hover-image scrolling-effect effectFade"
                                data-delay="0.2"
                            >
                                <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar/`} className="img-style mb_18">
                                    <Image
                                        width={300}
                                        height={300}
                                        src="/assets/images/section/location-6.jpg?v=cip-photos-1"
                                        alt="Voir les logements : Guinée"
                                    />
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
