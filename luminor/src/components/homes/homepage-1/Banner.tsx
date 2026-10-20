import React from "react";
import OdometerCounter from "@/components/common/Odometer";
import { cipStatistics } from "@/data/cipRentals";
export default function Banner() {
    return (
        <div className="banner-2">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner-2.jpg?v=cip-photos-1") center / cover no-repeat',
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
                            <p className="h6 text_secondary-color sub">
                                Logements proposés
                            </p>
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
                                <p className="h6 text_secondary-color sub">
                                    Clients accompagnés
                                </p>
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
                                <p className="h6 text_secondary-color sub">
                                    Villes couvertes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
