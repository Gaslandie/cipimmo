import Layout from "@/components/layouts/Layout-defaul";
import Properties3 from "@/components/properties/Properties3";
import React from "react";

export const metadata = { title: "Nos logements à louer | CIP IMMO", description: "Découvrez nos appartements à louer à Coléah, Coyah Km54 et Ansoumaniah, pour un court séjour ou une longue durée." };

export default function page() {
    return (
        <Layout>
            <Properties3 />
        </Layout>
    );
}
