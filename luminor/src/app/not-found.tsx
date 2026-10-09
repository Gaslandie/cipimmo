import Link from "next/link";
import Layout from "@/components/layouts/Layout-defaul";

export default function NotFound() {
    return <Layout><main className="tf-container tf-spacing-1 text-center">
        <p className="sub text-uppercase mb_12">Page introuvable</p>
        <h1 className="h3 mb_20">Retrouvons votre chemin</h1>
        <p className="mb_32">Cette page n’est pas disponible. Retrouvez nos appartements à louer en Guinée.</p>
        <Link className="tf-btn btn-bg-1 mx-auto" href="/listing-left-sidebar"><span>Voir nos logements</span><span className="bg-effect" /></Link>
    </main></Layout>;
}
