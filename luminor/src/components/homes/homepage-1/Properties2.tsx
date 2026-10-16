"use client";
import Image from "next/image";
import Link from "next/link";
import { cipRentals, rentalLocation } from "@/data/cipRentals";
import React, { useState } from "react";

const propertiesData = cipRentals.map((rental, index) => ({ id: `tab${index + 1}`, title: rental.title, address: `${rentalLocation(rental)}, Guinée`, img: rental.imgSrc, slug: rental.slug }));

export default function Properties2() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <div className="section-features-property tf-spacing-1">
            <div className="tf-container">
                <div className="tf-grid-layout lg-col-2 tabs-hover-wrap align-items-center">
                    <div className="box">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                className={`process-item item${
                                    activeTab === property.id ? " active" : ""
                                }`}
                                data-tab={property.id}
                                onMouseEnter={() =>
                                    setActiveTab(property.id)
                                }
                                onFocus={() => setActiveTab(property.id)}
                            >
                                <div className="property-item">
                                    <div className="dots"></div>
                                    <div className="content">
                                        <h4 className="title mb_8">
                                            <Link
                                                href={`/logements/${property.slug}`}
                                                className="link"
                                            >
                                                {property.title}
                                            </Link>
                                        </h4>
                                        <p>{property.address}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="tab-content-wrap">
                        {propertiesData.map((property) => (
                            <div
                                key={property.id}
                                id={property.id}
                                hidden={activeTab !== property.id}
                                className={`tab-content${
                                    activeTab === property.id ? " active" : ""
                                }`}
                            >
                                <Link href={`/logements/${property.slug}`} className="img-style" aria-label={`Voir : ${property.title}`}>
                                    {property.img ? <Image
                                        src={property.img}
                                        width={645}
                                        height={645}
                                        alt={property.title}
                                    /> : <span className="rental-image-placeholder">À venir</span>}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
