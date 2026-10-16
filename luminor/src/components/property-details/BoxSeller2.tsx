import Image from "next/image";
import React from "react";

export default function BoxSeller2() {
    return (
        <>
            <h5 className="mb_24">Contacter CIP IMMO</h5>
            <div className="author  mb_28">
                <div className="avatar  mb_28">
                    <Image
                        src="/assets/images/section/agent-3.jpg?v=cip-photos-1"
                        width={354}
                        height={354}
                        alt="CIP IMMO"
                    />
                </div>
                <div className="author-info d-flex flex-column">
                    <h6 className="mb_4">Mamadou C.</h6>
                    <p className="mb_8">Votre équipe location</p>
                    <p>
                        Notre équipe vous renseigne sur les logements, les quartiers et les conditions de location pour préparer votre séjour ou votre installation en Guinée.
                    </p>
                </div>
            </div>
            <div className="mb_28">
                <h6 className="mb_16">Informations</h6>
                <ul className="info ">
                    <li className="item d-flex gap_12 mb_20">
                        <i className="icon icon-MapPin"></i>
                        <div>
                            <p className="text_primary-color mb_4">
                                CIP IMMO, <br />
                                Nongo Kiroti, Conakry Guinée
                            </p>
                            <a
                                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/contacts`}
                                className="hover-underline-link text-button fw-7 text_primary-color"
                            >
                                Nous trouver
                            </a>
                        </div>
                    </li>
                    <li className="item d-flex gap_12 align-items-center">
                        <i className="icon icon-PhoneCall"></i>
                        <div>
                            <p className="text_primary-color">+224 613 58 51 98</p>
                            <p className="text_primary-color ">
                                +224 613 58 51 98
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <a href="tel:+224613585198" className="tf-btn btn-bg-1 w-full mb_12">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-PhoneCall"></i>Appeler notre équipe
                </span>
                <span className="bg-effect"></span>
            </a>
            <a href="https://wa.me/224623417510" className="tf-btn w-full">
                <span className="d-flex align-items-center gap_8">
                    <i className="icon-ChatCircleDots"></i>Écrire sur WhatsApp
                </span>
                <span className="bg-effect"></span>
            </a>
        </>
    );
}
