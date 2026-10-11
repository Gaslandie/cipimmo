"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { cipRentals, rentalPrice, rentalLocation } from "@/data/cipRentals";
import Image from "next/image";
import Link from "next/link";

export default function Properties() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div className="section-features-property-4 tf-spacing-1 pt-0 home-rentals">
            <div className="tf-container">
                <div className="heading-section justify-content-center text-center mb_46">
                    <span className="sub text-uppercase fw-6 text_secondary-color-2">
                        Nos locations
                    </span>
                    <h3>
                        Découvrez nos logements
                    </h3>
                </div>
                {isMobile ? (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={15}
                        slidesPerView={1}
                        pagination={{ clickable: true, el: ".sw-dots" }}
                        className="tf-sw-mobile bg_1"
                    >
                        {cipRentals.map((property, idx) => (
                            <SwiperSlide key={idx}>
                                <div
                                    key={property.slug}
                                    className="card-house style-default hover-image"
                                    data-id={property.slug}
                                >
                                    <div className="img-style mb_20">
                                        <Image
                                            src={property.imgSrc}
                                            width={410}
                                            height={308}
                                            alt={property.imageAlt}
                                        />
                                        <div className="wrap-tag d-flex gap_8 mb_12">
                                            <div
                                                className="tag rent text-button-small fw-6 text_primary-color"
                                            >
                                                {property.duration}
                                            </div>
                                            <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                {property.category}
                                            </div>
                                        </div>
                                        <Link
                                            href={`/logements/${property.slug}`}
                                            className="overlay-link"
                                            aria-label={`Voir le logement : ${property.title}`}
                                        ></Link>
                                    </div>
                                    <div className="content">
                                        <h4
                                            className="price mb_12"
                                            suppressHydrationWarning
                                        >
                                            {rentalPrice(property)}
                                            {property.price !== null && <span className="text_secondary-color text-body-default">
                                                / {property.period}
                                            </span>}
                                        </h4>
                                        <Link
                                            href={`/logements/${property.slug}`}
                                            className="title mb_8 h5 link text_primary-color"
                                        >
                                            {property.title}
                                        </Link>
                                        <p>{rentalLocation(property)}, Guinée</p>
                                        <ul className="info d-flex">
                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                <i className="icon-Bed"></i>
                                                {property.beds} ch.
                                            </li>
                                            <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                <i className="icon-HouseLine"></i>
                                                {property.furnished || "Salon"}
                                            </li>
                                            <li
                                                className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                                suppressHydrationWarning
                                            >
                                                <i className="icon-Ruler"></i>
                                                {property.area} m²
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="sw-dots style-1 sw-pagination-mb mt_24 justify-content-center d-flex d-md-none"></div>
                    </Swiper>
                ) : (
                    <div className="tf-sw-mobile bg_1">
                        <div className="tf-grid-layout-md lg-col-3 md-col-2">
                            {cipRentals.map((property, idx) => (
                                <div className="swiper-slide" key={idx}>
                                    <div
                                        key={property.slug}
                                        className="card-house style-default hover-image"
                                        data-id={property.slug}
                                    >
                                        <div className="img-style mb_20">
                                            <Image
                                                src={property.imgSrc}
                                                width={410}
                                                height={308}
                                                alt={property.imageAlt}
                                            />
                                            <div className="wrap-tag d-flex gap_8 mb_12">
                                                <div
                                                    className="tag rent text-button-small fw-6 text_primary-color"
                                                >
                                                    {property.duration}
                                                </div>
                                                <div className="tag categoreis text-button-small fw-6 text_primary-color">
                                                    {property.category}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/logements/${property.slug}`}
                                                className="overlay-link"
                                                aria-label={`Voir le logement : ${property.title}`}
                                            ></Link>
                                        </div>
                                        <div className="content">
                                            <h4
                                                className="price mb_12"
                                                suppressHydrationWarning
                                            >
                                                {rentalPrice(property)}
                                                {property.price !== null && <span className="text_secondary-color text-body-default">
                                                    / {property.period}
                                                </span>}
                                            </h4>
                                            <Link
                                                href={`/logements/${property.slug}`}
                                                className="title mb_8 h5 link text_primary-color"
                                            >
                                                {property.title}
                                            </Link>
                                            <p>{rentalLocation(property)}, Guinée</p>
                                            <ul className="info d-flex">
                                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                    <i className="icon-Bed"></i>
                                                    {property.beds} ch.
                                                </li>
                                                <li className="d-flex align-items-center gap_8 text-title text_primary-color fw-6">
                                                    <i className="icon-HouseLine"></i>
                                                    {property.furnished || "Salon"}
                                                </li>
                                                <li
                                                    className="d-flex align-items-center gap_8 text-title text_primary-color fw-6 "
                                                    suppressHydrationWarning
                                                >
                                                    <i className="icon-Ruler"></i>
                                                    {property.area} m²
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <Link
                    href={'/listing-left-sidebar'}
                    className="tf-btn btn-bg-1 mx-auto btn-px-32 scrolling-effect effectBottom"
                >
                    <span>Voir tous les logements</span>
                    <span className="bg-effect"></span>
                </Link>
            </div>
        </div>
    );
}
