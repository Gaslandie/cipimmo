"use client";

// Conservée pour compatibilité ; aucun contenu de formulaire n’est journalisé.
export async function calculateLoan(formData: FormData) {
    const numbers = ["totalAmount", "interestRate", "loanTerm", "downPayment"].map(key => formData.get(key));
    if (numbers.some(value => typeof value !== "string" || !value.trim() || !Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > 1e9)) return;
}
