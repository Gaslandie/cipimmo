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
    {
        title: "Homepages",
        links: [
            { href: "/", label: "Homepage 1", isCurrent: true },
            { href: "/home02", label: "Homepage 2" },
            { href: "/home03", label: "Homepage 3" },
            { href: "/home04", label: "Homepage 4" },
            { href: "/home05", label: "Homepage 5" },
        ],
        isCurrent: true,
    },
    {
        title: "Listing",
        links: [
            {
                href: "/listing-topmap-grid",
                label: "Listing Topmap Grid",
            },
            {
                href: "/listing-topmap-list",
                label: "listing Topmap List",
            },
            { href: "/listing-left-sidebar", label: "Listing Left Sidebar" },
            { href: "/listing-right-sidebar", label: "Listing Right Sidebar" },
            { href: "/listing-half-map-grid", label: "Listing Half Map Grid" },
            { href: "/listing-half-map-list", label: "Listing Half Map List" },
        ],
    },
    {
        title: "Properties",
        links: [    
            { href: "/property-details-1/1", label: "Property Details 1" },
            { href: "/property-details-2/1", label: "Property Details 2" },
            { href: "/property-details-3/1", label: "Property Details 3" },
            { href: "/property-details-4/1", label: "Property Details 4" },
        ],
    },
    {
        title: "Pages",
        links: [
            { href: "/about-us", label: "About Us" },
            { href: "/our-pricing", label: "Our Pricing" },
            { href: "/FAQs", label: "FAQs" },
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/login", label: "Login/Register" },
        ],
    },
    {
        title: "Blog",
        links: [
            { href: "/blog-standard", label: "Blog Standard" },
            { href: "/blog-grid", label: "Blog Grid" },
            { href: "/blog-list", label: "Blog List" },
            { href: "/blog-post-1/1", label: "Blog Post 1" },
            { href: "/blog-post-2/1", label: "Blog Post 2" },
        ],
    },
    {
        title: "Contacts",
        href: "/contacts",
        links: [],
    },
];
