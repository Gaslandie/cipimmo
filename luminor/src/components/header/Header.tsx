"use client";
import Nav from "./Nav";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import Offcanvas from "../common/Offcanvas";
import BrandLogo from "../common/BrandLogo";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <header className="header style-default header-fixed">
                <div className="tf-container w-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="header-inner">
                                <Link href="/" className="site-logo" aria-label="CIP IMMO, accueil">
                                    <BrandLogo priority />
                                </Link>
                                <Nav />
                                <button
                                    type="button"
                                    className="mobile-button d-xl-none"
                                    onClick={() => setIsMenuOpen(true)}
                                    aria-label="Ouvrir le menu"
                                    aria-expanded={isMenuOpen}
                                    aria-controls="cip-immo-mobile-menu"
                                >
                                    <span className="burger" aria-hidden="true">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="mobile-nav-wrap" id="cip-immo-mobile-menu">
                <Offcanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <div className="offcanvas-header top-nav-mobile">
                        <div className="offcanvas-title">
                            <Link
                                href="/"
                                className="site-logo"
                                aria-label="CIP IMMO, accueil"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <BrandLogo />
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="btn-close-menu border-0 bg-transparent p-0"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Fermer le menu"
                        >
                            <i className="icon-times-solid" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="offcanvas-body inner-mobile-nav">
                        <div className="mb-body">
                            <MobileMenu onNavigate={() => setIsMenuOpen(false)} />
                            <div className="support">
                                <Link href="/listing-left-sidebar" className="tf-btn" onClick={() => setIsMenuOpen(false)}>
                                    <span>Trouver un logement</span>
                                    <span className="bg-effect"></span>
                                </Link>
                                <Link href="/contacts" className="text-need" onClick={() => setIsMenuOpen(false)}>
                                    Besoin d’aide ?
                                </Link>
                                <ul className="mb-info">
                                    <li>
                                        Téléphone : <a href="tel:+224613585198" className="number">+224 613 58 51 98</a>
                                    </li>
                                    <li>
                                        WhatsApp : <a href="https://wa.me/224623417510" className="link">+224 623 41 75 10</a>
                                    </li>
                                    <li>CIP IMMO · Nongo Kiroti, Conakry Guinée</li>
                                    <li>
                                        <div className="wrap-social">
                                            <p>Suivez-nous :</p>
                                            <ul className="social align-items-center d-flex gap_24">
                                                <li><a href="https://www.facebook.com/profile.php?id=61595249675572" className="icon-FacebookLogo" aria-label="Facebook de CIP IMMO" /></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Offcanvas>
            </div>
        </>
    );
}
