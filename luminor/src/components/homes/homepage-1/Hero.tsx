"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import SidebarFilterDefault from "@/components/common/SidebarFilterDefault";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="page-title style-1 sw-layout home-search-hero">
            <div className="tf-container w-1830">
                <div className="content">
                    <h1 className="title">
                        Trouvez votre <br className="d-none d-md-block" /> logement en Guinée
                    </h1>
                    <div className="d-none d-md-block">
                        <p className="h6 text_secondary-color mb_12 split-text split-lines-transform">
                            Pour un court séjour ou une location longue durée,
                            découvrez nos appartements en Guinée.
                        </p>
                        <p className="h6 text_secondary-color mb_24 split-text split-lines-transform">
                            Meublé ou non meublé, choisissez le logement qui vous
                            convient. CIP IMMO vous accompagne à chaque étape.
                        </p>
                        <Link
                            href={"/listing-left-sidebar"}
                            className="tf-btn btn-px-32 btn-bg-1"
                        >
                            <span>Voir nos logements</span>
                            <span className="bg-effect"></span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="thumbs effect-content-slide">
                <Swiper
                    modules={[Navigation, A11y]}
                    a11y={{ prevSlideMessage: "Photo précédente", nextSlideMessage: "Photo suivante", slideLabelMessage: "Photo {{index}} sur {{slidesLength}}" }}
                    navigation={{
                        nextEl: ".nav-next-layout",
                        prevEl: ".nav-prev-layout",
                    }}
                    spaceBetween={10}
                    loop={true}
                    className="swiper"
                >
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/assets/images/page-title/page-title-2.jpg?v=cip-photos-1"
                                width={1920}
                                height={680}
                                alt="CIP IMMO"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide-inner effect-img-zoom ">
                            <Image
                                className="img-zoom"
                                src="/assets/images/page-title/page-title-3.jpg?v=cip-photos-1"
                                width={1920}
                                height={680}
                                alt="CIP IMMO"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                    <button type="button" className="sw-button nav-prev-layout d-none d-md-flex" aria-label="Photo précédente">
                        <i className="icon-CaretLeft" aria-hidden="true"></i>
                    </button>
                    <button type="button" className="sw-button nav-next-layout d-none d-md-flex" aria-label="Photo suivante">
                        <i className="icon-CaretRight" aria-hidden="true"></i>
                    </button>
                </Swiper>
            </div>

            <SidebarFilterDefault />
        </div>
    );
}
