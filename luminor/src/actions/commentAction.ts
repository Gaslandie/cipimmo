import { textField, validEmail, type WhatsAppResult } from "./whatsapp";

export function handleSubmit(data: FormData): WhatsAppResult {
    const name = textField(data, "name", 100), email = textField(data, "email", 254, false), comment = textField(data, "comment", 2000), reply = textField(data, "reply", 3, false);
    if (name === null) return { error: "Indiquez votre nom (100 caractères maximum).", field: "name" };
    if (email === null || !validEmail(email)) return { error: "Vérifiez votre adresse e-mail, ou laissez ce champ vide.", field: "email" };
    if (comment === null || comment.length < 10) return { error: "Écrivez votre message en 10 à 2 000 caractères.", field: "comment" };
    if (reply === null || !["", "yes"].includes(reply)) return { error: "Vérifiez votre choix de rappel.", field: "reply" };
    return { message: `Bonjour CIP IMMO, je souhaite vous partager mon avis.\n${name}${email ? ` (${email})` : ""}\n${comment}${reply ? "\nJe souhaite être recontacté au sujet de mon message." : ""}` };
}
