import { textField, validEmail, type WhatsAppResult } from "./whatsapp";

export function sendContact(data: FormData): WhatsAppResult {
    const firstName = textField(data, "firstName", 80), lastName = textField(data, "lastName", 80);
    const email = textField(data, "email", 254, false), phone = textField(data, "phone", 30, false), message = textField(data, "message", 2000);
    if (firstName === null) return { error: "Indiquez votre prénom (80 caractères maximum).", field: "firstName" };
    if (lastName === null) return { error: "Indiquez votre nom (80 caractères maximum).", field: "lastName" };
    if (email === null || !validEmail(email)) return { error: "Vérifiez votre adresse e-mail, ou laissez ce champ vide.", field: "email" };
    const phoneDigits = phone?.replace(/\D/g, "") || "";
    if (phone === null || (phone && (!/^\+?[0-9 ()-]+$/.test(phone) || phoneDigits.length < 6 || phoneDigits.length > 15))) return { error: "Vérifiez votre numéro de téléphone, ou laissez ce champ vide.", field: "phone" };
    if (message === null || message.length < 10) return { error: "Décrivez votre demande en 10 à 2 000 caractères.", field: "message" };
    return { message: `Bonjour CIP IMMO,\nJe suis ${firstName} ${lastName}.\n${message}${email ? `\nE-mail : ${email}` : ""}${phone ? `\nTéléphone : ${phone}` : ""}` };
}
