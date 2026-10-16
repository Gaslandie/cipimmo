import Footer1 from "../footer/Footer1";
import Header from "../header/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="clearfix">
                <a href="#main-content" className="rental-skip-link">Aller au contenu</a>
                <Header />
                <main id="main-content" tabIndex={-1}>{children}</main>
                <Footer1 />
            </div>
        </>
    );
}
