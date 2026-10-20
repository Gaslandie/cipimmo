"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { WhatsAppResult } from "@/actions/whatsapp";

export default function WhatsAppForm({ prepare, children, className, label }: {
    prepare: (data: FormData) => WhatsAppResult; children: ReactNode; className?: string; label: string;
}) {
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");
    const [ready, setReady] = useState(false);
    const errorRef = useRef<HTMLParagraphElement>(null);
    const id = useId();
    useEffect(() => setReady(true), []);
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        form.querySelectorAll('[aria-invalid="true"]').forEach(field => {
            field.removeAttribute("aria-invalid");
            const descriptions = (field.getAttribute("aria-describedby") || "").split(" ").filter(value => value && value !== id).join(" ");
            if (descriptions) field.setAttribute("aria-describedby", descriptions); else field.removeAttribute("aria-describedby");
        });
        const result = prepare(new FormData(form));
        if ("error" in result) {
            setUrl(""); setError(result.error);
            const field = form.elements.namedItem(result.field);
            if (field instanceof HTMLElement) { field.setAttribute("aria-invalid", "true"); field.setAttribute("aria-describedby", `${field.getAttribute("aria-describedby") || ""} ${id}`.trim()); }
            requestAnimationFrame(() => {
                if (field instanceof HTMLElement) field.focus();
                else errorRef.current?.focus();
            });
            return;
        }
        setError("");
        const nextUrl = `https://wa.me/224623417510?text=${encodeURIComponent(result.message)}`;
        setUrl(nextUrl);
        window.location.assign(nextUrl);
    }
    return <form className={className} onSubmit={submit} noValidate aria-label={label} onInput={() => setUrl("")}>
        <fieldset disabled={!ready} className="whatsapp-fields">{children}</fieldset>
        <noscript><p>Pour nous contacter, <a href="https://wa.me/224623417510">ouvrez WhatsApp</a> ou <a href="tel:+224613585198">appelez CIP IMMO</a>.</p></noscript>
        {error && <p id={id} ref={errorRef} role="alert" tabIndex={-1} className="form-feedback">{error}</p>}
        {url && <div className="form-feedback" role="status">
            <p>Votre message est prêt. Relisez-le dans WhatsApp avant de l’envoyer.</p>
            <a href={url}>Ouvrir WhatsApp</a>{" · "}<a href="tel:+224613585198">Appeler CIP IMMO</a>
        </div>}
    </form>;
}
