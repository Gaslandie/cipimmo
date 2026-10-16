"use client";
import DropdownSelect2 from "@/components/common/DropdownSelect2";
import React from "react";
import { submitFAQQuestion } from "@/actions/faqAction";

export default function Faqs() {
    return (
        <>
            <div className="section-faqs tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="faq-item">
                                <h4 className="mb_18">Trouver son logement</h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1"
                                            className="accordion-title "
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Comment trouver un logement avec CIP IMMO ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1"
                                            className="collapse show"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Consultez nos appartements et utilisez les filtres pour préciser votre recherche. Vous pouvez choisir la durée, le quartier, le budget et le nombre de chambres.
                                                </p>
                                                <p>
                                                    Quand un logement vous plaît, contactez CIP IMMO par téléphone ou sur WhatsApp. Notre équipe vous renseigne sur la disponibilité et vous explique les étapes suivantes.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Quel budget prévoir pour ma location ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Le tarif dépend du logement et de la durée. Les prix sont indiqués en francs guinéens, à la nuit pour un court séjour ou au mois pour une longue durée.
                                                </p>
                                                <p>
                                                    Précisez vos dates et demandez à notre équipe les charges éventuelles, la caution et les autres conditions avant de confirmer votre location.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Faut-il créer un compte pour consulter les logements ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Vous pouvez parcourir les annonces, les photos et les caractéristiques librement, sans créer de compte.
                                                </p>
                                                <p>
                                                    Pour avancer sur votre recherche, échangez directement avec notre équipe en indiquant le logement et les dates souhaités.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Quelle différence entre court séjour et longue durée ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Le court séjour convient à un passage de quelques jours ou à un déplacement. La longue durée permet de préparer une installation et se présente avec un loyer mensuel.
                                                </p>
                                                <p>
                                                    Les possibilités varient selon le logement. CIP IMMO vous aide à choisir la formule adaptée à votre situation.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Comment vérifier la disponibilité d’un appartement ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Contactez notre équipe avec le nom du logement, vos dates et le nombre de personnes. Nous vous répondrons sur les possibilités pour cette période.
                                                </p>
                                                <p>
                                                    La consultation d’une annonce ne confirme pas une location. Les modalités se précisent directement avec CIP IMMO.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="faq-item">
                                <h4 className="mb_18">
                                    Préparer son séjour
                                </h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq1"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-1"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Quels logements conviennent à une famille ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-1"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Comparez le nombre de chambres, la surface et les pièces de vie. À Ansoumaniah, nos appartements de trois chambres disposent d’un salon et d’une cuisine.
                                                </p>
                                                <p>
                                                    Indiquez le nombre de personnes et vos besoins à notre équipe pour être orienté vers un logement adapté.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Comment comparer les prix des appartements ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Vérifiez que vous comparez la même durée : un prix à la nuit et un prix au mois correspondent à deux formules différentes.
                                                </p>
                                                <p>
                                                    Tenez aussi compte de la surface, du quartier, du mobilier et de ce qui est compris dans la location.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Proposez-vous des logements meublés et non meublés ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    CIP IMMO propose des solutions pour différents besoins. Les caractéristiques disponibles figurent sur les fiches des logements.
                                                </p>
                                                <p>
                                                    Les appartements d’Ansoumaniah sont non meublés. Pour les autres logements, notre équipe vous renseigne sur le mobilier disponible.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Que demander avant de confirmer une location ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Demandez le tarif pour vos dates, les charges éventuelles, la caution et les modalités d’arrivée et de départ.
                                                </p>
                                                <p>
                                                    Vous pouvez aussi préciser vos besoins concernant l’équipement, l’accès au logement et les services du quartier.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-1-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-1-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Puis-je organiser un séjour professionnel ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-1-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq1"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Oui, vous pouvez nous présenter vos dates, votre budget et le secteur souhaité pour votre déplacement.
                                                </p>
                                                <p>
                                                    Notre équipe vous orientera selon les logements et les disponibilités de la période.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="faq-item">
                                <h4 className="mb_15">
                                    Pendant votre location
                                </h4>
                                <ul
                                    className="accordion-wrap"
                                    id="accordion-faq2"
                                >
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-1"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-1"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Comment se passe l’arrivée dans le logement ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-1"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Avant votre arrivée, convenez avec CIP IMMO de l’horaire, du lieu de rendez-vous et des modalités de remise des clés.
                                                </p>
                                                <p>
                                                    Gardez les coordonnées de notre équipe pour pouvoir la joindre en cas de besoin.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-2"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-2"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Quelles informations transmettre pour ma recherche ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-2"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Indiquez vos dates ou votre durée de location, le nombre de personnes, le quartier souhaité et votre budget.
                                                </p>
                                                <p>
                                                    Évitez d’envoyer des documents personnels dans un premier message. Notre équipe vous précisera les éléments utiles à la suite de votre démarche.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-3"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-3"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Qui contacter si j’ai une question pendant mon séjour ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-3"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Vous pouvez joindre CIP IMMO par téléphone ou sur WhatsApp. Décrivez votre demande et précisez le logement concerné.
                                                </p>
                                                <p>
                                                    Notre équipe vous orientera vers la suite adaptée à votre situation.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-4"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-4"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Puis-je prolonger ma location ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-4"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Contactez-nous avant la fin de la période prévue. Une prolongation dépend des disponibilités du logement et des conditions convenues.
                                                </p>
                                                <p>
                                                    Notre équipe vérifiera les possibilités avec vous avant toute confirmation.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <a
                                            href="#accordion-faq-2-5"
                                            className="accordion-title collapsed"
                                            data-bs-toggle="collapse"
                                            aria-expanded="true"
                                            aria-controls="accordion-faq-2-5"
                                        >
                                            <div className="heading">
                                                <div className="title text-capitalize text-title text_primary-color fw-6">
                                                    Comment préparer mon départ ?
                                                </div>
                                                <span className="icon icon-CaretDown"></span>
                                            </div>
                                        </a>
                                        <div
                                            id="accordion-faq-2-5"
                                            className="collapse"
                                            data-bs-parent="#accordion-faq2"
                                        >
                                            <div className="accordion-faqs-content">
                                                <p className="mb_12">
                                                    Échangez avec CIP IMMO pour convenir de l’horaire, de la remise des clés et des démarches prévues dans vos conditions de location.
                                                </p>
                                                <p>
                                                    Signalez à notre équipe les questions ou difficultés rencontrées pour organiser votre départ dans de bonnes conditions.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-faq sticky-top">
                                <form
                                    className="form-faq"
                                    action={submitFAQQuestion}
                                >
                                    <div className="heading">
                                        <h5 className="mb_8">
                                            Posez votre question
                                        </h5>
                                        <p>
                                            Notre équipe est à votre écoute
                                        </p>
                                    </div>
                                    <fieldset>
                                        <label
                                            htmlFor="name"
                                            className="text-button text_primary-color fw-7 mb_8"
                                        >
                                            Prénom
                                        </label>
                                        <input
                                            className=""
                                            id="name"
                                            type="text"
                                            placeholder="Prénom"
                                            name="name"
                                            tabIndex={2}
                                            aria-required="true"
                                            required
                                        />
                                    </fieldset>
                                    <div>
                                        <div className="text-button text_primary-color mb_8">
                                            Votre demande concerne
                                        </div>
                                        {/* Removed the static nice-select dropdown, only use DropdownSelect2 */}
                                        <DropdownSelect2
                                            defaultOption="Préparer son séjour"
                                            options={[
                                                "Préparer son séjour",
                                                "Choisir un logement",
                                                "Location longue durée",
                                                "Budget et conditions",
                                                "Autre demande",
                                            ]}
                                        />
                                    </div>
                                    <fieldset>
                                        <label
                                            htmlFor="comment"
                                            className="text-button text_primary-color fw-7 mb_8"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="comment"
                                            name="message" minLength={10} maxLength={2000}
                                            className=""
                                            rows={4}
                                            placeholder="Votre message"
                                            tabIndex={2}
                                            aria-required="true"
                                            required
                                        ></textarea>
                                    </fieldset>
                                    <button
                                        className="tf-btn btn-bg-1 btn-px-28 w-full"
                                        type="submit"
                                    >
                                        <span>Préparer ma demande</span>
                                        <span className="bg-effect"></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
