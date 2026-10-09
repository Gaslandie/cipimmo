"use server";
import { redirect } from "next/navigation";

export async function subscribeNewsletter(formData: FormData) {
    const email = formData.get("email");
    if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
    redirect(`https://wa.me/224623417510?text=${encodeURIComponent(`Bonjour CIP IMMO, je souhaite connaître vos offres de location. Mon adresse e-mail : ${email.trim()}`)}`);
}
