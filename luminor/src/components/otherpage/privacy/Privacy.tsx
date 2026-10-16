"use client";

import React, { useEffect } from "react";

function slideBarPrivacy() {
    const tocItems = document.querySelectorAll<HTMLElement>(".nav_link");
    const highlightBar = document.querySelector<HTMLElement>(".highlight-bar");
    const privacyTable = document.querySelector<HTMLElement>(".privacy-table");

    if (!highlightBar || tocItems.length === 0) return;

    let activeIndex = 0;

    const updateHighlightBar = (index: number) => {
        const activeItem = tocItems[index];
        if (!activeItem) return;

        const top = activeItem.offsetTop;
        const height = activeItem.offsetHeight;

        highlightBar.style.top = `${top}px`;
        highlightBar.style.height = `${height}px`;
    };

    updateHighlightBar(activeIndex);

    tocItems.forEach((item, index) => {
        item.addEventListener("click", (e: Event) => {
            e.preventDefault();

            tocItems[activeIndex].classList.remove("active");
            item.classList.add("active");
            activeIndex = index;
            updateHighlightBar(index);

            const targetId = item.getAttribute("data-target");
            const targetSection = targetId
                ? document.getElementById(targetId)
                : null;

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });

        item.addEventListener("mouseenter", () => {
            updateHighlightBar(index);
        });
    });

    privacyTable?.addEventListener("mouseleave", () => {
        updateHighlightBar(activeIndex);
    });

    const sectionMap = Array.from(tocItems).map((item) => {
        const targetId = item.getAttribute("data-target");
        const targetSection = targetId
            ? document.getElementById(targetId)
            : null;
        return { item, targetSection };
    });

    const onScroll = () => {
        let newIndex = activeIndex;

        for (let i = 0; i < sectionMap.length; i++) {
            const { targetSection } = sectionMap[i];
            if (!targetSection) continue;

            const rect = targetSection.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== activeIndex) {
            tocItems[activeIndex].classList.remove("active");
            tocItems[newIndex].classList.add("active");
            activeIndex = newIndex;
            updateHighlightBar(activeIndex);
        }
    };

    const onResize = () => {
        updateHighlightBar(activeIndex);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // Cleanup function
    return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
    };
}

export default function Privacy() {
    useEffect(() => {
        const cleanup = slideBarPrivacy();
        return cleanup; 
    }, []);
    return (
        <>
            <div className="tf-spacing-1 section-privacy">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-4">
                            <ul className="privacy-table sticky-top">
                                <li
                                    className="nav_link text-title fw-6 "
                                    data-target="terms"
                                >
                                    <a href="#">1. Utiliser le site</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="limitations"
                                >
                                    <a href="#">2. Votre recherche</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="revisions"
                                >
                                    <a href="#">3. Vos échanges</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="modifications"
                                >
                                    <a href="#">
                                        4. Services externes
                                    </a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="risks"
                                >
                                    <a href="#">5. Nous contacter</a>
                                </li>
                                <li className="highlight-bar"></li>
                            </ul>
                        </div>
                        <div className="col-lg-8">
                            <div className="content">
                                <h4 className="mb_32 heading-title">
                                    Utilisation du site
                                </h4>
                                <div id="terms">
                                    <h5 className="title mb_12 text-capitalize">
                                        1. Utiliser le site{" "}
                                    </h5>
                                    <p className="mb_12">
                                        Le site CIP IMMO vous permet de consulter des appartements à louer en Guinée. Les annonces présentent les photos, les surfaces, les chambres et les tarifs pour vous aider à préparer votre recherche.
                                    </p>
                                    <p className="mb_12">
                                        Vous pouvez parcourir les logements sans créer de compte. Pour connaître les disponibilités et les conditions applicables à vos dates, contactez directement notre équipe.
                                    </p>
                                    <p>
                                        La confirmation de location se fait avec CIP IMMO. Aucun paiement n’est demandé sur ce site.
                                    </p>
                                </div>
                                <div id="limitations" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        2. Votre recherche
                                    </h5>
                                    <p className="mb_12">
                                        Les filtres vous aident à choisir un quartier, une durée, un nombre de chambres et un budget. Les montants à la nuit et au mois correspondent à des durées différentes.
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">
                                            Précisez le logement, les dates et les besoins liés à votre recherche.
                                        </li>
                                        <li className="text-body-default">
                                            Transmettez uniquement les informations utiles à votre demande.
                                        </li>
                                        <li className="text-body-default">
                                            Ne communiquez pas de coordonnées bancaires ou de documents personnels dans un premier message.
                                        </li>
                                    </ul>
                                    <p>
                                        Échangez avec notre équipe sur les dates, les charges et les modalités de votre location avant de vous engager.
                                    </p>
                                </div>
                                <div id="revisions" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        3. Vos échanges
                                    </h5>
                                    <p className="mb_12">
                                        Les coordonnées et le message saisis servent à préparer votre demande de logement. Vous choisissez les informations que vous souhaitez partager avec CIP IMMO.
                                    </p>
                                    <p className="mb_12">
                                        Les formulaires préparent un message que vous pouvez poursuivre sur WhatsApp. L’ouverture de ce service vous permet de relire votre demande avant de l’envoyer.
                                    </p>
                                    <p>
                                        Si vous souhaitez corriger une information transmise, indiquez-le à notre équipe dans votre échange.
                                    </p>
                                </div>
                                <div id="modifications" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        4. Services externes
                                    </h5>
                                    <p className="mb_12">
                                        Certains liens ouvrent un service extérieur au site CIP IMMO, comme WhatsApp pour nous écrire ou Google Maps pour consulter un secteur.
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">WhatsApp vous permet de relire et d’envoyer votre demande à notre équipe.</li>
                                        <li className="text-body-default">Les liens cartographiques vous aident à situer les quartiers proposés.</li>
                                        <li className="text-body-default">L’utilisation de ces services relève également de leurs propres règles de confidentialité.</li>
                                    </ul>
                                    <p>
                                        Vous pouvez aussi nous joindre directement par téléphone au +224 613 58 51 98.
                                    </p>
                                </div>
                                <div id="risks" className="pt_32">
                                    <h5 className="title mb_12 text-capitalize">
                                        5. Nous contacter
                                    </h5>
                                    <p className="mb_12">
                                        CIP IMMO vous accompagne dans votre recherche de location en Guinée, depuis Nongo Kiroti, à Conakry.
                                    </p>
                                    <p className="mb_12">
                                        Appelez-nous au +224 613 58 51 98 ou écrivez-nous sur WhatsApp au +224 623 41 75 10. Précisez le quartier ou le logement qui vous intéresse pour faciliter notre échange.
                                    </p>
                                    <p>
                                        Notre équipe peut vous renseigner sur les courts séjours, les locations longue durée et les modalités de votre arrivée.
                                    </p>
                                    <p>
                                        E-mail : <a href="mailto:contact@cipsarlu.com">contact@cipsarlu.com</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
