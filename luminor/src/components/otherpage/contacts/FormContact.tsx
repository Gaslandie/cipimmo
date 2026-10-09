"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { sendContact } from "@/actions/contactAction";

export default function FormContact() {
    const { pending } = useFormStatus();

    return (
        <div className="row tf-spacing-1 pb-0">
            <div className="col-md-6">
                <div className="box-contact">
                    <div className="heading mb_23">
                        <h4 className="mb_8">Parlons de votre recherche</h4>
                        <p>
                            Une question sur un logement, un quartier ou votre arrivée ? Contactez notre équipe pour préparer votre location en Guinée.
                        </p>
                    </div>
                    <ul className="info d-grid gap_20 mb_36">
                        <li>
                            <i className="icon icon-MapPin"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Notre adresse :
                                </div>
                                <p>
                                    Coyah, Guinée
                                </p>
                            </div>
                        </li>
                        <li>
                            <i className="icon icon-PhoneCall"></i>
                            <div className="content">
                                <div className="text-title fw-6 text_primary-color mb_4">
                                    Nous contacter
                                </div>
                                <p>+224 613 58 51 98</p>
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
                        <h5 className="mb_12">Suivez-nous :</h5>
                        <ul className="tf-social d-flex gap_24">
                            <li>
                                <a href="#" className="icon-FacebookLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-XLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-TiktokLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-InstagramLogo"></a>
                            </li>
                            <li>
                                <a href="#" className="icon-YoutubeLogo"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <form className="form-contact" action={sendContact}>
                    <div className="heading mb_24">
                        <h4 className="mb_8">Préparez votre message</h4>
                        <p>
                            Indiquez vos dates, votre budget et le logement qui vous intéresse.
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
                                    name="firstName" maxLength={80}
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
                                    name="lastName" maxLength={80}
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
                                    Adresse e-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Votre adresse e-mail"
                                    name="email" maxLength={254}
                                    required
                                />
                            </fieldset>
                            <fieldset>
                                <label
                                    htmlFor="phone"
                                    className="text-button text_primary-color fw-7 mb_8"
                                >
                                    Téléphone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="Votre numéro de téléphone"
                                    name="phone" maxLength={30}
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
                        disabled={pending}
                    >
                        <span>{pending ? "Préparation…" : "Continuer sur WhatsApp"}</span>
                        <span className="bg-effect"></span>
                    </button>
                </form>
            </div>
        </div>
    );
}
