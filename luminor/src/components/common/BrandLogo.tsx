import Image from "next/image";

// Logo de référence CIP IMMO : horizontal, aplats bleu/jaune, fond transparent.
// Réutiliser cette version sur le site, sauf demande explicite de changement.
export default function BrandLogo({ priority = false }: { priority?: boolean }) {
    return (
        <Image
            src="/assets/images/logo/cip-immo-horizontal.svg"
            alt="CIP IMMO"
            className="main-logo cip-immo-logo"
            width={1000}
            height={200}
            priority={priority}
            unoptimized
        />
    );
}
