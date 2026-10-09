import React from "react";
import { recentPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { subscribeNewsletter } from "@/actions/newsletterAction";


export default function SideBar() {
    type Category = {
        id: number;
        name: string;
        count: number;
    };
    type Tag = {
        id: number;
        name: string;
    };
    const categories: Category[] = [
        {
            id: 1,
            name: "Vie en Guinée",
            count: 22,
        },
        {
            id: 2,
            name: "Préparer son installation",
            count: 15,
        },
        {
            id: 3,
            name: "Choisir son logement",
            count: 16,
        },
        {
            id: 4,
            name: "Louer simplement",
            count: 8,
        },
        {
            id: 5,
            name: "Séjour professionnel",
            count: 19,
        },
        {
            id: 6,
            name: "Bien chez soi",
            count: 21,
        },
    ];

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
                <form  className="form-search">
                    <fieldset>
                        <input
                            className=""
                            type="text"
                            placeholder="Rechercher…"
                            name="text"
                            tabIndex={2}
                            defaultValue=""
                            aria-required="true"
                            required
                        />
                    </fieldset>
                    <div className="button-submit">
                        <button className="" type="submit">
                            <i className="icon-MagnifyingGlass"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="sidebar-item sidebar-categories ">
                <h5 className="sidebar-title mb_17">Catégories</h5>
                <ul className="list-categories d-grid gap_8">
                    {categories.map((category) => (
                        <li
                            className="d-flex align-items-center justify-content-between text-body-default "
                            key={category.id}
                        >
                            <Link href="#" className="hover-line-text">
                                {category.name}
                            </Link>
                            <div className="number">({category.count})</div>
                        </li>
                    ))}
                </ul>
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
                                <div className="meta-post d-flex align-items-center mb_7">
                                    <div className="item text_secondary-color text-caption-2 ">
                                        <Link
                                            href="#"
                                            className="link text_primary-color"
                                        >
                                            {post.author}
                                        </Link>
                                    </div>
                                    <div className="item text_secondary-color text-caption-2 ">
                                        {post.date}
                                    </div>
                                </div>
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
                <form action={subscribeNewsletter} className="form-newsletter">
                    <fieldset>
                        <input
                            className=""
                            type="text"
                            placeholder="Votre adresse e-mail"
                            name="text"
                            tabIndex={2}
                            defaultValue=""
                            aria-required="true"
                            required
                        />
                    </fieldset>
                    <div className="button-submit">
                        <button className="" type="submit">
                            <i className="icon-PaperPlaneTilt"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div className="sidebar-item sidebar-tags ">
                <h5 className="sidebar-title mb_15">Thèmes</h5>
                <ul className="tags-list">
                    {tags.map((tag) => (
                        <li key={tag.id}>
                            <Link href="#" className="tags-item text-caption-1">
                                {tag.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
