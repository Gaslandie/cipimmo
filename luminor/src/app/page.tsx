import { pageMetadata } from "@/data/seo";
import Banner from "@/components/homes/homepage-1/Banner";
import Hero from "@/components/homes/homepage-1/Hero";
import Location from "@/components/homes/homepage-1/Location";
import Properties from "@/components/homes/homepage-1/Properties";
import LatestNews from "@/components/homes/LatestNews";
import Layout from "@/components/layouts/Layout-defaul";

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Properties />
            <Banner />
            <Location />
            <LatestNews />
        </Layout>
    );
}

export const metadata = pageMetadata("Location d’appartements en Guinée | CIP IMMO", "Découvrez les appartements à louer de CIP IMMO à Conakry, Coyah et Kankan. Courts séjours et locations longue durée, avec contact direct.", "/");
