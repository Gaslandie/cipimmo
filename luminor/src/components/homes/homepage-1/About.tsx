import Link from 'next/link'
import React from 'react'
import RentalHelp from '@/components/common/RentalHelp'

export default function About() {
  return (
    <>
         <div className="section-about-1 tf-spacing-1 rental-guidance">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="heading-section mb_20">
                                <span
                                    className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">À propos</span>
                                <h2 className="h3">CIP IMMO, à vos côtés pour trouver votre logement</h2>
                            </div>
                            <p className="text-body-2">Vous cherchez un logement pour un court séjour ou pour vous installer ?
                                CIP IMMO vous propose des logements meublés et non meublés
                                et vous accompagne dans votre recherche.</p>
                            <Link href={'/listing-left-sidebar'} className="tf-btn btn-bg-1 btn-px-32">
                                <span>Voir nos logements</span>
                                <span className="bg-effect"></span>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <ol className="list" role="list" aria-label="Les trois étapes pour louer">
                                <li className="d-flex gap_20">
                                    <span className="h4 number">01.</span>
                                    <div className="content">
                                        <h3 className="h5 mb_8">Choisissez un logement</h3>
                                        <p>Choisissez une ville et affinez votre recherche selon vos besoins
                                            et votre budget.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20">
                                    <span className="h4 number">02.</span>
                                    <div className="content">
                                        <h3 className="h5 mb_8">Échangez avec CIP IMMO</h3>
                                        <p>Appelez-nous ou écrivez-nous sur WhatsApp pour poser vos questions et demander une visite.</p>
                                    </div>
                                </li>
                                <li className="d-flex gap_20">
                                    <span className="h4 number">03.</span>
                                    <div className="content">
                                        <h3 className="h5 mb_8">Confirmez les conditions</h3>
                                        <p>Contactez-nous sur WhatsApp ou par téléphone pour confirmer la disponibilité
                                            et connaître les conditions de location. Un clic ne réserve pas le logement.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <RentalHelp />
                </div>
            </div>
    </>
  )
}
