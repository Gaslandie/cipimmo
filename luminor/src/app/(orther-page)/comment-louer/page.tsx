import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layouts/Layout-defaul";

export const metadata = { title: "Comment louer — CIP IMMO" };

// Explications reprises de la maquette CIP IMMO, dans les styles existants du thème.
const steps = [
    ["Trouvez votre logement", "Choisissez une ville et affinez votre recherche selon vos besoins et votre budget."],
    ["Consultez les détails", "Découvrez les photos, les équipements et le prix du logement."],
    ["Échangez avec CIP IMMO", "Appelez-nous ou écrivez-nous sur WhatsApp pour confirmer la disponibilité et les conditions."],
];

const questions = [
    ["Peut-on louer pour un court séjour ou une longue durée ?", "Oui. CIP IMMO propose les deux. Les possibilités dépendent du logement : consultez sa fiche ou contactez-nous pour en savoir plus."],
    ["Les logements sont-ils tous meublés ?", "Non. Nous proposons des logements meublés et non meublés."],
    ["Comment savoir si un logement est disponible ?", "Contactez-nous sur WhatsApp ou par téléphone. Notre équipe vous confirmera sa disponibilité pour la période souhaitée."],
    ["Peut-on réserver ou payer directement sur le site ?", "Non. Le site vous permet de consulter les logements et leurs prix. La disponibilité, les conditions et la confirmation de location se règlent directement avec CIP IMMO."],
    ["Comment connaître les charges et les conditions de location ?", "Consultez les informations de la fiche, puis échangez avec notre équipe pour connaître les charges éventuelles, la caution et les conditions applicables au logement."],
];

export default function RentingPage() {
    return (
        <Layout>
            <div className="page-title style-default">
                <div className="thumbs">
                    <Image src="/assets/images/page-title/page-title-12.jpg?v=cip-photos-1" width={1920} height={300} alt="" priority />
                </div>
                <div className="content text-center">
                    <div className="tf-container">
                        <h1 className="title text_white mb_12">Comment louer avec CIP IMMO</h1>
                        <ul className="breadcrumb justify-content-center text-button fw-4">
                            <li><Link href="/">Accueil</Link></li>
                            <li>Comment louer</li>
                        </ul>
                    </div>
                </div>
            </div>
            <section className="section-faqs tf-spacing-1">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="faq-item">
                                <h2 className="mb_18">Simplement, avec vous</h2>
                                <p className="mb_24">Du choix du logement à la confirmation, notre équipe vous renseigne sur chaque étape.</p>
                                {steps.map(([title, description], index) => (
                                    <div key={title} className="mb_24">
                                        <h4 className="mb_12">0{index + 1}. {title}</h4>
                                        <p>{description}</p>
                                    </div>
                                ))}
                                <p className="mb_24">La location se confirme directement avec notre équipe. Aucun paiement ne se fait sur le site.</p>
                                <Link href="/listing-left-sidebar" className="tf-btn">
                                    <span>Trouver un logement</span><span className="bg-effect" />
                                </Link>
                            </div>
                            <div className="faq-item" id="questions">
                                <h2 className="mb_18">Les réponses à vos questions</h2>
                                <ul className="accordion-wrap" id="rental-questions">
                                    {questions.map(([question, answer], index) => (
                                        <li className="accordion-item" key={question}>
                                            <a href={`#rental-question-${index}`} className={`accordion-title${index ? " collapsed" : ""}`}
                                                data-bs-toggle="collapse" aria-expanded={index === 0}
                                                aria-controls={`rental-question-${index}`}>
                                                <div className="heading">
                                                    <div className="title text-title text_primary-color fw-6">{question}</div>
                                                    <span className="icon icon-CaretDown" aria-hidden="true" />
                                                </div>
                                            </a>
                                            <div id={`rental-question-${index}`} className={`collapse${index === 0 ? " show" : ""}`} data-bs-parent="#rental-questions">
                                                <div className="accordion-faqs-content"><p>{answer}</p></div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
