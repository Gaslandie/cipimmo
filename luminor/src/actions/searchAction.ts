"use client";
const redirect = (url: string) => window.location.assign(url);

export async function searchAction(formData: FormData) {
    const query = formData.get("text");
    if (typeof query !== "string" || !query.trim() || query.length > 200) return;
    redirect(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/blog-grid/?search=${encodeURIComponent(query.trim())}`);
}
