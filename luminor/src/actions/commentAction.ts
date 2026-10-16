"use client";
const redirect = (url: string) => window.location.assign(url);

export async function handleSubmit(formData: FormData) {
    const name = formData.get("name"), email = formData.get("email"), comment = formData.get("comment");
    if (typeof name !== "string" || !name.trim() || name.length > 100 || typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof comment !== "string" || comment.trim().length < 10 || comment.length > 2000) return;
    redirect(`https://wa.me/224623417510?text=${encodeURIComponent(`Bonjour CIP IMMO, je souhaite vous partager mon avis.\n${name.trim()} (${email})\n${comment.trim()}`)}`);
}
