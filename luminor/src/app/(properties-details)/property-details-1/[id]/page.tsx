import { notFound } from "next/navigation";
import { cipRentals } from "@/data/cipRentals";
import RentalPage from "../../logements/[slug]/page";

export const dynamicParams = false;
type PageProps = { params: Promise<{ id: string }> };
// Références historiques fixes : masquer un logement ne doit pas décaler les autres liens.
const legacySlugs = ['appartement-coleah', 'appartement-coyah-km54', 'appartement-ansoumaniah-1', 'appartement-ansoumaniah-2', 'appartement-ansoumaniah-3'];

async function rentalFromParams(params: PageProps["params"]) {
    const { id } = await params;
    const slug = legacySlugs.find((_, index) => String(index + 1) === id);
    const rental = cipRentals.find(rental => rental.slug === slug);
    if (!rental) notFound();
    return rental;
}

export function generateStaticParams() {
    return legacySlugs.flatMap((slug, index) => cipRentals.some(rental => rental.slug === slug) ? [{ id: String(index + 1) }] : []);
}

export async function generateMetadata({ params }: PageProps) {
    const rental = await rentalFromParams(params);
    return { title: `${rental.title} — CIP IMMO`, robots: { index: false, follow: false } };
}

export default async function Page({ params }: PageProps) {
    const rental = await rentalFromParams(params);
    return <RentalPage params={Promise.resolve({ slug: rental.slug })} />;
}
