"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import OdometerCounter from "@/components/common/Odometer";

type Tab = {
    id: string;
    title: string;
    content: string;
    image: string;
};

const tabs: Tab[] = [
    {
        id: "tab1",
        title: "1. Trouvez votre logement",
        content:
            "Explorez nos appartements à Coléah, Coyah Km54 et Ansoumaniah. Comparez les surfaces, les chambres et les tarifs selon votre durée de location.",
        image: "/assets/images/section/process-1.jpg?v=cip-photos-1",
    },
    {
        id: "tab2",
        title: "2. Échangeons sur votre projet",
        content:
            "Appelez-nous ou écrivez-nous sur WhatsApp avec le logement choisi, vos dates et votre budget. Notre équipe vous renseigne sur les possibilités.",
        image: "/assets/images/section/process-2.jpg?v=cip-photos-1",
    },
    {
        id: "tab3",
        title: "3. Préparez votre arrivée",
        content:
            "Confirmez avec CIP IMMO la disponibilité et les conditions de location. Nous vous expliquons les démarches et organisons la suite avec vous.",
        image: "/assets/images/section/process-3.jpg?v=cip-photos-1",
    },
];

export default function Process1() {
    const [activeTab, setActiveTab] = useState("tab1");
    let hoverTimer: ReturnType<typeof setTimeout>;

    const handleMouseEnter = useCallback((tabId: string) => {
        hoverTimer = setTimeout(() => {
            setActiveTab(tabId);
        }, 100);
    }, []);

    const handleMouseLeave = useCallback(() => {
        clearTimeout(hoverTimer);
    }, []);

    return (
        <div className="section-process tf-spacing-1">
            <div className="tf-container">
                <div className="row tabs-hover-wrap align-items-center">
                    <div className="col-lg-5">
                        <div className="heading-section mb_48">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Comment louer
                            </span>
                            <h3 className="split-text effect-blur-fade">
                                Votre location en trois étapes
                            </h3>
                        </div>
                        {tabs.map((tab) => (
                            <div
                                key={tab.id}
                                className={`process-item item scrolling-effect effectLeft ${
                                    activeTab === tab.id ? "active" : ""
                                }`}
                                onMouseEnter={() => handleMouseEnter(tab.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <span className="line"></span>
                                <div className="content">
                                    <h5 className="title mb_8">{tab.title}</h5>
                                    <p>{tab.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-lg-7">
                        <div className="tab-content-wrap">
                            {tabs.map((tab) => (
                                <div
                                    key={tab.id}
                                    id={tab.id}
                                    className={`tab-content ${
                                        activeTab === tab.id ? "active" : ""
                                    }`}
                                >
                                    <div className="img-style">
                                        <Image
                                            loading="lazy"
                                            src={tab.image}
                                            width={690}
                                            height={518}
                                            alt="Intérieur d’un appartement proposé par CIP IMMO"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="split-text effect-blur-fade">
                        CIP IMMO en quelques chiffres
                    </h3>
                    <div className="wrap-counter">
                        {[
                            { number: 40, label: "Logements proposés" },
                            { number: 150, label: "Clients accompagnés" },
                            { number: 7, label: "Villes couvertes" },
                            { number: 2, label: "Formules de location" },
                        ].map((item, idx) => (
                            <div
                                className="counter-item style-default"
                                key={idx}
                            >
                                <div className="counter-number h1">
                                    <OdometerCounter value={item.number} />
                                </div>
                                <h6 className="text_secondary-color">
                                    {item.label}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
