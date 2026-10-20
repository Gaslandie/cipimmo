import { pageMetadata } from "@/data/seo";
import Layout from "@/components/layouts/Layout-defaul";
import Properties3 from "@/components/properties/Properties3";
import React from "react";
import StructuredData from "@/components/common/StructuredData";
import { breadcrumbStructuredData } from "@/data/structuredData";


export default function page() {
    return (
        <Layout>
            <StructuredData id="cip-breadcrumb-data" data={breadcrumbStructuredData([{ name: "Accueil", path: "/" }, { name: "Nos logements", path: "/listing-left-sidebar/" }])} />
            <Properties3 />
        </Layout>
    );
}

export const metadata = pageMetadata("Appartements à louer en Guinée | CIP IMMO", "Comparez nos logements à Conakry, Coyah et Kankan : photos, chambres et tarifs disponibles. Contactez CIP IMMO pour confirmer les disponibilités.", "/listing-left-sidebar/");
