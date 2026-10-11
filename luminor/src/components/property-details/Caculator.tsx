"use client";
import { useState } from "react";

export default function Caculator({ price = 3000000, period = "mois", compact = false }: { price?: number; period?: string; compact?: boolean }) {
    const [result, setResult] = useState({ monthly: price, deposit: price, total: price * 2 });
    const format = (value: number) => `${value.toLocaleString("fr-FR")} GNF`;
    return <div>
        <h5 className="properties-title mb_20">Préparer votre budget location</h5>
        <div className="wrap-form">
            <form className={`form-calculator${compact ? " style-1" : ""}`} onSubmit={event => {
                event.preventDefault();
                const values = new FormData(event.currentTarget);
                const [rent, charges, duration, deposit] = ["rent", "charges", "duration", "deposit"].map(key => Number(values.get(key)));
                if (![rent, charges, duration, deposit].every(Number.isFinite) || rent < 0 || charges < 0 || deposit < 0 || duration < 1 || duration > 365 || rent > 1e9 || charges > 1e9 || deposit > 1e9) return;
                setResult({ monthly: rent + charges, deposit, total: (rent + charges) * duration + deposit });
            }}>
                <div className="tf-grid-layout xl-col-4 md-col-2">
                    <fieldset><label htmlFor="rental-amount" className="text-body-default text_primary-color mb_8">Prix par {period} (GNF)</label><input id="rental-amount" name="rent" type="number" min="0" max="1000000000" step="1" defaultValue={price} required /></fieldset>
                    <fieldset><label htmlFor="rental-charges" className="text-body-default text_primary-color mb_8">Charges par {period} (GNF)</label><input id="rental-charges" name="charges" type="number" min="0" max="1000000000" step="1" defaultValue={0} required /></fieldset>
                    <fieldset><label htmlFor="rental-duration" className="text-body-default text_primary-color mb_8">Durée ({period === "jour" ? "jours" : period === "nuit" ? "nuits" : "mois"})</label><input id="rental-duration" name="duration" type="number" min="1" max="365" step="1" defaultValue={1} required /></fieldset>
                    <fieldset><label htmlFor="rental-deposit" className="text-body-default text_primary-color mb_8">Caution (GNF)</label><input id="rental-deposit" name="deposit" type="number" min="0" max="1000000000" step="1" defaultValue={price} required /></fieldset>
                </div>
                <button className="tf-btn btn-bg-1 btn-px-28 w-full" type="submit"><span>Calculer mon budget</span><span className="bg-effect" /></button>
            </form>
            <ul className="info tf-grid-layout sm-col-3 gap_8" aria-live="polite">
                <li><p className="mb_4">Budget par {period} :</p><div className="text-button text_primary-color fw-7">{format(result.monthly)}</div></li>
                <li><p className="mb_4">Caution :</p><div className="text-button text_primary-color fw-7">{format(result.deposit)}</div></li>
                <li><p className="mb_4">Budget total :</p><div className="text-button text_primary-color fw-7">{format(result.total)}</div></li>
            </ul>
        </div>
    </div>;
}
