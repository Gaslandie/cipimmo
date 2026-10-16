import Image from "next/image";
import Link from "next/link";
import { rentalAvailability, rentalLocation, rentalPrice, type Rental } from "@/data/cipRentals";
import { RentalFavoriteButton } from "./RentalFavoriteButton";
import RentalContact from "./RentalContact";

export default function RentalCard({ rental, list = false, headingLevel = 2 }: { rental: Rental; list?: boolean; headingLevel?: 2 | 3 }) {
    const Heading = headingLevel === 3 ? "h3" : "h2";
    return <article className={`card-house rental-card ${list ? "style-list v3" : "style-default hover-image"}`} data-slug={rental.slug}>
        <div className={list ? "wrap-img" : ""}>
            <Link href={`/logements/${rental.slug}`} className={`img-style${list ? "" : " mb_20"}`} aria-label={`Voir ${rental.title}, référence ${rental.slug}`}>
                <Image src={rental.imgSrc} width={410} height={308} alt={rental.imageAlt} sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw" />
            </Link>
        </div>
        <div className="content">
            <div className="wrap-tag d-flex gap_8 mb_12"><span className="tag rent">{rental.duration}</span><span className="tag categoreis">{rental.category}</span></div>
            <Heading className="h5 mb_8"><Link href={`/logements/${rental.slug}`} className="link text_primary-color">{rental.title}</Link></Heading>
            <p className="mb_12">{rentalLocation(rental)}, Guinée</p>
            <p className="price h5 mb_12">{rentalPrice(rental)}{rental.price !== null && <span className="text-body-default"> / {rental.period}</span>}</p>
            <ul className="info d-flex flex-wrap">
                <li><i className="icon-Bed" aria-hidden="true" /> {rental.beds} chambre{rental.beds > 1 ? "s" : ""}</li>
                <li><i className="icon-Ruler" aria-hidden="true" /> {rental.area} m²</li>
            </ul>
            <p className="rental-furnishing">{rental.furnished || "Mobilier : à confirmer"}</p>
            <p className="rental-availability">{rentalAvailability}.</p>
            <RentalFavoriteButton rental={rental} />
            <RentalContact rental={rental} compact />
        </div>
    </article>;
}
