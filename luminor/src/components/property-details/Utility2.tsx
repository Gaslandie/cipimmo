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
    { icon: "icon-SolarPanel", title: "Énergie solaire", sttt: "Oui" },
    { icon: "icon-Fire", title: "Espace de vie", sttt: "Oui" },
    { icon: "icon-Fan", title: "Ventilation", sttt: "Oui" },
];

export default function Utility2() {
    // Phân chia đều thành 3 cột
    function chunkArray<T>(arr: T[], columns: number): T[][] {
        const result: T[][] = Array.from({ length: columns }, () => []);
        arr.forEach((item, index) => {
            result[index % columns].push(item);
        });
        return result;
    }

    const columns = chunkArray(utility, 3); // Chia đều 3 cột
    return (
        <>
            <h5 className="properties-title mb_20">Les équipements</h5>
            <div className="tf-grid-layout md-col-3">
                {columns.map((colItems, colIdx) => (
                    <div className="col-utility" key={colIdx}>
                        {colItems.map((item, idx) => (
                            <div
                                className="item d-flex justify-content-between"
                                key={idx}
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
                ))}
            </div>
        </>
    );
}
