"use client";
import React from "react";
import { recentPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import OfferRequest from "@/components/common/OfferRequest";


export default function SideBar() {
    type Tag = {
        id: number;
        name: string;
    };

    const tags: Tag[] = [
        {
            id: 1,
            name: "Logement",
        },
        {
            id: 2,
            name: "Budget location",
        },
        {
            id: 3,
            name: "Court séjour",
        },
        {
            id: 4,
            name: "Quartiers",
        },
        {
            id: 5,
            name: "Installation",
        },
        {
            id: 6,
            name: "Séjour professionnel",
        },
        {
            id: 7,
            name: "Location",
        },
        {
            id: 8,
            name: "Confort",
        },
        {
            id: 9,
            name: "Conseils",
        },
    ];

    return (
        <div className="tf-sidebar">
            <div className="sidebar-item sidebar-search ">
                <h5 className="sidebar-title mb_14">Rechercher</h5>
                <form className="form-search" action={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/blog-grid/`} method="get">
                    <fieldset>
                        <input
                            className=""
                            type="text"
                            placeholder="Rechercher…"
                            name="search" maxLength={200} aria-label="Rechercher un conseil"

                            defaultValue=""
                            aria-required="true"
                            required
                        />
                    </fieldset>
                    <div className="button-submit">
                        <button className="" type="submit" aria-label="Rechercher les conseils">
                            <i className="icon-MagnifyingGlass"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="sidebar-item sidebar-recent-post">
                <h5 className="sidebar-title mb_17">À lire aussi</h5>
                <ul>
                    {recentPost.map((post) => (
                        <li
                            className="recent-post hover-image-rotate"
                            key={post.id}
                        >
                            <Link
                                href={`/blog-post-1/${post.id}`}
                                className="img-style"
                            >
                                <Image
                                    src={post.imgSrc}
                                    width={100}
                                    height={100}
                                    alt={post.alt}
                                />
                            </Link>
                            <div className="content">
                                <div className="text-title title text_primary-color fw-6">
                                    <Link
                                        href={`/blog-post-1/${post.id}`}
                                        className="link line-clamp-2"
                                    >
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-item">
                <h5 className="sidebar-title mb_15">Recevoir nos offres</h5>
                <OfferRequest />
            </div>
            <div className="sidebar-item sidebar-tags ">
                <h5 className="sidebar-title mb_15">Thèmes</h5>
                <ul className="tags-list">
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/blog-grid/?search=${encodeURIComponent(tag.name)}`} className="tags-item text-caption-1">
                                {tag.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
