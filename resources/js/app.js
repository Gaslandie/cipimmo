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
