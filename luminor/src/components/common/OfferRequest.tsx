"use client";

import { useId } from "react";
import { subscribeNewsletter } from "@/actions/newsletterAction";
import WhatsAppForm from "./WhatsAppForm";

export default function OfferRequest() {
    const id = useId();
    return <WhatsAppForm className="form-newsletter offer-request" prepare={subscribeNewsletter} label="Demander les offres sur WhatsApp">
        <label htmlFor={id}>Votre adresse e-mail</label>
        <input id={id} type="email" name="email" inputMode="email" autoComplete="email" placeholder="exemple@domaine.com" maxLength={254} required aria-describedby={`${id}-help`} />
        <p id={`${id}-help`}>Relisez et envoyez votre demande dans WhatsApp. Ce formulaire ne crée pas d’abonnement aux offres.</p>
        <button type="submit" className="tf-btn btn-bg-1 mt_16"><span>Demander les offres</span></button>
    </WhatsAppForm>;
}
