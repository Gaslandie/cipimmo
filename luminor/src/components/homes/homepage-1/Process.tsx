import React from "react";

export default function Process() {
    return (
        <div className="section-process-1">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner-3.jpg?v=cip-photos-1") center / cover no-repeat',
                }}
            >
                <div className="tf-container">
                    <div className="box scrolling-effect effectFade">
                        <div className="heading-section mb_32">
                            <span className="sub text-uppercase fw-6 text_secondary-color-2">
                                Comment louer
                            </span>
                            <h3>Votre location en trois étapes</h3>
                        </div>
                        <div className="wrap-process">
                            <div className="process-item style-1">
                                <span className="number h5">01.</span>
                                <div className="content">
                                    <h5 className="mb_8">
                                        Trouvez votre logement
                                    </h5>
                                    <p>
                                        Comparez nos appartements selon le quartier, la surface, les chambres et votre budget.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">02.</span>
                                <div className="content">
                                    <h5 className="mb_8">Échangez avec notre équipe</h5>
                                    <p>
                                        Appelez CIP IMMO ou écrivez-nous sur WhatsApp avec vos dates et le logement qui vous intéresse.
                                    </p>
                                </div>
                            </div>
                            <div className="process-item style-1">
                                <span className="number h5">03.</span>
                                <div className="content">
                                    <h5 className="mb_8">Préparez votre arrivée</h5>
                                    <p>
                                        Confirmez avec notre équipe les disponibilités et les conditions, puis préparez votre séjour ou votre installation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
