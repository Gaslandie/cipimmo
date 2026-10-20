"use client";

import React from "react";
import Link from "next/link";
import WhatsAppForm from "@/components/common/WhatsAppForm";
import { sendContact } from "@/actions/contactAction";

export default function FormContact() {

    return (
        <div className="row tf-spacing-1 pb-0">
            <div className="col-md-6">
                <div className="box-contact">
                    <div className="heading mb_23">
                        <h2 className="h4 mb_8">Échangeons avec vous</h2>
                        <p>
                            Une question sur nos services ou un projet immobilier en Guinée ? Notre équipe est à votre écoute.
                        </p>
                    </div>
                    <ul className="info d-grid gap_20 mb_36">
                        <li>
                            <i className="icon icon-EnvelopeSimple" aria-hidden="true"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    E-mail :
                                </div>
                                <a href="mailto:contact@cipsarlu.com" className="link text_secondary-color text-body-default">
                                    contact@cipsarlu.com
                                </a>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-MapPin"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Localisation de l’entreprise :
                                </div>
                                <p>
                                    Nongo Kiroti, Conakry, Guinée
                                </p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-PhoneCall"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Téléphone :
                                </div>
                                <a href="tel:+224613585198">+224 613 58 51 98</a>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-Alarm"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    WhatsApp :
                                </div>
                                <a
                                    href="https://wa.me/224623417510"
                                    className="link text_secondary-color text-body-default"
                                >
                                    +224 623 41 75 10
                                </a>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <h3 className="h5 mb_12">Suivez-nous :</h3>
                        <ul className="tf-social d-flex gap_24">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=61595249675572" className="icon-FacebookLogo" aria-label="Facebook de CIP IMMO"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <WhatsAppForm className="form-contact" prepare={sendContact} label="Contacter CIP IMMO">
                    <div className="heading mb_24">
                        <h2 className="h4 mb_8">Préparez votre message</h2>
                        <p>
                            Présentez votre demande. Nous préparerons votre message pour l’envoyer sur WhatsApp.
                        </p>
                    </div>

                    <div className="wrap mb_24">
                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="firstName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Prénom
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Prénom"
                                    name="firstName" maxLength={80} autoComplete="given-name"
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="lastName"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Nom
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Nom"
                                    name="lastName" maxLength={80} autoComplete="family-name"
                                    required
                                />
                            </fieldset>
                        </div>

                        <div className="tf-grid-layout md-col-2 mb_20">
                            <fieldset>
                                <label
                                    htmlFor="email"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Adresse e-mail (facultatif)
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Votre adresse e-mail"
                                    name="email" maxLength={254} autoComplete="email"
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="phone"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Téléphone (facultatif)
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="Votre numéro de téléphone"
                                    name="phone" maxLength={30} autoComplete="tel"
                                />
                            </fieldset>
                        </div>

                        <fieldset>
                            <label
                                htmlFor="message"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                placeholder="Votre message"
                                name="message" maxLength={2000} minLength={10}
                                required
                            ></textarea>
                        </fieldset>
                    </div>

                    <button
                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                        type="submit"

                    >
                        <span>Continuer sur WhatsApp</span>
                        <span className="bg-effect"></span>
                    </button>
                    <p className="mt_16">Le texte saisi est transmis à WhatsApp pour préparer votre message. Vous choisissez ensuite de l’envoyer. <Link href="/privacy-policy#rights">Confidentialité et droits sur vos données</Link>.</p>
                </WhatsAppForm>
            </div>
        </div>
    );
}
