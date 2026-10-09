"use client";
import React from "react";
import { SwiperClass, Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Controller } from "swiper/modules";
import Image from "next/image";

type Testimonial = {
    name: string;
    title: string;
    text: string;
    image: string;
    rating: number;
};

const testimonials: Testimonial[] = [
    {
        name: "Mamadou Camara",
        title: "Locataire à Coyah",
        text: "« CIP IMMO nous a accompagnés pour trouver notre appartement à Coyah. Nous avons apprécié les réponses à nos questions et les explications sur les conditions de location. »",
        image: "/assets/images/section/testimonial-1.jpg?v=cip-photos-1",
        rating: 5,
    },
    {
        name: "Aïssatou Diallo",
        title: "Locataire à Coléah",
        text: "« Pour mon séjour à Conakry, les photos et les caractéristiques m’ont aidée à faire mon choix. L’équipe a ensuite préparé mon arrivée avec moi. »",
        image: "/assets/images/section/testimonial-2.jpg?v=cip-photos-1",
        rating: 5,
    },
    {
        name: "Fatoumata Bah",
        title: "Locataire à Ansoumaniah",
        text: "« Nous cherchions trois chambres pour notre famille. CIP IMMO nous a orientés vers Ansoumaniah et a pris le temps de comprendre nos besoins. »",
        image: "/assets/images/section/testimonial-1.jpg?v=cip-photos-1",
        rating: 5,
    },
];

export default function Testimonials() {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(
        null
    );
    const [mainSwiper, setMainSwiper] = React.useState<SwiperClass | null>(
        null
    );

    return (
        <div className="section-testimonials">
            <div className="tf-container">
                <div className="testimonial-item style-1 flat-thumbs-tes">
                    <div className="row">
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Thumbs, Pagination, Controller]}
                                onSwiper={setThumbsSwiper}
                                controller={{ control: mainSwiper }}
                                pagination={{
                                    el: ".sw-pagination-tes",
                                    clickable: true,
                                }}
                                spaceBetween={10}
                                className="tf-thumb-tes"
                            >
                                {testimonials.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="content">
                                            <div className="heading mb_28">
                                                <span className="sub text-label text_secondary-color-2 text-uppercase">
                                                    Vos témoignages
                                                </span>
                                                <a
                                                    href="#"
                                                    className="h3 link text_primary-color"
                                                >
                                                    {testimonial.name}
                                                </a>
                                                <p>{testimonial.title}</p>
                                            </div>
                                            <ul className="ratings d-flex mb_28">
                                                {Array.from({
                                                    length: testimonial.rating,
                                                }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="icon-favorite_major"></i>
                                                    </li>
                                                ))}
                                            </ul>
                                            <p className="desc text_primary-color fw-5 h5">
                                                {testimonial.text}
                                            </p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="col-lg-6">
                            <Swiper
                                modules={[Navigation, Thumbs, Controller]}
                                onSwiper={setMainSwiper}
                                controller={{ control: thumbsSwiper }}
                                navigation={{
                                    nextEl: ".nav-next-tes",
                                    prevEl: ".nav-prev-tes",
                                }}
                                spaceBetween={10}
                                className="tf-tes-main"
                            >
                                {testimonials.map((testimonial, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="img-style">
                                            <Image
                                                src={testimonial.image}
                                                width={548}
                                                height={411}
                                                alt="Témoignage"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="sw-button style-border nav-prev-tes xl-hide">
                            <i className="icon-CaretLeft"></i>
                        </div>
                        <div className="sw-button style-border nav-next-tes xl-hide">
                            <i className="icon-CaretRight"></i>
                        </div>
                    </div>
                    <div className=" sw-dots style-1 sw-pagination-tes justify-content-center mt_24"></div>
                </div>
            </div>
        </div>
    );
}
