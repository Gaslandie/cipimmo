// Native details/summary keeps navigation and FAQ usable without JavaScript.
const menu = document.querySelector('.mobile-menu');
if (menu) {
    const toggle = menu.querySelector('summary');
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menu.open) {
            menu.open = false;
            toggle.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
        if (event.matches) menu.open = false;
    });
}

// The "another city" link lands on the real select, ready for keyboard input.
const focusCity = () => {
    if (window.location.hash === '#city') document.getElementById('city')?.focus();
};
focusCity();
window.addEventListener('hashchange', focusCity);

// Scroll-snap galleries work by touch and native scrolling without JavaScript.
// Enhance them with named controls, keyboard navigation and selected thumbnails.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const track = gallery.querySelector('[data-gallery-track]');
    const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
    if (!track || slides.length < 2) return;
    const pickers = [...gallery.querySelectorAll('[data-gallery-select]')];
    const status = gallery.querySelector('[data-gallery-status]');
    let active = 0;
    let target = null;
    let pendingFrame = null;
    const update = (index) => {
        active = index;
        pickers.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.gallerySelect) === index)));
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
        if (status) status.textContent = `Photo ${index + 1} / ${slides.length}`;
    };
    const goTo = (index) => {
        const next = (index + slides.length) % slides.length;
        target = next;
        update(next);
        track.scrollTo({left: next * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    };
    gallery.querySelectorAll('[data-gallery-controls]').forEach((controls) => { controls.hidden = false; });
    gallery.classList.add('gallery-enhanced');
    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => goTo(active - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => goTo(active + 1));
    pickers.forEach((button) => button.addEventListener('click', () => goTo(Number(button.dataset.gallerySelect))));
    track.addEventListener('keydown', (event) => {
        const destinations = {ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: slides.length - 1};
        if (Object.hasOwn(destinations, event.key)) { event.preventDefault(); goTo(destinations[event.key]); }
    });
    track.addEventListener('scroll', () => {
        if (pendingFrame !== null) return;
        pendingFrame = requestAnimationFrame(() => {
            pendingFrame = null;
            if (track.clientWidth) {
                const index = Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth)));
                if (target === null || index === target) { update(index); target = null; }
            }
        });
    }, {passive: true});
    track.addEventListener('pointerdown', () => { target = null; });
    track.addEventListener('wheel', () => { target = null; }, {passive: true});
    new ResizeObserver(() => { target = null; track.scrollTo({left: active * track.clientWidth, behavior: 'instant'}); }).observe(track);
    update(0);
});

// Prepare a message only on an explicit click. No form data is stored or sent
// to our server; the visitor reviews and sends it themselves in WhatsApp.
document.querySelectorAll('[data-contact-form]').forEach((form) => {
    const destination = form.dataset.whatsapp;
    const button = form.querySelector('[data-contact-submit]');
    if (!/^https:\/\/wa\.me\/[1-9][0-9]{7,14}$/.test(destination)) return;
    button.disabled = false;
    form.addEventListener('submit', (event) => { event.preventDefault(); button.click(); });
    button.addEventListener('click', () => {
        const error = form.querySelector('[data-contact-error]');
        error.hidden = true;
        if (!form.reportValidity()) return;
        const values = Object.fromEntries(new FormData(form));
        if (!values.name.trim() || values.message.trim().length < 10) {
            error.textContent = 'Indiquez votre nom et un message d’au moins 10 caractères.';
            error.hidden = false;
            return;
        }
        if (!/^[+0-9() .-]+$/.test(values.phone) || !/^[0-9]{8,15}$/.test(values.phone.replace(/\D/g, ''))) {
            error.textContent = 'Indiquez un numéro de téléphone valide, avec 8 à 15 chiffres.';
            error.hidden = false;
            form.querySelector('[name=phone]').focus();
            return;
        }
        const text = [
            'Bonjour CIP IMMO,',
            `Nom : ${values.name.trim()}`,
            `Téléphone : ${values.phone.trim()}`,
            ...(values.email.trim() ? [`E-mail : ${values.email.trim()}`] : []),
            `Demande : ${values.subject}`,
            '', values.message.trim(),
        ].join('\n');
        window.location.assign(`${destination}?text=${encodeURIComponent(text)}`);
    });
});

// Content stays visible by default, even without JS. Reveal once, with no
// dependency, no looping, and cancel immediately if reduced motion is enabled.
if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function' && !reducedMotion.matches) {
    const runningEntrances = new Set();
    const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(({target, isIntersecting}) => {
            if (!isIntersecting) return;
            entranceObserver.unobserve(target);
            if (reducedMotion.matches) return;
            const animation = target.animate([
                {opacity: .75, translate: '0 8px'},
                {opacity: 1, translate: '0 0'},
            ], {duration: 360, easing: 'cubic-bezier(.2,.7,.3,1)'});
            runningEntrances.add(animation);
            animation.finished.then(() => runningEntrances.delete(animation), () => runningEntrances.delete(animation));
        });
    }, {threshold: .08});
    document.querySelectorAll('.hero-content, .page-heading, .section-heading, .listing-card, .city-card, .step, .about-photo, .contact-panel, .location-card').forEach((element) => entranceObserver.observe(element));
    reducedMotion.addEventListener('change', (event) => {
        if (event.matches) {
            entranceObserver.disconnect();
            runningEntrances.forEach((animation) => animation.cancel());
            runningEntrances.clear();
        }
    });
}
