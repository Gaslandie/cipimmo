"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import { cipRentals } from "@/data/cipRentals";
import RentalCard from "@/components/common/RentalCard";
import Link from "next/link";

export default function Properties() {
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        const media = window.matchMedia("(max-width: 767px)");
        const update = () => setMobile(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return <section className="section-features-property-4 tf-spacing-1 pt-0 home-rentals" aria-labelledby="home-rentals-title">
        <div className="tf-container">
            <div className="heading-section justify-content-center text-center mb_46">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">Nos locations</span>
                <h2 id="home-rentals-title" className="h3">Découvrez nos logements</h2>
            </div>
            {mobile ? <div className="rental-carousel">
                <p className="mb_16">Faites défiler les logements ou utilisez les flèches.</p>
                <Swiper modules={[A11y, Navigation]} spaceBetween={20} slidesPerView={1}
                    navigation={{ prevEl: ".rental-slide-prev", nextEl: ".rental-slide-next" }}
                    a11y={{ prevSlideMessage: "Logement précédent", nextSlideMessage: "Logement suivant", firstSlideMessage: "Premier logement", lastSlideMessage: "Dernier logement", slideLabelMessage: "Logement {{index}} sur {{slidesLength}}" }}>
                    {cipRentals.map(rental => <SwiperSlide key={rental.slug}><RentalCard rental={rental} headingLevel={3} /></SwiperSlide>)}
                </Swiper>
                <div className="rental-carousel-controls">
                    <button type="button" className="rental-slide-prev tf-btn" aria-label="Logement précédent"><span aria-hidden="true">←</span> Précédent</button>
                    <button type="button" className="rental-slide-next tf-btn" aria-label="Logement suivant">Suivant <span aria-hidden="true">→</span></button>
                </div>
            </div> : <div className="tf-grid-layout-md lg-col-3 md-col-2 rental-card-grid">
                {cipRentals.map(rental => <RentalCard key={rental.slug} rental={rental} headingLevel={3} />)}
            </div>}
            <Link href="/listing-left-sidebar" className="tf-btn btn-bg-1 mx-auto btn-px-32 mt_30"><span>Voir tous les logements</span></Link>
        </div>
    </section>;
}
