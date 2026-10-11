import Image from "next/image";

// Logo de référence CIP IMMO : horizontal, aplats bleu/jaune, fond transparent.
// Variante claire blanc/jaune pour les fonds sombres, avec les mêmes tracés.
export default function BrandLogo({
    priority = false,
    variant = "default",
}: {
    priority?: boolean;
    variant?: "default" | "light";
}) {
    return (
        <Image
            src={`/assets/images/logo/cip-immo-horizontal${variant === "light" ? "-light" : ""}.svg`}
            alt="CIP IMMO"
            className="main-logo cip-immo-logo"
            width={860}
            height={140}
            priority={priority}
            unoptimized
        />
    );
}
