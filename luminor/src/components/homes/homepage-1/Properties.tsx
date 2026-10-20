import { cipRentals } from "@/data/cipRentals";
import RentalCard from "@/components/common/RentalCard";
import Link from "next/link";

export default function Properties() {
    return <section className="section-features-property-4 tf-spacing-1 pt-0 home-rentals" aria-labelledby="home-rentals-title">
        <div className="tf-container">
            <div className="heading-section justify-content-center text-center mb_46">
                <span className="sub text-uppercase fw-6 text_secondary-color-2">Nos locations</span>
                <h2 id="home-rentals-title" className="h3">Découvrez nos logements</h2>
            </div>
            <div className="tf-grid-layout lg-col-3 md-col-2 rental-card-grid">
                {cipRentals.slice(0, 5).map(rental => <RentalCard key={rental.slug} rental={rental} headingLevel={3} />)}
            </div>
            <Link href="/listing-left-sidebar" className="tf-btn btn-bg-1 mx-auto btn-px-32 mt_30"><span>Voir tous les logements</span></Link>
        </div>
    </section>;
}
