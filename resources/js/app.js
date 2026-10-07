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
