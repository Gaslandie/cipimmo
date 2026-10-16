import { textField, validEmail, type WhatsAppResult } from "./whatsapp";

export function subscribeNewsletter(data: FormData): WhatsAppResult {
    const email = textField(data, "email", 254);
    if (email === null || !validEmail(email)) return { error: "Indiquez une adresse e-mail valide.", field: "email" };
    return { message: `Bonjour CIP IMMO, je souhaite connaître vos offres de location. Mon adresse e-mail : ${email}` };
}
