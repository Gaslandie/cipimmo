"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Offcanvas({ isOpen, onClose, children }: {
    isOpen: boolean; onClose: () => void; children: ReactNode;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (!isOpen) { if (dialog.open) dialog.close(); return; }
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const overflow = document.body.style.overflow;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return () => {
            dialog.close(); document.body.style.overflow = overflow;
            if (previous?.isConnected) previous.focus({ preventScroll: true });
        };
    }, [isOpen]);
    return <dialog ref={ref} className="offcanvas offcanvas-end rental-menu" aria-label="Menu CIP IMMO" aria-modal="true"
        onCancel={event => { event.preventDefault(); onClose(); }}
        onKeyDown={event => {
            if (event.key !== "Tab") return;
            const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'))
                .filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0);
            const first = controls[0], last = controls[controls.length - 1];
            if (!first) { event.preventDefault(); return; }
            if (event.shiftKey && (document.activeElement === first || document.activeElement === event.currentTarget)) {
                event.preventDefault(); last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault(); first.focus();
            }
        }}
        onClick={event => {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.target === event.currentTarget && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) onClose();
        }}>
        {children}
    </dialog>;
}
