import Image from 'next/image';
import React from 'react'

const faqsData = [
  {
    question: "Comment choisir ma formule de location ?",
    answer: "Un court séjour convient à un passage de quelques jours. Une location longue durée vous permet de vous installer avec un loyer mensuel. Notre équipe vous aide à choisir selon vos dates et votre budget.",
    id: "accordion-faq-1",
    expanded: false,
  },
  {
    question: "Que comprend le tarif affiché ?",
    answer: "Chaque tarif communiqué est indiqué en francs guinéens, avec sa période : par jour, par nuit ou par mois. Un prix non communiqué est indiqué « À discuter ». Demandez à CIP IMMO les charges, la caution et les conditions applicables au logement choisi.",
    id: "accordion-faq-2",
    expanded: true,
  },
  {
    question: "Comment connaître les disponibilités ?",
    answer: "Contactez CIP IMMO avec le quartier, le logement et les dates souhaités. Notre équipe vous renseigne et vous explique les étapes pour préparer votre arrivée.",
    id: "accordion-faq-3",
    expanded: false,
  },
  {
    question: "Puis-je louer sans créer de compte ?",
    answer: "Oui. Vous pouvez consulter les annonces librement, puis échanger avec CIP IMMO par téléphone ou sur WhatsApp.",
    id: "accordion-faq-4",
    expanded: false,
  },
  {
    question: "Quel logement choisir pour ma famille ?",
    answer: "Comparez le nombre de chambres et la surface selon vos besoins. Nos appartements à Ansoumaniah disposent de trois chambres, d’un salon et d’une cuisine sur 92 m².",
    id: "accordion-faq-5",
    expanded: false,
  },
];

export default function FAQs1() {
  return (
    <div className="tf-container">
      <div className="tf-grid-layout lg-col-2">
        <div className="box-faqs tf-animate-1">
          <div className="thumbs">
            <Image
              src="/assets/images/section/section-faq.jpg?v=cip-photos-1"
              width={600}
              height={660}
              alt="Un appartement pour votre séjour en Guinée"
            />
          </div>
          <div className="content">
            <h2 className="h3 title text_white mb_12">Parlons de votre logement</h2>
            <p className="text_white text-body-2 mb_20">
              Une question sur un appartement, les tarifs ou votre arrivée ? Contactez CIP IMMO pour préparer votre court séjour ou votre installation en Guinée.
            </p>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/contacts`} className="tf-btn btn-bg-1 btn-px-28">
              <span>Contacter notre équipe</span>
              <span className="bg-effect"></span>
            </a>
          </div>
        </div>
        <div className="wrap-accordion">
          <div className="heading-section mb_48">
            <span className="sub text-uppercase fw-6 text_secondary-color">Questions fréquentes</span>
            <h2 className="h3">Les réponses pour préparer votre location</h2>
          </div>
          <ul className="accordion-wrap" id="accordion-faq">
            {faqsData.map((faq) => (
              <li className="accordion-item" key={faq.id}><details className="rental-question" open={faq.expanded}><summary className="accordion-title">
                  <div className="heading">
                    <h3 className="h6 title">{faq.question}</h3>
                    <span className="icon icon-CaretDown"></span>
                  </div>
                </summary><div className="accordion-faqs-content">
                    <p className="text-body-1">{faq.answer}</p>
                  </div></details></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
