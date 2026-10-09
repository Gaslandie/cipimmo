import React from "react";

export default function Nearby() {
    return (
        <>
            <h5 className="properties-title mb_20">Dans le quartier</h5>
            <p className="text-body-2">
                Pensez aux lieux utiles au quotidien : commerces, transports, établissements scolaires et services de proximité. Notre équipe peut vous renseigner sur les environs du logement.
            </p>
            <div className="wrap ">
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">École :</span>
                        <span className="text-button fw-7 text_primary-color">
                            0,7 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Supermarché :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,3 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Centre de santé :</span>
                        <span className="text-button fw-7 text_primary-color">
                            0,6 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Espace de loisirs :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,1 km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">
                            Terrain de sport :
                        </span>
                        <span className="text-button fw-7 text_primary-color">
                            0,4 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Pharmacie :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,8 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Café :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,3 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Commerces :</span>
                        <span className="text-button fw-7 text_primary-color">
                            2,1 km
                        </span>
                    </li>
                </ul>
                <ul className="col-nearby d-flex flex-column gap_8">
                    <li>
                        <span className="text-body-default">Marché :</span>
                        <span className="text-button fw-7 text_primary-color">
                            0,4 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Centre-ville :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,8 km
                        </span>
                    </li>
                    <li>
                        <span className="text-body-default">Transports :</span>
                        <span className="text-button fw-7 text_primary-color">
                            1,3 km
                        </span>
                    </li>
                </ul>
            </div>
        </>
    );
}
