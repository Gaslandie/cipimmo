"use client";
import React from "react";
import { handleSubmit } from "@/actions/commentAction";

export default function FormComments() {
    return (
        <div className="leave-comment">
            <div className="heading-title mb_20">
                <h5 className="mb_8">Partager votre avis</h5>
                <p>Votre message sera préparé pour notre équipe sur WhatsApp.</p>
            </div>
            <form
                id="leaveComment"
                className="form-leave-comment"
                action={handleSubmit}
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
                                Adresse e-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Votre adresse e-mail*"
                                name="email" maxLength={254}
                                required
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
                        <input type="checkbox" className="tf-check" id="note" />
                    </fieldset>
                    <p className="text-body-default">
                        Je souhaite être recontacté au sujet de mon message
                    </p>
                </div>
                <button className="tf-btn btn-bg-1 btn-px-28" type="submit">
                    <span>Préparer mon message</span>
                    <span className="bg-effect"></span>
                </button>
            </form>
        </div>
    );
}
