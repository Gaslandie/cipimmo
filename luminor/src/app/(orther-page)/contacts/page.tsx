"use client";

import Layout from "@/components/layouts/Layout-defaul";
import FormContact from "@/components/otherpage/contacts/FormContact";
import PageTitle from "@/components/otherpage/contacts/PageTitle";
import React, { useState } from "react";

export default function ContactPage() {
    const [showMap, setShowMap] = useState(false);
    return (
        <Layout>
            <PageTitle />
            <div className="tf-container section-contact tf-spacing-1">
                <section className="contact-location-card" aria-labelledby="contact-locations-title">
                    <h2 className="h4" id="contact-locations-title">Localisation de CIP IMMO</h2>
                    <p>Adresse de notre entreprise : Nongo Kiroti, Conakry, Guinée.</p>
                    <button
                        type="button"
                        className="tf-btn btn-bg-1"
                        aria-expanded={showMap}
                        aria-controls="contact-location-map"
                        onClick={() => setShowMap((visible) => !visible)}
                    >
                        <span>{showMap ? "Fermer la carte" : "Voir la localisation de l’entreprise"}</span>
                    </button>
                    <div id="contact-location-map" className="contact-location-map" hidden={!showMap}>
                        {showMap && <>
                            <p className="mb_16">Carte du secteur de Nongo Kiroti, Conakry, Guinée. Contactez-nous pour le repère exact du bureau.</p>
                            <iframe
                                src="https://www.google.com/maps?q=Nongo%20Kiroti%2C%20Conakry%2C%20Guin%C3%A9e&output=embed"
                                title="Carte de Nongo Kiroti, Conakry, Guinée — secteur de CIP IMMO"
                                width="100%"
                                height="400"
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </>}
                    </div>
                </section>
                <FormContact />
            </div>
        </Layout>
    );
}
