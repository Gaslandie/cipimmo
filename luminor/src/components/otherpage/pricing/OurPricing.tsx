import React from "react";

const pricingData = [
    {
        name: "Court séjour",
        subtitle: "Pour un passage de quelques jours.",
        price: "1 000 000 GNF / jour",
        buttonClass: "tf-btn btn-border w-full",
        description: "Découvrez notre appartement à Coléah, Conakry.",
        features: [
            "Un tarif par jour",
            "Contact direct avec CIP IMMO",
            "Photos et détails du logement",
            "Dates à convenir avec notre équipe",
        ],
        featureGap: "gap_6",
        center: false,
        tag: null,
    },
    {
        name: "Longue durée",
        subtitle: "Pour vous installer en Guinée.",
        price: "1 500 000 GNF / mois",
        buttonClass: "tf-btn btn-bg-1 w-full",
        description: "Découvrez notre appartement à Coyah Km54.",
        features: [
            "Un loyer mensuel",
            "Accompagnement de proximité",
            "Quartier selon vos besoins",
            "Surface et chambres à comparer",
        ],
        featureGap: "gap_8",
        center: true,
        tag: {
            icon: "icon-FacebookLogo",
            text: "Pour votre installation",
            className:
                "tag d-flex gap_4 text_primary-color text-button-small align-items-center",
        },
    },
    {
        name: "Installation en famille",
        subtitle: "De la place pour toute la famille.",
        price: "3 000 000 GNF / mois",
        buttonClass: "tf-btn btn-border w-full",
        description: "Découvrez nos appartements de trois chambres à Ansoumaniah.",
        features: [
            "3 chambres, salon et cuisine",
            "Une équipe à votre écoute",
            "Appartements de 92 m²",
            "Logements non meublés",
        ],
        featureGap: "gap_6",
        center: false,
        tag: null,
    },
];

export default function OurPricing() {
    return (
        <div className="tf-container tf-spacing-1">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-label text-uppercase fw-6 text_secondary-color-2">
                    Nos formules
                </span>
                <h3>
                    Une location adaptée <br />
                    à votre rythme
                </h3>
            </div>
            <div className="tf-grid-layout lg-col-3">
                {pricingData.map((plan, idx) => (
                    <div
                        className={`pricing-item${
                            plan.center ? " center" : ""
                        }`}
                        key={idx}
                    >
                        {plan.tag && (
                            <div className={plan.tag.className}>
                                <i className={plan.tag.icon}></i>
                                {plan.tag.text}
                            </div>
                        )}
                        <div className="heading d-grid gap_8 mb_24">
                            <h5>{plan.name}</h5>
                            <p>{plan.subtitle}</p>
                            <h3>{plan.price}</h3>
                        </div>
                        <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/listing-left-sidebar`} className={plan.buttonClass}>
                            <span>Découvrir cette formule</span>
                            <span className="bg-effect"></span>
                        </a>
                        <div className="content">
                            <div className="text-title fw-6 text_primary-color text-capitalize mb_19">
                                {plan.description}
                            </div>
                            <ul className="list">
                                {plan.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className={`d-flex align-items-center ${plan.featureGap} text_primary-color text-body-default`}
                                    >
                                        <i className="icon-CheckCircle"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
