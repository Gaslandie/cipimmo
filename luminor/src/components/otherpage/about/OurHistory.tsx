import React from "react";

type TimeLine = {
    year: string;
    title: string;
    text: string;
};

// Repères éditoriaux conservés pour la maquette CIP IMMO.
const history: TimeLine[] = [
    {
        year: "2020",
        title: "Nos débuts à Coyah",
        text: "CIP IMMO prend forme autour d’une idée simple : aider chacun à trouver un logement en Guinée avec une équipe proche et à l’écoute.",
    },
    {
        year: "2022",
        title: "Les courts séjours",
        text: "Notre offre de courts séjours se développe pour accueillir les voyageurs, les familles et les personnes en déplacement professionnel.",
    },
    {
        year: "2023",
        title: "La longue durée",
        text: "Les locations longue durée prennent leur place dans notre offre, avec des appartements pour s’installer seul, en couple ou en famille.",
    },
    {
        year: "2025",
        title: "La proximité",
        text: "Notre présence à Coléah, Coyah Km54 et Ansoumaniah nous permet de vous proposer différents quartiers et de mieux répondre à vos besoins.",
    },
    {
        year: "2026",
        title: "CIP IMMO en ligne",
        text: "Notre site vous permet de découvrir les photos, les caractéristiques et les tarifs des logements, puis de contacter directement CIP IMMO.",
    },
];

export default function OurHistory() {
    return (
        <>
            <div className=" t-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Notre histoire
                    </span>
                    <h3 className="split-text effect-blur-fade">CIP IMMO, une histoire de proximité</h3>
                </div>
            </div>
            <div className="content">
                <div className="tf-container w-xl">
                    <div className="wrap-time-line">
                        {history.map((item, index) => (
                            <div className="time-item" key={index}>
                                <div className="heading">
                                    <h3 className="mb_8">{item.year}</h3>
                                    <span className="sub text-label text-uppercase fw-6 ">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="dot"></div>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
