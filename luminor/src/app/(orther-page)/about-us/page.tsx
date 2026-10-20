import { pageMetadata } from "@/data/seo";
import Agents from "@/components/common/Agents";
import Banner1 from "@/components/common/Banner1";
import Process1 from "@/components/common/Process1";
import Layout from "@/components/layouts/Layout-defaul";
import AboutUs from "@/components/otherpage/about/AboutUs";
import PageTitle from "@/components/otherpage/about/PageTitle";
import WhyChoose from "@/components/otherpage/about/WhyChoose";



export default function Page() {
    return (
        <Layout>
            <PageTitle />
            <div className="tf-spacing-1">
                <AboutUs />
            </div>
            <div className="section-process tf-spacing-1">
                <Process1 />
            </div>
            <div className="section-why tf-spacing-1">
                <WhyChoose />
            </div>
            <Banner1 />
            <div className="section-agents tf-spacing-1">
                <Agents />
            </div>
        </Layout>
    );
}

export const metadata = pageMetadata("À propos de CIP IMMO | Location en Guinée", "Découvrez CIP IMMO, votre équipe de proximité à Nongo Kiroti, Conakry, pour louer un logement en Guinée en court séjour ou en longue durée.", "/about-us/");
