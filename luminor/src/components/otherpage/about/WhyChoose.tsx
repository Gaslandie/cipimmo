import React from "react";

const features = [
    {
        icon: "icon-Lifebuoy",
        title: "Un accompagnement à votre écoute",
        description:
            "Parlez-nous de vos dates, de votre budget et du quartier souhaité. Nous vous aidons à trouver un logement qui correspond à votre situation.",
    },
    {
        icon: "icon-ClockCountdown",
        title: "Une recherche plus simple",
        description:
            "Retrouvez les photos, la surface, les chambres et le tarif de chaque logement. Vous disposez des informations utiles pour faire votre choix.",
    },
    {
        icon: "icon-SketchLogo",
        title: "Une équipe de proximité",
        description:
            "Échangez directement avec CIP IMMO par téléphone ou sur WhatsApp pour connaître les disponibilités et préparer votre arrivée.",
    },
];

export default function WhyChoose() {
    return (
        <div className="tf-container">
            <div className="wrap-heading-section d-flex justify-content-between align-items-center mb_48">
                <div className="heading-section">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Pourquoi CIP IMMO ?
                    </span>
                    <h3 className="text_white split-text effect-blur-fade">
                        Votre location, plus simple <br />
                        à chaque étape
                    </h3>
                </div>
                <a href="/contacts" className="tf-btn btn-bg-white btn-px-32">
                    <span>Nous contacter</span>
                    <span className="bg-effect"></span>
                </a>
            </div>
            <div className="tf-grid-layout md-col-3">
                {features.map((item, index) => (
                    <div className="tf-box-icon style-2" key={index}>
                        <div className="icon mb_24">
                            <i className={item.icon}></i>
                        </div>
                        <div className="content">
                            <h5 className="text_white mb_8">{item.title}</h5>
                            <p className="text_secondary-color-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
