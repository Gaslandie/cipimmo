"use server";
import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {
    const query = formData.get("text");
    if (typeof query !== "string" || !query.trim() || query.length > 200) return;
    redirect(`/blog-grid?search=${encodeURIComponent(query.trim())}`);
}
