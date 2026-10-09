type MenuItem = {
    title: string;
    href?: string;
    links: Array<{
        href?: string;
        label: string;
        isCurrent?: boolean;
        sub?: Array<{ href: string; label: string }>;
    }>;
    isCurrent?: boolean;
};

export const menuItems: MenuItem[] = [
    { title: "Accueil", href: "/", links: [] },
    { title: "Nos logements", href: "/listing-left-sidebar", links: [] },
    { title: "Comment louer", href: "/comment-louer", links: [] },
    { title: "À propos", href: "/about-us", links: [] },
    { title: "Nous contacter", href: "/contacts", links: [] },
];
