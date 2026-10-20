import React from "react";

export default function Privacy() {
    return (
        <>
            <div className="tf-spacing-1 section-privacy">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-4">
                            <ul className="privacy-table sticky-top">
                                <li className="nav_link text-title fw-6"><a href="#legal">Mentions légales</a></li>
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
                                <li className="nav_link text-title fw-6"><a href="#cookies">Cookies et données techniques</a></li>
                                <li className="nav_link text-title fw-6"><a href="#retention">Conservation des données</a></li>
                                <li className="nav_link text-title fw-6"><a href="#rights">Vos droits</a></li>
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
                                <h2 className="h4 mb_32 heading-title">
                                    Informations légales et confidentialité
                                </h2>
                                <p className="mb_20">Dernière mise à jour : 20 octobre 2026.</p>
                                <section id="legal" className="mb_32">
                                    <h2 className="h5 mb_12">Mentions légales</h2>
                                    <p className="mb_12">CIP IMMO est le service de location immobilière exploité par CIP SARLU. CIP SARLU est l’interlocuteur pour les données traitées dans le cadre de ce site et des demandes qui lui sont adressées.</p>
                                    <dl className="mb_20">
                                        <dt>Entreprise</dt><dd>CIP SARLU</dd>
                                        <dt>Forme juridique</dt><dd>SARLU</dd>
                                        <dt>RCCM</dt><dd>GN.TCC.2024.B.12984</dd>
                                        <dt>Capital social</dt><dd>10 000 000 GNF</dd>
                                        <dt>Siège social</dt><dd>Nongo Kiroti, Conakry, Guinée</dd>
                                        <dt>Contact pour ce site</dt><dd><a href="mailto:contact@cipsarlu.com">contact@cipsarlu.com</a> · <a href="tel:+224613585198">+224 613 58 51 98</a></dd>
                                    </dl>
                                    <p className="mb_12">Les informations d’immatriculation, de capital et de siège sont également publiées sur le <a href="https://cipsarlu.com/about">site institutionnel de CIP SARLU</a>.</p>
                                    <p className="mb_12">Hébergement : Bluehost Inc., 5335 Gate Pkwy, Jacksonville, FL 32256, États-Unis. Assistance internationale : <a href="tel:+18017659400">+1 801 765 9400</a>. <a href="https://www.bluehost.com/terms/user-agreement">Coordonnées et conditions de l’hébergeur</a>.</p>
                                    <p>Pour signaler une erreur dans une annonce, une atteinte à vos droits ou un contenu à retirer, écrivez à <a href="mailto:contact@cipsarlu.com">contact@cipsarlu.com</a> en précisant la page concernée.</p>
                                </section>
                                <div id="terms">
                                    <h2 className="h5 title mb_12 text-capitalize">
                                        1. Utiliser le site{" "}
                                    </h2>
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
                                    <h2 className="h5 title mb_12 text-capitalize">
                                        2. Votre recherche
                                    </h2>
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
                                <section id="cookies" className="pt_32">
                                    <h2 className="h5 mb_12">Cookies et données techniques</h2>
                                    <p className="mb_12">Le site public n’intègre actuellement aucun outil de publicité ni de mesure individuelle d’audience. Les favoris utilisent le stockage local du navigateur, uniquement lorsque vous enregistrez un logement.</p>
                                    <p className="mb_12">L’administration utilise deux cookies nécessaires à son fonctionnement : « cipimmo_admin_session » pour la session et « XSRF-TOKEN » pour protéger les actions. Ils ne servent pas à la publicité. Les bloquer empêche le fonctionnement normal du back-office.</p>
                                    <p>L’hébergement et la sécurité peuvent nécessiter des journaux techniques comprenant notamment l’adresse IP, la date, la page demandée et des informations sur le navigateur. Ces informations sont distinctes des champs des formulaires, qui ne sont pas enregistrés dans la base du site.</p>
                                </section>
                                <section id="retention" className="pt_32">
                                    <h2 className="h5 mb_12">Conservation des données</h2>
                                    <p className="mb_12">Les favoris restent dans votre navigateur jusqu’à leur suppression ou à l’effacement des données du site. Les cookies de l’administration expirent après deux heures sans activité ; la déconnexion met fin à la session.</p>
                                    <p className="mb_12">Les messages que vous envoyez à CIP SARLU restent dans les outils de messagerie utilisés pour traiter votre demande. Fermer ce site ne supprime pas un message déjà envoyé. Leur conservation doit être limitée à ce qui est nécessaire au suivi de la demande et, si une location est conclue, aux obligations applicables au contrat.</p>
                                    <p>Pour connaître la durée applicable à votre échange ou aux journaux techniques, ou demander la suppression de données, contactez <a href="mailto:contact@cipsarlu.com">contact@cipsarlu.com</a>.</p>
                                </section>
                                <section id="rights" className="pt_32">
                                    <h2 className="h5 mb_12">Vos droits sur vos données</h2>
                                    <p className="mb_12">Dans les conditions prévues par la législation applicable, vous pouvez demander l’accès aux données vous concernant, leur rectification, leur suppression et vous opposer à certains traitements, notamment à la prospection commerciale. Vous pouvez aussi retirer un consentement donné pour un usage facultatif.</p>
                                    <p>Adressez votre demande à CIP SARLU à <a href="mailto:contact@cipsarlu.com">contact@cipsarlu.com</a>, en précisant le site cipimmo.com et les informations concernées. Une vérification proportionnée de votre identité peut être nécessaire pour éviter de communiquer vos données à une autre personne. N’envoyez pas spontanément de pièce d’identité ou de données bancaires.</p>
                                </section>
                                <div id="revisions" className="pt_32">
                                    <h2 className="h5 title mb_12 text-capitalize">
                                        3. Vos échanges
                                    </h2>
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
                                    <h2 className="h5 title mb_12 text-capitalize">
                                        4. Services externes
                                    </h2>
                                    <p className="mb_12">
                                        Certains liens ouvrent un service extérieur au site CIP IMMO, comme WhatsApp pour nous écrire, Facebook ou Google Maps pour consulter un secteur. La carte intégrée ne se charge qu’après votre demande d’affichage.
                                    </p>
                                    <ul className="mb_12">
                                        <li className="text-body-default">WhatsApp vous permet de relire et d’envoyer votre demande à notre équipe.</li>
                                        <li className="text-body-default">Les liens cartographiques vous aident à situer les quartiers proposés.</li>
                                        <li className="text-body-default">L’utilisation de ces services relève également de leurs propres règles de confidentialité.</li>
                                    </ul>
                                    <p>
                                        Vous pouvez aussi nous joindre directement par téléphone au +224 613 58 51 98.
                                    </p>
                                    <p className="mt_12">Lors de l’ouverture de WhatsApp, le texte préparé et des données de connexion sont transmis à ce service, même si vous décidez ensuite de ne pas envoyer le message. L’affichage de la carte transmet également des données de connexion à Google. Ces services et l’hébergeur peuvent traiter des données en dehors de la Guinée, selon leurs conditions et leurs infrastructures.</p>
                                    <p className="mt_12">Consultez les règles de <a href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp</a>, de <a href="https://policies.google.com/privacy?hl=fr">Google</a>, de <a href="https://www.facebook.com/privacy/policy/">Facebook</a> et de <a href="https://newfold.com/privacy-center/privacy">Bluehost / Newfold Digital</a>. Aucun de ces liens ne vous inscrit automatiquement à une liste d’offres de CIP IMMO.</p>
                                </div>
                                <div id="risks" className="pt_32">
                                    <h2 className="h5 title mb_12 text-capitalize">
                                        5. Nous contacter
                                    </h2>
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
