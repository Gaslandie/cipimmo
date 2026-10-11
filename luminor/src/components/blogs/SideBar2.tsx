import React from "react";
import { recentPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";
import { subscribeNewsletter } from "@/actions/newsletterAction";

export default function SideBar2() {
    type Tag = {
        id: number;
        name: string;
    };
    const tags: Tag[] = [
        { id: 1, name: "Logement" },
        { id: 2, name: "Budget location" },
        { id: 3, name: "Court séjour" },
        { id: 4, name: "Quartiers" },
        { id: 5, name: "Installation" },
        { id: 6, name: "Séjour professionnel" },
        { id: 7, name: "Location" },
        { id: 8, name: "Confort" },
        { id: 9, name: "Conseils" },
    ];
    return (
        <div className="tf-sidebar">
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
