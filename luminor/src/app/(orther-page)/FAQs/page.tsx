import { pageMetadata } from "@/data/seo";
import Layout from "@/components/layouts/Layout-defaul";
import Faqs from "@/components/otherpage/FAQs/Faqs";
import PageTitle from "@/components/otherpage/FAQs/PageTitle";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <Faqs />
        </Layout>
    );
}

export const metadata = pageMetadata("Questions sur la location en Guinée | CIP IMMO", "Retrouvez les réponses aux questions sur les disponibilités, les tarifs et les démarches pour louer un logement en Guinée avec CIP IMMO.", "/FAQs/");
