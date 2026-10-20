import { pageMetadata } from "@/data/seo";
import FAQs1 from "@/components/common/FAQs1";
import Layout from "@/components/layouts/Layout-defaul";
import OurPricing from "@/components/otherpage/pricing/OurPricing";
import PageTitle from "@/components/otherpage/pricing/PageTitle";
import React from "react";

export default function page() {
    return (
        <Layout>
            <PageTitle />
            <OurPricing />
            <div className="section-faqs-1 tf-spacing-2">
                <FAQs1 />
            </div>
        </Layout>
    );
}

export const metadata = pageMetadata("Formules de location et tarifs | CIP IMMO", "Découvrez nos formules de location pour un court séjour ou une longue durée en Guinée. Consultez les logements et confirmez les conditions avec CIP IMMO.", "/our-pricing/");
