import React from "react";
import OdometerCounter from "@/components/common/Odometer";
import { cipStatistics } from "@/data/cipRentals";
export default function AboutUs() {
    return (
        <div className="tf-container section-about">
            <div className="heading-section justify-content-center text-center mb_48">
                <span className="sub text-uppercase fw-6">À propos</span>
                <h3 className="split-text split-lines-rotation-x">
                    Votre partenaire pour louer <br /> en toute simplicité
                </h3>
            </div>
            <div
                className="parallaxie"
                style={{
                    background:
                        'url("/assets/images/section/section-about.jpg?v=cip-photos-1") center / cover no-repeat',
                }}
            >
                <div className="content">
                    <div className="wrap d-flex flex-column">
                        <div className="tf-box-icon style-1">
                            <div className="heading d-flex justify-content-between mb_19">
                                <div className="counter-item style-default h2">
                                    <OdometerCounter value={cipStatistics.rentals} />
                                </div>
                                <div className="icon">
                                    <i className="icon-Certificate"></i>
                                </div>
                            </div>
                            <h6 className="text_secondary-color sub">
                                Logements proposés
                            </h6>
                        </div>
                        <div className="d-flex gap_12 bot">
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={cipStatistics.accompaniedClients} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-BuildingOffice"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Clients accompagnés
                                </h6>
                            </div>
                            <div className="tf-box-icon style-1">
                                <div className="heading d-flex justify-content-between mb_19">
                                    <div className="counter-item style-default h2">
                                        <OdometerCounter value={cipStatistics.cities} />
                                    </div>
                                    <div className="icon">
                                        <i className="icon-ChartDonut"></i>
                                    </div>
                                </div>
                                <h6 className="text_secondary-color sub">
                                    Villes couvertes
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tf-grid-layout md-col-2">
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Crown"></i>
                        Notre mission
                    </h4>
                    <p className="mb_8">
                        Vous aider à trouver un logement adapté à votre budget,
                        à votre rythme et à vos envies, pour quelques jours
                        ou pour vous installer en Guinée.
                    </p>
                    <p>
                        Basée à Nongo Kiroti, à Conakry, CIP IMMO vous accompagne dans la recherche
                        de logements meublés et non meublés. Nous prenons le temps
                        de comprendre vos besoins et de vous expliquer les
                        disponibilités, les tarifs et les conditions de location.
                    </p>
                </div>
                <div className="box">
                    <h4 className="title d-flex gap_12 align-items-center mb_20">
                        <i className="icon-Target"></i>
                        Notre vision
                    </h4>
                    <p className="mb_8">
                        Faire de la recherche de logement en Guinée une démarche
                        plus simple, avec des informations claires et une équipe
                        disponible pour vous orienter.
                    </p>
                    <p>
                        Nous souhaitons que chacun puisse préparer son séjour
                        ou son installation avec confiance. Notre approche repose
                        sur la proximité, l’écoute et un échange direct avec vous,
                        du premier contact jusqu’à votre arrivée.
                    </p>
                </div>
            </div>
        </div>
    );
}
