import Layout from "@/components/layouts/Layout-defaul";
import RentalFavorites from "@/components/common/RentalFavorites";

export const metadata = { title: "Mes favoris | CIP IMMO", robots: { index: false, follow: false } };

export default function Page() {
    return <Layout><RentalFavorites /></Layout>;
}
