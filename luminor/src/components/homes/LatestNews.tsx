"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import Image from "next/image";
import { latestNews } from "@/data/blog";
import Link from "next/link";

const guides = [
    { ...latestNews[0], title: "Comment louer un logement", href: "/comment-louer" },
    { ...latestNews[1], title: "Vos questions avant de louer", href: "/FAQs" },
    { ...latestNews[2], title: "Comparer les logements", href: "/listing-left-sidebar" },
];

export default function LatestNews() {
    return (
        <div className="sw-layout tf-spacing-1">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_48">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2 split-text effect-rotate">
                        Nos conseils
                    </span>
                    <h3 className="split-text effect-blur-fade">
                        Bien louer avec CIP IMMO
                    </h3>
                </div>
                <Swiper
                    className="mySwiper"
                    data-wow-delay=".2s"
                    spaceBetween={15}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination, A11y]}
                    a11y={{ paginationBulletMessage: "Afficher le conseil {{index}}" }}
                    pagination={{ clickable: true, el: ".spb7" }}
                >
                    {guides.map((item, ind) => (
                        <SwiperSlide className="swiper-slide" key={ind}>
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
                                        href={item.href}
                                        className="tag text-label text text_primary-color text-uppercase"
                                    >
                                        {item.category}
                                    </Link>
                                    <Link
                                        href={item.href}
                                        className="overlay-link"
                                        aria-label={item.title}
                                    ></Link>
                                </div>
                                <div className="article-content">
                                    <h5 className="title mb_12">
                                        <Link
                                            href={item.href}
                                            className="hover-line-text"
                                        >
                                            {item.title}
                                        </Link>
                                    </h5>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                    <div className="sw-pagination spb7 sw-dots style-1 text-center mt_24" />
                </Swiper>
            </div>
        </div>
    );
}
