"use client";

import { rentalBudgetPeriods } from "@/data/cipRentals";

export default function RentalBudgetFields({ id, amount, period, duration, onChange }: {
    id: string; amount: string; period: string; duration: string;
    onChange: (amount: string, period: string) => void;
}) {
    const periods = rentalBudgetPeriods(duration);
    const selectedPeriod = periods.includes(period) ? period : periods[0];
    return <div className="rental-budget-fields">
        <div>
            <label htmlFor={`${id}-budget`}>Budget maximal (GNF)</label>
            <input id={`${id}-budget`} name="budget" type="text" inputMode="numeric" pattern="0*[1-9][0-9]*" maxLength={12}
                value={amount} onChange={event => onChange(event.target.value, selectedPeriod)}
                placeholder="Ex. : 2500000" aria-describedby={`${id}-budget-note`}
                title="Saisissez un montant entier supérieur à zéro, sans espaces, avec au maximum 12 chiffres." />
        </div>
        <div>
            <label htmlFor={`${id}-budget-period`}>Période du budget</label>
            <select id={`${id}-budget-period`} name="budgetPeriod" value={selectedPeriod} onChange={event => onChange(amount, event.target.value)}>
                {periods.map(item => <option key={item} value={item}>Par {item}</option>)}
            </select>
        </div>
        <p id={`${id}-budget-note`}>Montant en chiffres, sans espaces. Laissez vide pour ne pas fixer de maximum.</p>
    </div>;
}
