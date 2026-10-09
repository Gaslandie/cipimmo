"use server";
import { redirect } from "next/navigation";

export async function submitFAQQuestion(formData: FormData) {
    const name = formData.get("name"), message = formData.get("message");
    if (typeof name !== "string" || !name.trim() || name.length > 100 || typeof message !== "string" || message.trim().length < 10 || message.length > 2000) return;
    redirect(`https://wa.me/224623417510?text=${encodeURIComponent(`Bonjour CIP IMMO, je suis ${name.trim()}.\n${message.trim()}`)}`);
}
