import { pageMetadata } from "@/data/seo";
import Layout from "@/components/layouts/Layout-defaul";
import RentalFavorites from "@/components/common/RentalFavorites";


export default function Page() {
    return <Layout><RentalFavorites /></Layout>;
}

export const metadata = pageMetadata("Mes logements favoris | CIP IMMO", "Retrouvez les logements enregistrés dans vos favoris sur ce navigateur et contactez CIP IMMO pour préparer votre location en Guinée.", "/favoris/", false);
