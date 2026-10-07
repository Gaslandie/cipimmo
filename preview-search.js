// Public fictional catalogue only. Laravel keeps its own server-side validation.
const form = document.querySelector('.search-form');
const results = document.getElementById('logements');
if (form && results) {
    const fields = ['city', 'duration', 'furnished'];
    const params = new URLSearchParams(window.location.search);
    let invalid = false;
    for (const field of fields) {
        const select = form.elements.namedItem(field);
        const values = params.getAll(field);
        const value = values[0] || '';
        if (values.length > 1 || ![...select.options].some((option) => option.value === value)
            || [...params.keys()].some((key) => key.startsWith(`${field}[`))) {
            invalid = true;
        } else {
            select.value = value;
        }
    }
    const cards = [...results.querySelectorAll('.listing-card')];
    let count = 0;
    for (const card of cards) {
        const matches = !invalid && fields.every((field) => !form.elements.namedItem(field).value
            || card.dataset[field] === form.elements.namedItem(field).value);
        // Explicit inline display overrides the flex class of the card.
        card.hidden = !matches;
        card.style.display = matches ? '' : 'none';
        if (matches) count++;
    }
    const heading = results.querySelector('.results-heading');
    const filtered = fields.some((field) => form.elements.namedItem(field).value);
    heading.querySelector('p').textContent = invalid ? 'La recherche n’a pas pu être appliquée.'
        : `${count} ${count === 1 ? 'logement trouvé' : 'logements trouvés'}${filtered ? ' pour votre recherche.' : '.'}`;
    const reset = document.createElement('a');
    reset.className = 'text-link';
    reset.href = `${window.location.pathname}#logements`;
    reset.textContent = 'Réinitialiser les filtres';
    if (filtered || invalid) heading.appendChild(reset);
    if (!count) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        const title = document.createElement('h3');
        title.textContent = invalid ? 'Choisissez une option proposée dans la recherche.' : 'Aucun logement pour ces critères';
        const text = document.createElement('p');
        text.textContent = 'Essayez une autre ville ou changez la durée et le type de logement.';
        const button = document.createElement('a');
        button.className = 'button button-primary';
        button.href = `${window.location.pathname}#logements`;
        button.textContent = 'Voir tous les logements';
        empty.append(title, text, button);
        results.appendChild(empty);
    }
}
