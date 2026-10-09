"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPostsGrid } from "@/data/blog";

export default function BlogGrid() {
    const [displayedItems, setDisplayedItems] = useState(9); 
    const [search, setSearch] = useState("");
    useEffect(() => { setSearch((new URLSearchParams(window.location.search).get("search") || "").slice(0, 200)); }, []);
    const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
    const results = blogPostsGrid.filter((item) => normalize(`${item.title} ${item.description} ${item.category}`).includes(normalize(search)));
    const itemsPerLoad = 3; 

    const handleLoadMore = () => {
        setDisplayedItems((prev) => prev + itemsPerLoad);
    };

    const currentItems = results.slice(0, displayedItems);
    const hasMoreItems = displayedItems < results.length;

    return (
        <div className="tf-container tf-spacing-1 blog-grid">
            {search && <p className="mb_24">{results.length} conseil{results.length > 1 ? "s" : ""} pour « {search} ». <button type="button" onClick={() => setSearch("")}>Voir tous les conseils</button></p>}
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
                                className="overlay-link"
                            ></Link>
                        </div>
                        <div className="article-content">
                            <div className="meta-post d-flex align-items-center mb_12">
                                <div className="item text_secondary-color text-caption-1">
                                    Par{" "}
                                    <Link
                                        href="#"
                                        className="link text_primary-color"
                                    >
                                        {item.author}
                                    </Link>
                                </div>
                                <div className="item text_secondary-color text-caption-1">
                                    {item.date}
                                </div>
                            </div>
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
