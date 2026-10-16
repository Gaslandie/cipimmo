"use client";

import { useState } from "react";
import Link from "next/link";
import { advicePosts as blogPostsGrid } from "@/data/blog";

export default function ArticleLinks({ title }: { title: string }) {
    const index = blogPostsGrid.findIndex(post => post.title === title);
    const previous = index > 0 ? blogPostsGrid[index - 1] : undefined;
    const next = index >= 0 ? blogPostsGrid[index + 1] : undefined;
    const [message, setMessage] = useState("");
    const [fallback, setFallback] = useState("");
    async function copy() {
        const url = `${window.location.origin}${window.location.pathname}`;
        try { await navigator.clipboard.writeText(url); setMessage("Lien copié. Vous pouvez le coller dans votre message."); setFallback(""); }
        catch { setMessage("Sélectionnez et copiez le lien ci-dessous."); setFallback(url); }
    }
    return <div className="article-links">
        <button className="tf-btn mt_24" type="button" onClick={copy}>Copier le lien de ce conseil</button>
        <p role="status" className="mt_16">{message}</p>
        {fallback && <label className="d-block">Lien du conseil<input readOnly value={fallback} onFocus={event => event.target.select()} /></label>}
        <nav className="tf-article-navigation" aria-label="Autres conseils">
            {previous && <div className="item prev"><Link href={`/blog-post-1/${previous.id}/`}>Conseil précédent : {previous.title}</Link></div>}
            {next && <div className="item next"><Link href={`/blog-post-1/${next.id}/`}>Conseil suivant : {next.title}</Link></div>}
        </nav>
        <Link href="/blog-standard/" className="hover-underline-link">Voir tous les conseils</Link>
    </div>;
}
