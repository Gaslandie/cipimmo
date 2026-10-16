"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Agent = {
  id: number;
  name: string;
  img: string;
  socials: { icon: string; href: string }[];
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Accueil et conseil CIP IMMO",
    img: "/assets/images/section/agent-1.jpg?v=cip-photos-1",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 2,
    name: "Accompagnement locatif CIP IMMO",
    img: "/assets/images/section/agent-2.jpg?v=cip-photos-1",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 3,
    name: "Accueil et conseil CIP IMMO",
    img: "/assets/images/section/agent-1.jpg?v=cip-photos-1",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
  {
    id: 4,
    name: "Accompagnement locatif CIP IMMO",
    img: "/assets/images/section/agent-2.jpg?v=cip-photos-1",
    socials: [
      { icon: "icon-FacebookLogo", href: "#" },
      { icon: "icon-XLogo", href: "#" },
      { icon: "icon-InstagramLogo", href: "#" },
      { icon: "icon-YoutubeLogo", href: "#" },
    ],
  },
];

export default function Agents() {
  return (
    <div className="tf-container ">
      <div className="row align-items-center">
        <div className="col-lg-4">
          <div className="box">
            <div className="heading-section mb_32">
              <span className="sub text-uppercase fw-6 text_secondary-color-2">
                Notre équipe
              </span>
              <h3>L’équipe CIP IMMO</h3>
            </div>
            <div className="content mb_32">
              <h6 className="mb_12">
                À vos côtés, du premier échange à votre arrivée
              </h6>
              <p className="text-body-2">
                Une question sur un quartier, un tarif ou les conditions de
                location ? Notre équipe basée à Nongo Kiroti, à Conakry, vous écoute et vous
                accompagne pour votre court séjour ou votre installation.
              </p>
            </div>
            <a href="/contacts" className="tf-btn btn-bg-1 btn-px-24">
              <span>Contacter notre équipe</span>
              <span className="bg-effect"></span>
            </a>
          </div>
        </div>
        <div className="col-lg-7 offset-xl-1 sw-layout">
          <Swiper
            className="swiper"
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={20}
            navigation={{
              prevEl: ".nav-prev-layout",
              nextEl: ".nav-next-layout",
            }}
            breakpoints={{
              1200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
            }}
          >
            {agents.map((agent) => (
              <SwiperSlide key={agent.id}>
                <div className="agent-item">
                  <a href="/contacts" className="img-style">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={agent.img}
                      width={360}
                      height={360}
                      alt={agent.name}
                    />
                  </a>
                  <ul className="social">
                    {agent.socials.map((social, idx) => (
                      <li key={idx}>
                        <a className={social.icon} role="link" aria-disabled="true" aria-label={`${social.icon.replace("icon-", "").replace("Logo", "")} CIP IMMO`}></a>
                      </li>
                    ))}
                  </ul>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-button nav-prev-layout">
              <i className="icon-CaretLeft"></i>
            </div>
            <div className="sw-button nav-next-layout">
              <i className="icon-CaretRight"></i>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
