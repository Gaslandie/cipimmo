import React from "react";
import Image from "next/image";
import Link from "next/link";
import FormComments from "../common/FormComments";
import NewsInsight from "./NewsInsight";
import Comment from "../common/Comment";

type BlogItem = {
    imgSrc: string;
    alt: string;
    date: string;
    author: string;
    authorAvatar: string;
    authorDesc: string;
    authorName: string;
    authorFlow: number;
    category: string;
    title: string;
    description: string;
};

export default function BlogPost2({ blogItem }: { blogItem: BlogItem }) {
    return (
        <>
            <div className="thumbs-main-post">
                <div className="thumbs">
                    <Image
                        src={blogItem.imgSrc}
                        width={1920}
                        height={800}
                        alt=""
                    />
                </div>
            </div>
            <div className="main-content">
                <div className="blog-post style-2">
                    <div className="tf-container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="content-inner">
                                    <div className="details-post">
                                        <div className="heading-title mb_24 text-center">
                                            <div className="tag-heading text-button-small mx-auto text_primary-color">
                                                {blogItem.category}
                                            </div>
                                            <h3>{blogItem.title}</h3>
                                            <div className="meta-post d-flex justify-content-center align-items-center mb_16">
                                                <div className="item author">
                                                    <div className="avatar">
                                                        <Image
                                                            src={
                                                                blogItem.authorAvatar
                                                            }
                                                            width={40}
                                                            height={40}
                                                            alt="CIP IMMO"
                                                        />
                                                    </div>
                                                    <Link
                                                        href="#"
                                                        className="link text_primary-color fw-6 text-title "
                                                    >
                                                        {blogItem.authorName}
                                                    </Link>
                                                </div>
                                                <div className="item text_primary-color text-title fw-6 d-flex align-items-center gap_8 ">
                                                    <i className="icon-CalendarBlank"></i>{" "}
                                                    {blogItem.date}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="passive text-body-2">
                                            Trouver un logement en Guinée commence par quelques choix simples : le quartier, la durée du séjour, le nombre de chambres et le budget. Prenez le temps de comparer ces critères pour retenir les appartements qui correspondent à votre quotidien.
                                        </p>
                                        <div className="quote">
                                            <p className="h5 mb_11">
                                                « Le bon logement est celui qui répond à vos besoins, à votre rythme et à votre budget. »
                                            </p>
                                            <Link
                                                href="#"
                                                className="text-title fw-6 text_primary-color link name"
                                            >
                                                L’équipe CIP IMMO
                                            </Link>
                                            <div className="icon">
                                                <i className="icon-quote-line"></i>
                                            </div>
                                        </div>
                                        <p className="passive text-body-2">
                                            Les photos et les caractéristiques vous donnent un premier aperçu. Échangez ensuite avec CIP IMMO pour connaître les disponibilités, le tarif applicable à vos dates et les conditions de location. Vous pourrez ainsi préparer votre arrivée avec les bonnes informations.
                                        </p>
                                        <div className="wrap-image tf-grid-layout sm-col-2">
                                            <Image
                                                src="/assets/images/blog/thumbs-1.jpg?v=cip-photos-1"
                                                width={410}
                                                height={308}
                                                alt="Appartement"
                                            />
                                            <Image
                                                src="/assets/images/blog/thumbs-2.jpg?v=cip-photos-1"
                                                width={410}
                                                height={308}
                                                alt="Appartement"
                                            />
                                        </div>
                                        <div className="passive mb_27">
                                            <h5 className="mb_12">
                                                1. Choisissez votre quartier et votre durée
                                            </h5>
                                            <p className="text-body-2">
                                                Pour un déplacement ou une installation, pensez à la distance avec vos activités, aux transports et aux services du quartier. Coléah, Coyah Km54 et Ansoumaniah offrent différents points de départ pour votre recherche.
                                            </p>
                                        </div>
                                        <div className="passive mb_40">
                                            <h5 className="mb_12">
                                                2. Préparez votre budget et vos questions
                                            </h5>
                                            <p className="text-body-2">
                                                Distinguez bien un tarif à la nuit d’un loyer mensuel. Demandez ce que le prix comprend, les charges éventuelles et les modalités à prévoir pour votre entrée dans le logement.
                                            </p>
                                        </div>
                                        <div className="passive">
                                            <h5 className="mb_12">
                                                À retenir
                                            </h5>
                                            <p className="text-body-2">
                                                Votre recherche sera plus simple avec des critères précis : quartier, budget, durée et nombre de chambres. Notre équipe vous aide ensuite à vérifier les disponibilités et à préparer la suite.
                                            </p>
                                        </div>
                                        <div className="tag-share d-flex justify-content-between">
                                            <div className="tag d-flex align-items-center gap_12">
                                                <span className="text-button fw-7 text_primary-color">
                                                    Thèmes :
                                                </span>
                                                <ul className="tags-list">
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="tags-item text-caption-1"
                                                        >
                                                            Logement
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="tags-item text-caption-1"
                                                        >
                                                            Installation
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="tags-item text-caption-1"
                                                        >
                                                            Location
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="share d-flex align-items-center gap_16">
                                                <span className="text-button fw-7 text_primary-color">
                                                    Partager ce conseil :
                                                </span>
                                                <ul className="tf-social d-flex gap_24">
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-FacebookLogo"
                                                        ></Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-XLogo"
                                                        ></Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-InstagramLogo"
                                                        ></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tf-article-navigation">
                                            <div className="item prev">
                                                <Link
                                                    href="single-post-1.html"
                                                    className="hover-underline-link text-button text_primary-color fw-7 mb_8"
                                                >
                                                    Précédent
                                                </Link>
                                                <h5>
                                                    <Link
                                                        href="#"
                                                        className="link line-clamp-2"
                                                    >
                                                        Bien choisir son quartier en Guinée
                                                    </Link>
                                                </h5>
                                            </div>
                                            <div className="item next">
                                                <Link
                                                    href="single-post-1.html"
                                                    className="hover-underline-link text-button text_primary-color fw-7 mb_8"
                                                >
                                                    Suivant
                                                </Link>
                                                <h5>
                                                    <Link
                                                        href="#"
                                                        className="link line-clamp-2"
                                                    >
                                                        Préparer son installation en famille
                                                    </Link>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-writter">
                                        <div className="box-author mb_20">
                                            <div className="avatar">
                                                <Image
                                                    src={blogItem.authorAvatar}
                                                    width={120}
                                                    height={120}
                                                    alt="CIP IMMO"
                                                />
                                            </div>
                                            <div className="content">
                                                <div className="info">
                                                    <div className="mb_20">
                                                        <h5 className="mb_4">
                                                            {
                                                                blogItem.authorName
                                                            }
                                                        </h5>
                                                        <p>
                                                            {
                                                                blogItem.authorFlow
                                                            }{" "}
                                                            Lecteurs
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href="#"
                                                        className="tf-btn btn-bg-1 btn-px-12"
                                                    >
                                                        <span className="text-button-small">
                                                            Nous contacter
                                                        </span>
                                                        <span className="bg-effect"></span>
                                                    </Link>
                                                </div>
                                                <ul className="tf-social d-flex gap_24">
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-FacebookLogo"
                                                        ></Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-XLogo"
                                                        ></Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="#"
                                                            className="icon-InstagramLogo"
                                                        ></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <p>{blogItem.authorDesc}</p>
                                    </div>
                                    <div className="mb_40">
                                        <Comment />
                                    </div>
                                    <FormComments />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NewsInsight />
            </div>
        </>
    );
}
