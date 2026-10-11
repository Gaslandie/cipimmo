"use client";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropdownSelect2 from "./DropdownSelect2";
import AdvanceSearchDefault from "./AdvanceSearchDefault";

import { cityOptions } from "@/data/optionfilter";
const bedroomOptions = ["Peu importe", "1", "2", "3", "4 et plus"];
const rentalBudgets = {
    "court-sejour": ["Sans maximum", "300 000 GNF", "500 000 GNF", "1 000 000 GNF"],
    "longue-duree": ["Sans maximum", "2 000 000 GNF", "3 000 000 GNF", "4 000 000 GNF", "5 000 000 GNF"],
};

export default function SidebarFilterDefault() {
    const [duration, setDuration] = useState<keyof typeof rentalBudgets>("court-sejour");
    const [durationChosen, setDurationChosen] = useState(false);
    const router = useRouter();
    const [keyword, setKeyword] = useState("");
    const [city, setCity] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [budget, setBudget] = useState("");
    const search = () => {
        const params = new URLSearchParams();
        if (keyword.trim()) params.set("keyword", keyword.trim());
        if (city && city !== cityOptions[0]) params.set("city", city);
        if (bedrooms && bedrooms !== bedroomOptions[0]) params.set("bedrooms", bedrooms === "4 et plus" ? "4+" : bedrooms);
        if (budget && budget !== "Sans maximum") params.set("budget", `${budget.replace(/[^0-9]/g, "")}:${duration === "court-sejour" ? "jour" : "mois"}`);
        if (params.size || durationChosen) params.set("duration", duration === "court-sejour" ? "courte" : "longue");
        router.push(`/listing-left-sidebar${params.size ? `?${params.toString()}` : ""}`);
    };
    const ddContainer = useRef<HTMLDivElement>(null);
    const advanceBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ddContainer.current &&
                !ddContainer.current.contains(event.target as Node) &&
                advanceBtnRef.current &&
                !advanceBtnRef.current.contains(event.target as Node)
            ) {
                ddContainer.current.classList.remove("show");
            }
        };
        // Add event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flat-tab flat-tab-form">
            <div className="tf-container">
                <ul
                    className="nav-tab-form style-1 justify-content-center"
                    role="tablist"
                >
                    {([
                        ["court-sejour", "Court séjour"],
                        ["longue-duree", "Longue durée"],
                    ] as const).map(([value, label]) => (
                        <li className="nav-tab-item text-title fw-6" role="presentation" key={value}>
                            <a
                                href="#rental-search"
                                id={`rental-tab-${value}`}
                                className={`nav-link-item${duration === value ? " active" : ""}`}
                                role="tab"
                                aria-selected={duration === value}
                                aria-controls="rental-search"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setDuration(value);
                                    setDurationChosen(true);
                                    setBudget("");
                                }}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="wg-filter">
                    <div className="widget-content-inner active" id="rental-search" role="tabpanel" aria-labelledby={`rental-tab-${duration}`}>
                        <div className="form-title">
                            <div className="wrap-fill tf-grid-layout lg-col-4 md-col-2">
                                <form className="w-full" onSubmit={(event) => { event.preventDefault(); search(); }}>
                                    <label
                                        htmlFor="lookingFor"
                                        className="text-button text_primary-color mb_8"
                                    >
                                        Votre recherche
                                    </label>
                                    <fieldset>
                                        <input
                                            type="text"
                                            placeholder="Ville, type de logement…"
                                            id="lookingFor"
                                            maxLength={200}
                                            value={keyword}
                                            onChange={(event) => setKeyword(event.target.value)}
                                        />
                                    </fieldset>
                                </form>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Localisation
                                    </div>
                                    <DropdownSelect2 options={cityOptions} onChange={setCity} />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Chambres
                                    </div>
                                    <DropdownSelect2 options={bedroomOptions} onChange={setBedrooms} />
                                </div>
                                <div>
                                    <div className="text-button text_primary-color mb_8">
                                        Budget / {duration === "court-sejour" ? "jour" : "mois"} (GNF)
                                    </div>
                                    <DropdownSelect2 key={duration} options={rentalBudgets[duration]} onChange={setBudget} />
                                </div>
                            </div>
                            <div className="wrap-btn">
                                <div
                                    className="btn-filter show-form"
                                    title="Plus de critères"
                                    onClick={() =>
                                        ddContainer.current?.classList.toggle(
                                            "show"
                                        )
                                    }
                                    ref={advanceBtnRef}
                                >
                                    <div className="icons">
                                        <i className="icon-Faders"></i>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={search}
                                    className="tf-btn btn-px-28 btn-bg-1"
                                >
                                    <span>Rechercher</span>
                                    <span className="bg-effect"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <AdvanceSearchDefault
                        ddContainer={
                            ddContainer as React.RefObject<HTMLDivElement>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
