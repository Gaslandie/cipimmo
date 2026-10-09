import React from "react";

type UtilityItem = {
    icon: string;
    title: string;
    sttt: string;
};

const utility: UtilityItem[] = [
    { icon: "icon-Thermometer", title: "Ventilation", sttt: "Naturelle" },
    { icon: "icon-Snowflake", title: "Climatisation", sttt: "Oui" },
    { icon: "icon-WifiHigh", title: "Wifi", sttt: "Oui" },
    {
        icon: "icon-FingerprintSimple",
        title: "Modalités de remise des clés",
        sttt: "Oui",
    },
    { icon: "icon-SecurityCamera", title: "Caméras de sécurité", sttt: "Oui" },
    { icon: "icon-Television", title: "Télévision", sttt: "Oui" },
    { icon: "icon-CloudWarning", title: "Détecteur de fumée", sttt: "Oui" },
    { icon: "icon-SolarPanel", title: "Énergie solaire", sttt: "Oui" },
    { icon: "icon-Fire", title: "Espace de vie", sttt: "Oui" },
    { icon: "icon-Fan", title: "Ventilation", sttt: "Oui" },
];

export default function PropertyUtility() {
    const middleIndex = Math.ceil(utility.length / 2);
    const firstColumn = utility.slice(0, middleIndex);
    const secondColumn = utility.slice(middleIndex);

    const renderColumn = (items: UtilityItem[]) => (
        <div className="col-utility">
            {items.map((item, index) => (
                <div
                    className="item d-flex justify-content-between"
                    key={index}
                >
                    <div className="d-flex align-items-center gap_8 text-body-default text_primary-color">
                        <i className={item.icon}></i>
                        {item.title}
                    </div>
                    <span className="text-button text_primary-color">
                        {item.sttt}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <>
            <h5 className="properties-title mb_20">Les équipements</h5>
            <div className="tf-grid-layout md-col-2">
                {renderColumn(firstColumn)}
                {renderColumn(secondColumn)}
            </div>
        </>
    );
}
