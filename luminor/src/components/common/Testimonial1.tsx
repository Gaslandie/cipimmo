"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AutoRepeatMarquee from "./AutoRepeatMarquee";
import Image from "next/image";

export default function Testimonial1({ cip = true }: { cip?: boolean }) {
    const testimonial = [
        {
            id: 1,
            rating: 5,
            text: "« Une équipe disponible pour nous aider à trouver un appartement adapté à notre budget. »",
            avatar: "/assets/images/avatar/avatar-4.jpg?v=cip-photos-1",
            name: "Ibrahima Soumah",
            position: "Locataire à Ansoumaniah",
        },
        {
            id: 2,
            rating: 5,
            text: "« Les informations sur les logements sont claires. Nous avons pu préparer notre séjour avec CIP IMMO. »",
            avatar: "/assets/images/avatar/avatar-5.jpg?v=cip-photos-1",
            name: "Mamadou Camara",
            position: "Locataire à Coyah",
        },
        {
            id: 3,
            rating: 5,
            text: "« Nous avons trouvé un appartement pour notre famille avec un accompagnement à chaque étape. »",
            avatar: "/assets/images/avatar/avatar-6.jpg?v=cip-photos-1",
            name: "Ibrahima Soumah",
            position: "Locataire à Ansoumaniah",
        },
        {
            id: 4,
            rating: 5,
            text: "« Des échanges simples et un accueil attentif pour notre installation en Guinée. »",
            avatar: "/assets/images/avatar/avatar-7.jpg?v=cip-photos-1",
            name: "Ibrahima Soumah",
            position: "Locataire à Ansoumaniah",
        },
    ];

    // Contenu de présentation de la maquette CIP ; les visuels et le carrousel restent identiques.
    const cipFeedback = [
        { text: "« Pour mon séjour à Conakry, j’ai trouvé un appartement à Coléah adapté à mes besoins. Les échanges avec CIP IMMO ont été simples et l’équipe a répondu à mes questions. »", name: "Aïssatou Diallo", position: "Court séjour · Coléah" },
        { text: "« Nous cherchions un logement pour nous installer en famille. CIP IMMO nous a accompagnés dans notre choix à Ansoumaniah et a pris le temps de nous expliquer les conditions. »", name: "Mamadou Camara", position: "Longue durée · Ansoumaniah" },
        { text: "« Les photos, la surface et le nombre de chambres m’ont permis de préparer ma recherche. Un échange avec l’équipe a ensuite suffi pour avancer sur ma location à Coyah. »", name: "Fatoumata Bah", position: "Longue durée · Coyah Km54" },
        { text: "« Une équipe à l’écoute, qui nous a orientés selon notre budget et le quartier souhaité. Nous avons apprécié cet accompagnement pour notre installation. »", name: "Ibrahima Soumah", position: "Longue durée · Ansoumaniah" },
    ];
    const displayedTestimonials = cip
        ? testimonial.map((item, index) => ({ ...item, ...cipFeedback[index] }))
        : testimonial;

    const brands = [
        { src: "/assets/images/logo/brand-1.png?v=cip-photos-1", alt: "CIP IMMO" },
        { src: "/assets/images/logo/brand-2.png?v=cip-photos-1", alt: "CIP IMMO" },
        { src: "/assets/images/logo/brand-3.png?v=cip-photos-1", alt: "CIP IMMO" },
        { src: "/assets/images/logo/brand-4.png?v=cip-photos-1", alt: "CIP IMMO" },
        { src: "/assets/images/logo/brand-5.png?v=cip-photos-1", alt: "CIP IMMO" },
        { src: "/assets/images/logo/brand-6.png?v=cip-photos-1", alt: "CIP IMMO" },
    ];

    return (
        <>
            <div className="heading-section justify-content-center text-center mb_40">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">
                    {cip ? "Vos témoignages" : "Vos témoignages"}
                </span>
                <h3 className="split-text effect-blur-fade">{cip ? "Ils ont trouvé leur logement avec nous" : "Ils ont trouvé leur logement avec nous"}</h3>
            </div>
            <div className="tf-container">
                <Swiper
                    className="swiper tf-sw-location"
                    slidesPerView={3}
                    spaceBetween={10}
                    breakpoints={{
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    pagination={{
                        clickable: true,
                        el: ".sw-pagination-layout",
                    }}
                >
                    {displayedTestimonials.map((tes) => (
                        <SwiperSlide key={tes.id}>
                            <div className="testimonial-item">
                                <div>
                                    <ul className="ratings d-flex mb_12">
                                        {[...Array(tes.rating)].map((_, i) => (
                                            <li key={i}>
                                                <i className="icon-favorite_major"></i>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text_primary-color text-body-1 mb_23">
                                        {tes.text}
                                    </p>
                                </div>
                                <div className="author d-flex gap_12 align-items-center">
                                    <div className="avatar">
                                        <Image
                                            src={tes.avatar}
                                            width={60}
                                            height={60}
                                            alt={cip ? `Témoignage de ${tes.name}` : "CIP IMMO"}
                                        />
                                    </div>
                                    <div className="info">
                                        <a
                                            href="#"
                                            className="h6 text_primary-color name link mb_4"
                                        >
                                            {tes.name}
                                        </a>
                                        <p>{tes.position}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="sw-dots style-1 sw-pagination-layout justify-content-center d-flex mt_24"></div>
            </div>
            <div className="wrap-infiniteslide">
                <AutoRepeatMarquee  speed={50} pauseOnHover>
                    {brands.map((brand, idx) => (
                        <div className="marquee-item" key={idx}>
                            <div className="brand">
                                <img src={brand.src} alt={cip ? "CIP IMMO" : brand.alt} />
                            </div>
                        </div>
                    ))}
                </AutoRepeatMarquee>
            </div>
        </>
    );
}
