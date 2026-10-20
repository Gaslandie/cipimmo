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
