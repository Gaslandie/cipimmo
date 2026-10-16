"use client";
import React from "react";
import WhatsAppForm from "./WhatsAppForm";
import { handleSubmit } from "@/actions/commentAction";

export default function FormComments() {
    return (
        <div className="leave-comment">
            <div className="heading-title mb_20">
                <h5 className="mb_8">Partager votre avis</h5>
                <p>Votre message sera préparé pour notre équipe sur WhatsApp.</p>
            </div>
            <WhatsAppForm
                className="form-leave-comment"
                prepare={handleSubmit} label="Partager un avis avec CIP IMMO"
            >
                <div className="wrap mb_20">
                    <div className="tf-grid-layout md-col-2 mb_20">
                        <fieldset>
                            <label
                                htmlFor="name"
                                className="text-button text_primary-color fw-7 mb_8"
                            >
                                Nom
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Votre nom*"
                                name="name" maxLength={100}
                                required
                            />
                        </fieldset>
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
                                placeholder="Votre adresse e-mail*"
                                name="email" maxLength={254}
                            />
                        </fieldset>
                    </div>
                    <fieldset>
                        <label
                            htmlFor="comment"
                            className="text-button text_primary-color fw-7 mb_8"
                        >
                            Votre avis
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            placeholder="Votre message"
                            name="comment" maxLength={2000} minLength={10}
                            required
                        ></textarea>
                    </fieldset>
                </div>
                <div className="box-fieldset-item d-flex mb_20">
                    <fieldset>
                        <input type="checkbox" className="tf-check" id="note" name="reply" value="yes" />
                    </fieldset>
                    <label htmlFor="note" className="text-body-default">
                        Je souhaite être recontacté au sujet de mon message
                    </label>
                </div>
                <button className="tf-btn btn-bg-1 btn-px-28" type="submit">
                    <span>Préparer mon message</span>
                    <span className="bg-effect"></span>
                </button>
            </WhatsAppForm>
        </div>
    );
}
