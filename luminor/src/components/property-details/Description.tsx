import React from "react";

export default function Description({ property }: { property: { title: string; city: string; beds?: number; sqft?: number } }) {
    return (
        <div>
            <h5 className="properties-title mb_20">Description</h5>
            <p className="mb_8 text-body-2">
                {property.title} : un appartement de {property.sqft} m², avec {property.beds} chambres et un salon. CIP IMMO vous accompagne pour préparer votre location à {property.city}.
            </p>
            <p className="mb_20 text-body-2">
                Consultez les caractéristiques et échangez avec notre équipe pour connaître les disponibilités, les conditions et les services du quartier.
            </p>
            <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/contacts`}
                className="hover-underline-link text_primary-color text-button"
            >
                En savoir plus
            </a>
        </div>
    );
}
