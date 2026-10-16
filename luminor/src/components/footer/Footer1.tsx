"use client";
import { footerSections } from "@/data/footer";
import BrandLogo from "../common/BrandLogo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OfferRequest from "../common/OfferRequest";

export default function Footer1() {
    const [wide, setWide] = useState(true);
    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const update = () => setWide(media.matches);
        update(); media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return (
        <footer className="footer">
            <div className="tf-container ">
                <div className="footer-body">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-about footer-item">
                                <Link href="/" className="footer-logo mb_17" aria-label="CIP IMMO, accueil">
                                    <BrandLogo variant="light" />
                                </Link>
                                <div className="mb_16">
                                    <p className="mb_4 text_color-1">
                                        Notre adresse :
                                    </p>
                                    <p className="text_white">
                                        Nongo Kiroti, Conakry Guinée
                                    </p>
                                </div>
                                <div className="text-body-default text_secondary-color mb_16">
                                    <span className="text_color-1">E-mail : </span>
                                    <a href="mailto:contact@cipsarlu.com" className="text_white link ms_4">
                                        contact@cipsarlu.com
                                    </a>
                                </div>
                                <div className="text-body-default text_secondary-color mb_16">
                                    <span className="text_color-1">
                                        Téléphone :{" "}
                                    </span>
                                    <a href="tel:+224613585198" className="text_white link ms_4">+224 613 58 51 98</a>
                                </div>
                                <div className="text-body-default text_secondary-color">
                                    <span className="text_color-1">
                                        WhatsApp :{" "}
                                    </span>
                                    <Link
                                        href="https://wa.me/224623417510"
                                        className="text_white link ms_4"
                                    >
                                        +224 623 41 75 10
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-content footer-item d-flex justify-content-between">
                                {footerSections.map((section) => (
                                    <details open={wide}
                                        key={`${section.className}-${wide}`}
                                        className={`footer-col-block ${section.className}`}
                                    >
                                        <summary className="footer-heading footer-heading-mobile text-title fw-6 text_white mb_16">
                                            {section.heading}
                                        </summary>
                                        <div className="footer-links">
                                            <ul className="footer-menu-list d-grid gap_12">
                                                {section.links.map((link) => (
                                                    <li
                                                        key={
                                                            link.href +
                                                            link.label
                                                        }
                                                        className="text-body-default text_color-1"
                                                    >
                                                        {link.href.includes("?") ? (
                                                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${link.href}`} className="link">{link.label}</a>
                                                        ) : (
                                                            <Link href={link.href} className="link">{link.label}</Link>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="footer-newsletter footer-item">
                                <div className="footer-heading text-title fw-6 text_white mb_16">
                                    Recevoir nos offres
                                </div>
                                <p className="text_color-1 mb_20">
                                    Indiquez votre adresse pour demander à notre équipe les offres adaptées à votre recherche.
                                </p>
                                <OfferRequest />
                                <p className="text_color-1">
                                    Votre demande se poursuit sur WhatsApp. Consultez nos
                                    <Link
                                        href="/privacy-policy#terms"
                                        className="hover-underline-link link"
                                    >
                                        conditions d’utilisation
                                    </Link>{" "}
                                    {"  "}
                                    et notre
                                    {"  "}
                                    <Link
                                        href={"/privacy-policy"}
                                        className="hover-underline-link link"
                                    >
                                        politique de confidentialité.
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom d-flex align-items-center justify-content-between">
                    <p className="text_muted-color">
                        ©2026 {"  "}
                        <Link
                            href="/"
                            className="text_white hover-underline-link"
                        >
                            CIP IMMO.
                        </Link>{" "}
                        {"  "}
                        Tous droits réservés.
                    </p>
                    <ul className="social d-flex gap_24">
                        <li>
                            <a href="https://www.facebook.com/profile.php?id=61595249675572" className="icon-FacebookLogo" aria-label="Facebook de CIP IMMO"></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
