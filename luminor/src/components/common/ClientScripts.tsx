"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
// Sticky header
const headerFixed2 = () => {
    const header = document.querySelector<HTMLElement>(".header-fixed");
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY >= 10) {
            header.classList.add("is-fixed");
        } else {
            header.classList.remove("is-fixed");
        }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
};

// Animate elements when visible
const animateImgItem = () => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delayAttr = entry.target.getAttribute("data-delay");
                    const delay = parseFloat(delayAttr ?? "0") || 0;
                    observer.unobserve(entry.target);
                    timers.push(setTimeout(() => {
                        entry.target.classList.add("active-animate");
                    }, Math.min(delay, 5) * 1000));
                }
            });
        },
        { threshold: 0.1 }
    );

    const elements = document.querySelectorAll<HTMLElement>(
        ".tf-animate-1, .tf-animate-2, .tf-animate-3, .tf-animate-4"
    );
    elements.forEach((el) => observer.observe(el));

    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
};

export default function ClientScripts() {
    const pathname = usePathname();

    // Button hover effect
    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const buttons = Array.from(document.querySelectorAll<HTMLElement>(".tf-btn"));
        const widths = buttons.map((button) => button.offsetWidth);
        const listeners: (() => void)[] = [];

        buttons.forEach((button, index) => {
            const btn = button as HTMLElement;
            const buttonWidth = widths[index];
            btn.style.setProperty("--button-width", buttonWidth + "px");

            const bgEffect = btn.querySelector(".bg-effect");

            const setPosition = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                const relY = e.clientY - rect.top;
                if (bgEffect) {
                    (bgEffect as HTMLElement).style.top = relY + "px";
                    (bgEffect as HTMLElement).style.left = relX + "px";
                }
            };

            btn.addEventListener("mouseenter", setPosition);
            btn.addEventListener("mouseout", setPosition);

            listeners.push(() => {
                btn.removeEventListener("mouseenter", setPosition);
                btn.removeEventListener("mouseout", setPosition);
            });
        });

        return () => {
            listeners.forEach((cleanup) => cleanup());
        };
    }, [pathname]);

    // Native entrance effects avoid downloading animation libraries on every page.
    // Visible text stays readable immediately, including if JavaScript fails.
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const animations: Animation[] = [];
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);
                const element = entry.target as HTMLElement;
                const transform = element.classList.contains("effectLeft") ? "translateX(-32px)"
                    : element.classList.contains("effectRight") ? "translateX(32px)"
                    : "translateY(20px)";
                animations.push(element.animate([
                    { opacity: 0, transform }, { opacity: 1, transform: "none" },
                ], { duration: 500, easing: "ease-out" }));
            }
        }, { threshold: 0.1 });
        document.querySelectorAll<HTMLElement>(".scrolling-effect").forEach((element) => {
            if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
        });
        return () => {
            observer.disconnect();
            animations.forEach((animation) => animation.cancel());
        };
    }, [pathname]);

    // Init animations on mount
    useEffect(() => {
        const cleanupHeader = headerFixed2();
        const cleanupImages = animateImgItem();

        return () => {
            cleanupHeader?.();
            cleanupImages();
        };
    }, [pathname]);

    return null;
}
