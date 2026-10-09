import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Layout from "@/components/layouts/Layout-defaul";
import { cipRentals } from "@/data/cipRentals";

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
    const message = `Bonjour CIP IMMO, je souhaite me renseigner sur « ${rental.title} » à ${rental.city}. Pouvez-vous confirmer la disponibilité et les conditions de location ?`;

    return (
        <Layout>
            <div className="properties-details">
                <div className="tf-container tf-spacing-7">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="properties-title mb_30">
                                <div className="wrap-tag d-flex gap_8 mb_12">
                                    <span className="tag rent text-button-small fw-6 text_primary-color">{rental.duration}</span>
                                    <span className="tag categoreis text-button-small fw-6 text_primary-color">{rental.category}</span>
                                </div>
                                <h1 className="h4 mb_12">{rental.title}</h1>
                                <p className="mb_12">{rental.city}, Guinée</p>
                                <h4 className="price">
                                    {rental.price.toLocaleString("fr-FR")} GNF
                                    <span className="text_secondary-color text-body-default"> / {rental.period}</span>
                                </h4>
                            </div>
                            <div className="img-style mb_30">
                                <Image src={rental.imgSrc} alt={rental.imageAlt} width={rental.imgWidth} height={rental.imgHeight} className="w-full" priority />
                            </div>
                            <div className="properties-overview tf-spacing-8">
                                <h5 className="properties-title mb_20">Votre logement</h5>
                                <ul className="info d-flex flex-wrap gap_24">
                                    <li><i className="icon-Bed" aria-hidden="true" /> {rental.beds} {rental.beds === 1 ? "chambre" : "chambres"}</li>
                                    <li><i className="icon-HouseLine" aria-hidden="true" /> {rental.furnished || "Salon"}</li>
                                    <li><i className="icon-Ruler" aria-hidden="true" /> {rental.area} m²</li>
                                </ul>
                            </div>
                            <div className="properties-description mb_30">
                                <h5 className="properties-title mb_20">Description</h5>
                                <p className="text-body-2">{rental.description}</p>
                            </div>
                            <Link href="/" className="hover-underline-link text_primary-color text-button">Retour à l’accueil</Link>
                        </div>
                        <div className="col-lg-4">
                            <div className="right sticky-top">
                                <div className="box-sellers mb_30">
                                    <h5 className="mb_20">Échangez avec CIP IMMO</h5>
                                    <p className="mb_24">Contactez-nous pour confirmer la disponibilité et connaître les conditions de location. Aucun paiement ne se fait sur le site.</p>
                                    <a href={`https://wa.me/224623417510?text=${encodeURIComponent(message)}`} className="tf-btn btn-bg-1 mb_12">
                                        <span>Écrire sur WhatsApp</span><span className="bg-effect" />
                                    </a>
                                    <a href="tel:+224613585198" className="tf-btn">
                                        <span>Appeler CIP IMMO</span><span className="bg-effect" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
