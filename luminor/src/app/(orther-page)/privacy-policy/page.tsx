import { pageMetadata } from "@/data/seo";
import Layout from "@/components/layouts/Layout-defaul";
import PageTitle from "@/components/otherpage/privacy/PageTitle";
import Privacy from "@/components/otherpage/privacy/Privacy";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <Privacy />
        </Layout>
    );
}

export const metadata = pageMetadata("Confidentialité et utilisation du site | CIP IMMO", "Consultez les conditions d’utilisation du site CIP IMMO : annonces, favoris, formulaires, échanges avec notre équipe et services externes.", "/privacy-policy/");
