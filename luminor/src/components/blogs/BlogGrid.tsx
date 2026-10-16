"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { advicePosts as blogPostsGrid } from "@/data/blog";

export default function BlogGrid() {
    const [displayedItems, setDisplayedItems] = useState(9);
    const [search, setSearch] = useState("");
    const [invalid, setInvalid] = useState(false);
    useEffect(() => {
        const read = () => {
            const params = new URLSearchParams(window.location.search);
            const value = params.get("search") || "";
            const bad = params.getAll("search").length > 1 || value.length > 200;
            setInvalid(bad); setSearch(bad ? "" : value.trim()); setDisplayedItems(9);
        };
        read(); window.addEventListener("popstate", read);
        return () => window.removeEventListener("popstate", read);
    }, []);
    function reset() { window.history.replaceState(null, "", window.location.pathname); setSearch(""); setInvalid(false); setDisplayedItems(9); }
    const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
    const results = invalid ? [] : blogPostsGrid.filter((item) => normalize(`${item.title} ${item.description} ${item.category}`).includes(normalize(search)));
    const itemsPerLoad = 3;

    const handleLoadMore = () => {
        setDisplayedItems((prev) => prev + itemsPerLoad);
    };

    const currentItems = results.slice(0, displayedItems);
    const hasMoreItems = displayedItems < results.length;

    return (
        <div className="tf-container tf-spacing-1 blog-grid">
            <form className="blog-search mb_24" action={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/blog-grid/`} method="get" aria-label="Rechercher un conseil">
                <label htmlFor="blog-search">Rechercher un conseil</label>
                <input id="blog-search" name="search" type="search" maxLength={200} defaultValue={search} key={search} />
                <button type="submit" className="tf-btn mt_16">Rechercher</button>
            </form>
            {invalid && <p role="alert">Ce lien contient une recherche invalide. <button type="button" onClick={reset}>Voir tous les conseils</button></p>}
            {search && <p role="status" className="mb_24">{results.length} conseil{results.length > 1 ? "s" : ""} pour « {search} ». <button type="button" onClick={reset}>Voir tous les conseils</button></p>}
            {!results.length && !invalid && <p className="mb_24">Aucun conseil ne correspond. Essayez un autre mot ou <button type="button" onClick={reset}>voir tous les conseils</button>.</p>}
            <div className="tf-grid-layout lg-col-3 md-col-2" id="gridLayout">
                {currentItems.map((item) => (
                    <div
                        className="blog-article-item style-default hover-image-translate loadItem"
                        key={item.id}
                    >
                        <div className="article-thumb image-wrap mb_24">
                            <Image
                                loading="lazy"
                                src={item.imgSrc}
                                width={850}
                                height={478}
                                alt={item.alt}
                            />
                            <Link
                                 href={`/blog-post-1/${item.id}`}
                                className="tag text-label text text_primary-color text-uppercase"
                            >
                                {item.category}
                            </Link>
                            <Link
                                href={`/blog-post-1/${item.id}`}
                                aria-label={`Lire : ${item.title}`} className="overlay-link"
                            ></Link>
                        </div>
                        <div className="article-content">
                            <h5 className="title mb_12">
                                <Link  href={`/blog-post-1/${item.id}`} className="link">
                                    {item.title}
                                </Link>
                            </h5>
                            <p className="description">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {hasMoreItems && (
                <button
                    type="button"
                    className="tf-btn btn-bg-1 btn-px-28 mx-auto"
                    id="loadMoreGridBtn"
                    onClick={handleLoadMore}
                >
                    <span>Voir plus</span>
                    <span className="bg-effect"></span>
                </button>
            )}
        </div>
    );
}
