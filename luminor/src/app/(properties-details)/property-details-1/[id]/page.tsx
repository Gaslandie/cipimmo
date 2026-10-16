import { notFound } from "next/navigation";
import { cipRentals } from "@/data/cipRentals";
import RentalPage from "../../logements/[slug]/page";

export const dynamicParams = false;
type PageProps = { params: Promise<{ id: string }> };
// Historical numeric URLs refer to the five listings whose prices were provided.
const legacyRentals = cipRentals.filter(rental => rental.price !== null);

async function rentalFromParams(params: PageProps["params"]) {
    const { id } = await params;
    const rental = legacyRentals.find((_, index) => String(index + 1) === id);
    if (!rental) notFound();
    return rental;
}

export function generateStaticParams() {
    return legacyRentals.map((_, index) => ({ id: String(index + 1) }));
}

export async function generateMetadata({ params }: PageProps) {
    const rental = await rentalFromParams(params);
    return { title: `${rental.title} — CIP IMMO`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: PageProps) {
    const rental = await rentalFromParams(params);
    return <RentalPage params={Promise.resolve({ slug: rental.slug })} />;
}
