"use server";
import { redirect } from "next/navigation";

export async function sendContact(formData: FormData) {
    const fields = ["firstName", "lastName", "email", "phone", "message"].map(key => formData.get(key));
    if (fields.some(value => value !== null && typeof value !== "string")) return;
    const [firstName, lastName, email, phone, message] = fields.map(value => String(value ?? "").trim());
    if (!firstName || !lastName || firstName.length > 80 || lastName.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || phone.length > 30 || message.length < 10 || message.length > 2000) return;
    const text = `Bonjour CIP IMMO,\nJe suis ${firstName} ${lastName}.\n${message}\nE-mail : ${email}${phone ? `\nTéléphone : ${phone}` : ""}`;
    redirect(`https://wa.me/224623417510?text=${encodeURIComponent(text)}`);
}
