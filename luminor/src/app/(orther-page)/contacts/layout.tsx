import type { ReactNode } from "react";
import { pageMetadata } from "@/data/seo";

export const metadata = pageMetadata(
    "Contacter CIP IMMO à Conakry | Location en Guinée",
    "Contactez CIP IMMO à Nongo Kiroti, Conakry, par téléphone, WhatsApp ou e-mail pour connaître les disponibilités et préparer votre location en Guinée.",
    "/contacts/",
);

export default function ContactLayout({ children }: { children: ReactNode }) {
    return children;
}
