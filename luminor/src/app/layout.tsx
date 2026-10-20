import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "../../public/assets/icons/icomoon/style.css";
import "../../public/assets/scss/app.scss";
import { RentalFavoritesProvider } from "@/components/common/RentalFavoriteButton";
import BackToTop from "@/components/common/BackToTop";
import ClientScripts from "@/components/common/ClientScripts";
import { Metadata } from "next";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CIP IMMO",
    description: "Logements meublés et non meublés en Guinée. CIP IMMO vous accompagne pour vos courts séjours et vos locations longue durée.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={manrope.variable}>
                <RentalFavoritesProvider><div id="wrapper">{children}</div></RentalFavoritesProvider>
                <ClientScripts />
                <BackToTop />
            </body>
        </html>
    );
}
