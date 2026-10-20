export type FooterLink = {
    href: string;
    label: string;
};

export type FooterSection = {
    className: string;
    heading: string;
    links: FooterLink[];
};

export const footerSections: FooterSection[] = [
    {
        className: "company",
        heading: "Nos locations",
        links: [
            { href: "/listing-left-sidebar?duration=longue", label: "Longue durée" },
            { href: "/listing-left-sidebar?duration=courte", label: "Court séjour" },
            { href: "/listing-left-sidebar?furnished=non-meuble", label: "Appartements non meublés" },
            { href: "/listing-left-sidebar", label: "Tous les logements" },
            { href: "/comment-louer", label: "Comment louer" },
        ],
    },
    {
        className: "quick-link",
        heading: "Liens utiles",
        links: [
            { href: "/about-us", label: "À propos" },
            { href: "/contacts", label: "Nous contacter" },
            { href: "/FAQs", label: "Questions fréquentes" },
            { href: "/comment-louer", label: "Conseils pour louer" },
            { href: "/our-pricing", label: "Nos formules" },
            { href: "/privacy-policy#legal", label: "Mentions légales" },
            { href: "/privacy-policy", label: "Confidentialité et utilisation" },
        ],
    },
];
