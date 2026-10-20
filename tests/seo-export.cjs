const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../luminor/.next-pages');
const origin = 'https://cipimmo.com';
const catalogue = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../luminor/src/data/catalogue.json'), 'utf8'));
const pages = ['/', '/listing-left-sidebar/', '/comment-louer/', '/about-us/', '/contacts/', '/FAQs/', '/our-pricing/', '/privacy-policy/'];
const html = (route) => fs.readFileSync(path.join(root, route, 'index.html'), 'utf8');
const meta = (content, name) => content.match(new RegExp(`<meta name="${name}" content="([^"]*)"`))?.[1];
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

test('the sitemap includes every published rental and public canonical page, with no private or duplicate URL', () => {
    const expected = [...pages, ...catalogue.filter((rental) => rental.published !== false).map((rental) => `/logements/${rental.slug}/`)];
    assert.deepEqual([...urls].sort(), expected.map((route) => origin + route).sort());
    assert.equal(new Set(urls).size, urls.length);
    assert.match(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'), /^Sitemap: https:\/\/cipimmo\.com\/sitemap\.xml$/m);
    assert.match(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8'), /^Disallow: \/admin$/m);
});

test('each indexable page has its own title, description and self-referencing canonical in exported HTML', () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const url of urls) {
        assert(url.startsWith(origin + '/'));
        const content = html(new URL(url).pathname);
        const title = content.match(/<title>([^<]+)<\/title>/)?.[1];
        const description = meta(content, 'description');
        assert(title && title !== 'CIP IMMO', url);
        assert(description && description.replace(/&(?:#x[0-9a-f]+|#\d+|[a-z]+);/gi, 'x').length <= 180, url);
        assert(!titles.has(title), `Duplicate title: ${url}`);
        assert(!descriptions.has(description), `Duplicate description: ${url}`);
        titles.add(title);
        descriptions.add(description);
        assert.equal(content.match(/<link rel="canonical" href="([^"]+)"/)?.[1], url);
        assert(!meta(content, 'robots')?.includes('noindex'), `Publication blocked: ${url}`);
    }
});

test('favorites and historical property aliases stay out of search results', () => {
    assert.match(meta(html('/favoris/'), 'robots'), /noindex/);
    for (const directory of fs.readdirSync(root).filter((name) => /^property-details-[1-4]$/.test(name))) {
        for (const id of fs.readdirSync(path.join(root, directory)).filter((name) => /^\d+$/.test(name))) {
            const content = html(`/${directory}/${id}/`);
            assert.match(meta(content, 'robots'), /noindex/);
            assert.match(content, /rel="canonical" href="https:\/\/cipimmo\.com\/logements\//);
        }
    }
});
