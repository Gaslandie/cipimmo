import { textField, type WhatsAppResult } from "./whatsapp";

export const faqSubjects = ["Préparer son séjour", "Choisir un logement", "Location longue durée", "Budget et conditions", "Autre demande"];
export function submitFAQQuestion(data: FormData): WhatsAppResult {
    const name = textField(data, "name", 100), subject = textField(data, "subject", 100), message = textField(data, "message", 2000);
    if (name === null) return { error: "Indiquez votre prénom (100 caractères maximum).", field: "name" };
    if (subject === null || !faqSubjects.includes(subject)) return { error: "Choisissez le sujet de votre demande.", field: "subject" };
    if (message === null || message.length < 10) return { error: "Écrivez votre question en 10 à 2 000 caractères.", field: "message" };
    return { message: `Bonjour CIP IMMO, je suis ${name}.\nSujet : ${subject}.\n${message}` };
}
