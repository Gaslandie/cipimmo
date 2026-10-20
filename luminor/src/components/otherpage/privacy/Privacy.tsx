import React from "react";

export default function Privacy() {
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
                                    <a href="#terms">1. Utiliser le site</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="limitations"
                                >
                                    <a href="#limitations">2. Votre recherche</a>
                                </li>
                                <li className="nav_link text-title fw-6"><a href="#favorites">Favoris et formulaires</a></li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="revisions"
                                >
                                    <a href="#revisions">3. Vos échanges</a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="modifications"
                                >
                                    <a href="#modifications">
                                        4. Services externes
                                    </a>
                                </li>
                                <li
                                    className="nav_link text-title fw-6"
                                    data-target="risks"
                                >
                                    <a href="#risks">5. Nous contacter</a>
                                </li>
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
                                        Le site CIP IMMO vous permet de consulter des logements à louer en Guinée. Les annonces présentent les photos disponibles et les informations communiquées sur les surfaces, les chambres et les tarifs. Les prix non communiqués sont indiqués « À discuter ». La période du tarif est précisée sur chaque fiche lorsqu’un prix est renseigné.
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
                                        Les filtres vous aident à choisir un quartier, une durée, un nombre de chambres et un budget. Les montants par jour, par nuit et par mois correspondent à des durées différentes.
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
                                <section id="favorites" className="pt_32">
                                    <h2 className="h5 mb_12">Vos favoris et vos formulaires</h2>
                                    <p className="mb_12">Les favoris sont enregistrés dans ce navigateur, sur cet appareil. Ils contiennent seulement les références des logements sélectionnés. Ils ne sont pas envoyés à CIP IMMO et ne sont pas synchronisés avec un autre téléphone.</p>
                                    <p className="mb_12">Pour les supprimer, utilisez « Retirer des favoris » ou effacez les données de ce site dans votre navigateur. En navigation privée ou si le stockage est bloqué, ils peuvent disparaître à la fin de la visite.</p>
                                    <p>Les champs des formulaires servent à préparer un message. Le site ne les enregistre pas dans sa base de données ni dans les favoris. Lorsque vous ouvrez WhatsApp, le texte est transmis à ce service pour préparer le message ; vous choisissez ensuite de l’envoyer à CIP IMMO.</p>
                                </section>
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
