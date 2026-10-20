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

export const metadata = pageMetadata("Mentions légales et confidentialité | CIP IMMO", "Identité de CIP SARLU, hébergement de CIP IMMO, cookies, favoris, formulaires WhatsApp et droits sur vos données personnelles.", "/privacy-policy/");
