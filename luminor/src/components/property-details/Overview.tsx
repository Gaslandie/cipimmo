import React from "react";

export default function Overview({ property }: { property: { id: number; beds?: number; baths?: number; sqft?: number; categories: string; type: string; garages: number; city: string } }) {
    return (
        <div>
            <h5 className="properties-title mb_20">Le logement en bref</h5>
            <div className="tf-grid-layout tf-col-2 xl-col-4 md-col-3">
                <div className="item d-flex gap_16">
                    <i className="icon icon-HouseSimple"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Référence :</span>
                        <span className="text-title fw-6 text_primary-color">
                            CIP-00{property.id}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-SlidersHorizontal"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Type :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.categories}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Bed"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Chambres :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.beds} ch.
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Shower"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Salles de bain :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.baths} sdb.
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Warehouse"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Stationnement :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.garages ? "Oui" : "Non"}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Ruler"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Surface :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.sqft} m²
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-Crop"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Pièces de vie :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.city === "Coyah Km54" ? "Salon" : "Salon et cuisine"}
                        </span>
                    </div>
                </div>
                <div className="item d-flex gap_16">
                    <i className="icon icon-CalendarBlank"></i>
                    <div className="d-flex flex-column gap">
                        <span className="text-body-default">Durée :</span>
                        <span className="text-title fw-6 text_primary-color">
                            {property.type}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
