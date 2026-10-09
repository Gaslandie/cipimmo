import React from "react";

export default function Banner1() {
    return (
        <div className="banner">
            <div
                className="parallaxie"
                style={{
                    background: 'url("/assets/images/section/banner.jpg?v=cip-photos-1") center / cover no-repeat',
                }}
            >
                <div className="tf-container z-5">
                    <h2 className="text_white mb_20">
                        Trouvez votre logement, <br />
                        pour quelques jours ou pour longtemps
                    </h2>
                    <p className="text_white text-body-1">
                        CIP IMMO vous accompagne pour votre séjour ou votre installation en Guinée.
                    </p>
                </div>
            </div>
        </div>
    );
}
