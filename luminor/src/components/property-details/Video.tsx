"use client";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import ModalVideo from "../common/ModalVideo";

type Property = {
    id: number;
    imgSrc: string;
};

export default function Video({ property }: { property: Property }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleVideoClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    return (
        <>
            <h5 className="properties-title mb_20">Découvrir le logement</h5>
            <div className="widget-video" style={{ position: "relative" }}>
                <Image
                    data-src={property.imgSrc}
                    src={property.imgSrc}
                    alt="Intérieur du logement"
                    width={850}
                    height={400}
                />

                <div
                    onClick={handleVideoClick}
                    data-fancybox="gallery2"
                    className="btn-video popup-youtube"
                    aria-label="Découvrir le logement"
                >
                    <img src="/assets/icons/play.svg" alt="Lire la vidéo" />
                </div>
            </div>
            <ModalVideo
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                videoId={"XHOmBV4js_E"}
            />
        </>
    );
}
