import Image from "next/image";
import Link from "next/link";
import { rentalAvailability, rentalLocation, rentalPhotos, rentalPrice, type Rental } from "@/data/cipRentals";
import { RentalFavoriteButton } from "./RentalFavoriteButton";
import RentalContact from "./RentalContact";

export default function RentalCard({ rental, list = false, headingLevel = 2 }: { rental: Rental; list?: boolean; headingLevel?: 2 | 3 }) {
    const Heading = headingLevel === 3 ? "h3" : "h2";
    const photo = rentalPhotos(rental)[0];
    return <article className={`card-house rental-card ${list ? "style-list v3" : "style-default hover-image"}`} data-slug={rental.slug}>
        <div className={list ? "wrap-img" : ""}>
            <Link href={`/logements/${rental.slug}`} className={`img-style${list ? "" : " mb_20"}`} aria-label={`Voir ${rental.title}, référence ${rental.slug}`}>
                <div className="rental-image-placeholder">{photo ? <Image src={photo.src} width={410} height={308} alt={photo.alt} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" /> : <span>À venir</span>}</div>
            </Link>
        </div>
        <div className="content">
            {photo?.caption && <p className="text-body-small mb_12">Photo retouchée</p>}
            <div className="wrap-tag d-flex gap_8 mb_12"><span className="tag rent">{rental.duration || "Durée : à confirmer"}</span><span className="tag categoreis">{rental.category}</span></div>
            <Heading className="h5 mb_8"><Link href={`/logements/${rental.slug}`} className="link text_primary-color">{rental.title}</Link></Heading>
            <p className="mb_12">{rentalLocation(rental)}, Guinée</p>
            <p className="price h5 mb_12">{rentalPrice(rental)}{rental.price !== null && <span className="text-body-default"> / {rental.period}</span>}</p>
            <ul className="info d-flex flex-wrap">
                <li><i className="icon-Bed" aria-hidden="true" /> {rental.beds === null ? "Chambres : à confirmer" : `${rental.beds} chambre${rental.beds > 1 ? "s" : ""}`}</li>
                <li><i className="icon-Ruler" aria-hidden="true" /> {rental.area === null ? "Surface : à confirmer" : `${rental.area} m²`}</li>
            </ul>
            <p className="rental-furnishing">{rental.furnished || "Mobilier : à confirmer"}</p>
            <p className="rental-availability">{rentalAvailability(rental)}.</p>
            <div className="rental-card-actions">
                <RentalFavoriteButton rental={rental} />
                <RentalContact rental={rental} compact />
            </div>
        </div>
    </article>;
}
