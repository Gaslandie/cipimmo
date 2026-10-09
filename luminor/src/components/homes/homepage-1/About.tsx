import Link from 'next/link'
import React from 'react'

export default function About() {
  return (
    <>
         <div className="section-about-1 tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="heading-section mb_20">
                                <span
                                    className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">À propos</span>
                                <h3 className="split-text effect-blur-fade">CIP IMMO, à vos côtés pour trouver votre logement</h3>
                            </div>
                            <p className="text-body-2 split-text split-lines-transform">Vous cherchez un logement pour un court séjour ou pour vous installer ?
                                CIP IMMO vous propose des logements meublés et non meublés
                                et vous accompagne dans votre recherche.</p>
                            <Link href={'/listing-left-sidebar'} className="tf-btn btn-bg-1 btn-px-32">
                                <span>Voir nos logements</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <ul className="list">
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">01.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Trouvez votre logement</h5>
                                        <p>Choisissez une ville et affinez votre recherche selon vos besoins
                                            et votre budget.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">02.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Consultez les détails</h5>
                                        <p>Découvrez les photos, les équipements et le prix du logement.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20 scrolling-effect effectRight">
                                    <span className="h4 number">03.</span>
                                    <div className="content">
                                        <h5 className="mb_8">Échangez avec CIP IMMO</h5>
                                        <p>Contactez-nous sur WhatsApp ou par téléphone pour confirmer la disponibilité
                                            et connaître les conditions de location.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
