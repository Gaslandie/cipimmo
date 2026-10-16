"use client";
import { footerSections } from "@/data/footer";
import BrandLogo from "../common/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { subscribeNewsletter } from "@/actions/newsletterAction";

// Accordion logic unchanged
const handleFooter = (): void => {
    const DURATION = 250;
    let isMobile = window.matchMedia(
        "only screen and (max-width: 767px)"
    ).matches;

    const footerHeadings = document.querySelectorAll<HTMLElement>(
        ".footer-heading-mobile"
    );

    const slideUp = (element: HTMLElement, duration: number): void => {
        element.style.transition = `height ${duration}ms ease`;
        element.style.overflow = "hidden";
        element.style.height = element.scrollHeight + "px";

        requestAnimationFrame(() => {
            element.style.height = "0";
        });

        setTimeout(() => {
            element.style.display = "none";
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const slideDown = (element: HTMLElement, duration: number): void => {
        element.style.removeProperty("display");
        const display = getComputedStyle(element).display;
        if (display === "none") element.style.display = "block";

        const height = element.scrollHeight;
        element.style.height = "0";
        element.style.overflow = "hidden";
        element.style.transition = `height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.height = height + "px";
        });

        setTimeout(() => {
            element.style.removeProperty("height");
            element.style.removeProperty("transition");
            element.style.removeProperty("overflow");
        }, duration);
    };

    const toggleHandler = (heading: HTMLElement): void => {
        const parent = heading.closest(".footer-col-block");
        const content = heading.nextElementSibling as HTMLElement | null;

        if (!parent || !content) return;

        const isOpen = parent.classList.toggle("open");
        if (isOpen) {
            slideDown(content, DURATION);
        } else {
            slideUp(content, DURATION);
        }
    };

    const initAccordion = () => {
        footerHeadings.forEach((heading) => {
            if (!heading.dataset.listenerAttached) {
                heading.addEventListener("click", () => toggleHandler(heading));
                heading.dataset.listenerAttached = "true";
            }
        });
    };

    const updateAccordion = () => {
        const currentlyMobile = window.matchMedia(
            "only screen and (max-width: 767px)"
        ).matches;

        if (currentlyMobile !== isMobile) {
            isMobile = currentlyMobile;

            footerHeadings.forEach((heading) => {
                const parent = heading.closest(".footer-col-block");
                const content =
                    heading.nextElementSibling as HTMLElement | null;

                if (!parent || !content) return;

                if (isMobile) {
                    content.style.display = parent?.classList.contains("open")
                        ? "block"
                        : "none";
                } else {
                    parent.classList.remove("open");
                    content.style.display = "block";
                    content.removeAttribute("style");
                }
            });
        }
    };

    initAccordion();
    updateAccordion();

    window.addEventListener("resize", updateAccordion);
};

export default function Footer1() {
    const pathname = usePathname();
    useEffect(() => {
        handleFooter();
        return () => {
            window.removeEventListener("resize", handleFooter);
        };
    }, [pathname]);

    const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        // Prepare the WhatsApp message locally; no server submission.
        await subscribeNewsletter(formData);
    };

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
                                    <span className="text_white ms_4">
                                        +224 613 58 51 98
                                    </span>
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
                                    <div
                                        key={section.className}
                                        className={`footer-col-block ${section.className}`}
                                    >
                                        <div className="footer-heading  footer-heading-mobile text-title fw-6 text_white mb_16">
                                            {section.heading}
                                        </div>
                                        <div className="tf-collapse-content">
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
                                    </div>
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
                                <form
                                    id="subscribe-form"
                                    acceptCharset="utf-8"

                                    className="form-newsletter style-1 mb_20"
                                    onSubmit={handleNewsletterSubmit}
                                >
                                    <div
                                        id="subscribe-content"
                                        className="position-relative"
                                    >
                                        <fieldset className="fieldset-item">
                                            <input
                                                type="email"
                                                placeholder="E-mail"
                                                id="subscribe-email"
                                                name="email" maxLength={254}
                                                aria-required="true"
                                                required
                                            />
                                        </fieldset>
                                        <button
                                            id="subscribe-button"
                                            aria-label="Préparer ma demande d’offres"
                                            type="submit"
                                            className="button-submit animate-hover-btn "
                                        >
                                            <span className="icon-ArrowUpRight"></span>
                                        </button>
                                    </div>
                                    <div id="subscribe-msg"></div>
                                </form>
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
                        <li>
                            <Link href="#" className="icon-XLogo"></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-TiktokLogo"></Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="icon-InstagramLogo"
                            ></Link>
                        </li>
                        <li>
                            <Link href="#" className="icon-YoutubeLogo"></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
