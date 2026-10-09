import React from "react";
import DropdownSelect2 from "./DropdownSelect2";

// Critères du bloc de recherche CIP IMMO ; les autres écrans du thème restent indépendants.
const bathroomOptions = ["Peu importe", "1", "2", "3", "4 et plus"];
const furnitureOptions = ["Peu importe", "Meublé", "Non meublé"];
const minSizeOptions = ["Sans minimum", "20 m²", "50 m²", "100 m²", "150 m²", "200 m²"];
const maxSizeOptions = ["Sans maximum", "50 m²", "100 m²", "150 m²", "200 m²", "300 m²"];
const amenitiesList = [
    "Climatisation", "Accès adapté", "Télévision", "Ascenseur", "Interphone",
    "Sécurité", "Clôture", "Garage", "Stationnement", "Piscine", "Jardin",
    "Animaux acceptés", "Wi-Fi",
];

interface AdvanceSearchProps {
    ddContainer: React.RefObject<HTMLDivElement>;
}


export default function AdvanceSearchDefault({
    ddContainer,
}: AdvanceSearchProps) {


    return (
        <div className="wd-search-form" ref={ddContainer}>
            <div className="group-select">
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Salles de bain
                        </div>
                        <DropdownSelect2
                            options={bathroomOptions}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Mobilier
                        </div>
                        <DropdownSelect2
                            options={furnitureOptions}
                        />
                    </div>
                </div>
                <div className="tf-grid-layout sm-col-2">
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Surface minimale (m²)
                        </div>
                        <DropdownSelect2
                            options={minSizeOptions}
                        />
                    </div>
                    <div className="box-select">
                        <div className="text-button text_primary-color mb_8">
                            Surface maximale (m²)
                        </div>
                        <DropdownSelect2
                            options={maxSizeOptions}
                        />
                    </div>
                </div>
            </div>
            <div className="group-checkbox">
                <div className="text-title text_primary-color mb_12 fw-6">
                    Équipements :
                </div>
                <div className="group-amenities">
                    {amenitiesList.map((amenity) => (
                        <fieldset
                            key={amenity}
                            className="checkbox-item style-1"
                        >
                            <label>
                                <input
                                    type="checkbox"
                                />
                                <span className="btn-checkbox"></span>
                                <span className="text-body-default">
                                    {amenity}
                                </span>
                            </label>
                        </fieldset>
                    ))}
                </div>
            </div>
        </div>
    );
}
