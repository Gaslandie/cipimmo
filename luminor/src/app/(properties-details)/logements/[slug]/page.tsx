import Link from "next/link";
import { notFound } from "next/navigation";
import Layout from "@/components/layouts/Layout-defaul";
import { cipRentals, rentalPrice, rentalLocation, rentalAvailability, safeRentalMedia, similarRentals } from "@/data/cipRentals";

import RentalGallery from "@/components/common/RentalGallery";
import RentalCard from "@/components/common/RentalCard";
import { RentalFavoriteButton } from "@/components/common/RentalFavoriteButton";
import RentalContact from "@/components/common/RentalContact";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return cipRentals.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const rental = cipRentals.find((item) => item.slug === slug);
    if (!rental) notFound();
    return { title: `${rental.title} — CIP IMMO`, robots: { index: false, follow: false } };
}

export default async function RentalPage({ params }: PageProps) {
    const { slug } = await params;
    const rental = cipRentals.find((item) => item.slug === slug);
    if (!rental) notFound();
    const similar = similarRentals(rental);
    const video = rental.video && safeRentalMedia(rental.video.src, "video") && safeRentalMedia(rental.video.poster, "poster") && rental.video.description.trim() ? rental.video : undefined;
    const amenities = Object.entries(rental.amenities || {}).filter(([, value]) => value?.trim());

    return (
        <Layout>
            <div className="properties-details rental-detail">
                <div className="tf-container tf-spacing-7">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="properties-title mb_30">
                                <div className="wrap-tag d-flex gap_8 mb_12">
                                    <span className="tag rent text-button-small fw-6 text_primary-color">{rental.duration}</span>
                                    <span className="tag categoreis text-button-small fw-6 text_primary-color">{rental.category}</span>
                                </div>
                                <h1 className="h4 mb_12">{rental.title}</h1>
                                <p className="mb_12">{rentalLocation(rental)}, Guinée</p>
                                <p className="price h4">
                                    {rentalPrice(rental)}
                                    {rental.price !== null && <span className="text_secondary-color text-body-default"> / {rental.period}</span>}
                                </p>
                                <p className="rental-availability mt_16">{rentalAvailability}.</p>
                            </div>
                            <RentalGallery key={rental.slug} rental={rental} />
                            <div className="properties-overview tf-spacing-8">
                                <h2 className="h5 properties-title mb_20">Votre logement</h2>
                                <ul className="info d-flex flex-wrap gap_24">
                                    <li><i className="icon-Bed" aria-hidden="true" /> {rental.beds} {rental.beds === 1 ? "chambre" : "chambres"}</li>
                                    <li><i className="icon-HouseLine" aria-hidden="true" /> {rental.furnished || "Mobilier : à confirmer"}</li>
                                    <li><i className="icon-Ruler" aria-hidden="true" /> {rental.area} m²</li>
                                </ul>
                            </div>
                            <div className="properties-description mb_30">
                                <h2 className="h5 properties-title mb_20">Description</h2>
                                <p className="text-body-2">{rental.description}</p>
                            </div>
                            {(amenities.length > 0 || rental.sharedAmenities?.length || rental.charges) && <section className="rental-info-section" aria-labelledby="rental-amenities">
                                <h2 id="rental-amenities" className="h5 mb_20">Équipements et services</h2>
                                {amenities.length > 0 && <dl className="rental-facts">
                                    {amenities.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
                                </dl>}
                                {!!rental.sharedAmenities?.length && <>
                                    <h3 className="h6 mt_24 mb_12">Espaces et services partagés</h3>
                                    <ul className="rental-info-list">{rental.sharedAmenities.map(item => <li key={item}>{item}</li>)}</ul>
                                </>}
                                {rental.charges && <>
                                    <h3 className="h6 mt_24 mb_12">Charges et frais</h3>
                                    <dl className="rental-facts">
                                        <div><dt>Compris dans le prix</dt><dd>{rental.charges.included.join(", ") || "À confirmer"}</dd></div>
                                        <div><dt>À payer en plus</dt><dd>{rental.charges.extra.join(", ") || "À confirmer"}</dd></div>
                                    </dl>
                                </>}
                            </section>}
                            {!!rental.neighbourhood?.length && <section className="rental-info-section" aria-labelledby="rental-neighbourhood">
                                <h2 id="rental-neighbourhood" className="h5 mb_20">Autour du logement</h2>
                                <p className="mb_12">{rentalLocation(rental)}, Guinée</p>
                                <ul className="rental-info-list">{rental.neighbourhood.map(item => <li key={item}>{item}</li>)}</ul>
                            </section>}
                            <section className="rental-info-section" aria-labelledby="rental-visit">
                                <h2 id="rental-visit" className="h5 mb_20">Découvrir le logement à distance</h2>
                                {video ? <>
                                    <video controls playsInline preload="none" poster={video.poster} aria-label={`Visite de ${rental.title}`} aria-describedby="rental-video-description">
                                        <source src={video.src} type={video.src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"} />
                                        {video.captions && safeRentalMedia(video.captions, "captions") && <track kind="captions" src={video.captions} srcLang="fr" label="Français" default />}
                                        Votre navigateur ne peut pas lire cette vidéo.
                                    </video>
                                    <p id="rental-video-description" className="mt_16 mb_20">{video.description}</p>
                                </> : <p className="mb_20">Aucune vidéo n’est encore disponible pour ce logement. Vous pouvez demander des images récentes ou convenir d’une visite avec notre équipe.</p>}
                                <RentalContact rental={rental} visit />
                            </section>
                            <Link href="/listing-left-sidebar" className="hover-underline-link text_primary-color text-button">Voir tous les logements</Link>
                        </div>
                        <div className="col-lg-4">
                            <div className="right sticky-top">
                                <div className="box-sellers mb_30">
                                    <h2 className="h5 mb_20">Échangez avec CIP IMMO</h2>
                                    <p className="mb_12">Référence : <strong className="rental-reference">{rental.slug}</strong></p>
                                    <p className="mb_24">Contactez-nous pour confirmer la disponibilité et connaître les conditions de location. Aucun paiement ne se fait sur le site.</p>
                                    <RentalFavoriteButton rental={rental} />
                                    <RentalContact rental={rental} withDates />
                                    <p className="mt_16">Téléphone : +224 613 58 51 98</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {similar.length > 0 && <section className="rental-similar mt_40" aria-labelledby="similar-title">
                        <h2 id="similar-title" className="h4 mb_12">D’autres logements à découvrir</h2>
                        <p className="mb_24">Pour {rental.duration === "Court séjour" ? "un court séjour" : "une location longue durée"}, voici d’autres possibilités. Consultez chaque fiche pour comparer le lieu, les chambres et le tarif.</p>
                        <div className="tf-grid-layout md-col-2 lg-col-3 rental-card-grid">{similar.map(other => <RentalCard key={other.slug} rental={other} headingLevel={3} />)}</div>
                    </section>}
                </div>
            </div>
        </Layout>
    );
}
