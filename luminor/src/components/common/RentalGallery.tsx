"use client";

import Image from "next/image";
import { useState } from "react";
import { rentalPhotos, type Rental } from "@/data/cipRentals";

export default function RentalGallery({ rental }: { rental: Rental }) {
    const photos = rentalPhotos(rental);
    const [index, setIndex] = useState(0);
    const photo = photos[Math.min(index, photos.length - 1)];
    return <section className="rental-gallery mb_30" aria-label={`Photos de ${rental.title}`}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} className="rental-gallery-main" sizes="(max-width: 991px) 100vw, 66vw" priority />
        {photos.length > 1 && <>
            <div className="rental-gallery-controls">
                <button type="button" className="tf-btn" disabled={index === 0} onClick={() => setIndex(index - 1)} aria-label="Photo précédente">← Précédente</button>
                <p role="status">Photo {index + 1} sur {photos.length}</p>
                <button type="button" className="tf-btn" disabled={index === photos.length - 1} onClick={() => setIndex(index + 1)} aria-label="Photo suivante">Suivante →</button>
            </div>
            <div className="rental-gallery-thumbnails">
                {photos.map((item, i) => <button key={item.src} type="button" aria-label={`Voir la photo ${i + 1} : ${item.alt}`} aria-pressed={i === index} onClick={() => setIndex(i)}>
                    <Image src={item.src} alt="" width={88} height={66} />
                </button>)}
            </div>
        </>}
    </section>;
}
