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

test('public pages expose a readable sharing image and browser and Apple icons', async () => {
    const sharp = require('../luminor/node_modules/sharp');
    const imageUrl = `${origin}/assets/social/cip-immo-share-v1.jpg`;
    for (const url of urls) {
        const content = html(new URL(url).pathname);
        assert.equal(content.match(/<meta property="og:image" content="([^"]+)"/)?.[1], imageUrl, url);
        assert.match(content, /<meta property="og:image:alt" content="[^"]+"/);
        assert.equal(meta(content, 'twitter:image'), imageUrl, url);
        assert.equal(meta(content, 'twitter:card'), 'summary_large_image', url);
        assert.match(content, /rel="icon"[^>]*href="\/favicon-96x96\.png"|href="\/favicon-96x96\.png"[^>]*rel="icon"/);
        assert.match(content, /rel="apple-touch-icon"/);
    }
    const image = await sharp(path.join(root, 'assets/social/cip-immo-share-v1.jpg')).metadata();
    assert.equal(image.format, 'jpeg');
    assert.equal(image.width, 1200);
    assert.equal(image.height, 630);
    assert(fs.statSync(path.join(root, 'assets/social/cip-immo-share-v1.jpg')).size < 1024 * 1024);
    for (const [name, size] of [['favicon-96x96.png', 96], ['apple-icon.png', 180]]) {
        const icon = await sharp(path.join(root, name)).metadata();
        assert.equal(icon.format, 'png');
        assert.equal(icon.width, size);
        assert.equal(icon.height, size);
    }
    const favicon = fs.readFileSync(path.join(root, 'favicon.ico'));
    assert.equal(favicon.readUInt16LE(0), 0);
    assert.equal(favicon.readUInt16LE(2), 1);
    assert(favicon.readUInt16LE(4) > 0);
});

const structuredBlocks = (content) => [...content.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
const structuredNodes = (content) => structuredBlocks(content).flatMap((block) => block['@graph'] || [block]);

test('structured data matches visible company details and published rental facts without invented claims', () => {
    for (const url of urls) {
        const content = html(new URL(url).pathname);
        const nodes = structuredNodes(content);
        const agency = nodes.find((node) => node['@type'] === 'RealEstateAgent');
        const website = nodes.find((node) => node['@type'] === 'WebSite');
        assert.equal(agency?.name, 'CIP IMMO', url);
        assert.equal(agency.telephone, '+224613585198');
        assert.equal(agency.email, 'contact@cipsarlu.com');
        assert.equal(agency.address.streetAddress, 'Nongo Kiroti');
        assert.equal(agency.address.addressLocality, 'Conakry');
        assert.equal(agency.address.addressCountry, 'GN');
        assert.equal(website?.url, origin + '/');
        assert.equal(website.publisher['@id'], agency['@id']);
        const visible = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
        assert.match(visible, /href="tel:\+224613585198"/);
        assert.match(visible, /href="mailto:contact@cipsarlu\.com"/);
        assert(visible.includes(agency.address.streetAddress));
        assert(!/"(?:aggregateRating|review|openingHours|openingHoursSpecification|geo|availability|potentialAction)"\s*:/.test(JSON.stringify(nodes)), url);
        const rental = catalogue.find((item) => url === `${origin}/logements/${item.slug}/`);
        if (!rental) continue;
        const listing = nodes.find((node) => node['@type'] === 'RealEstateListing');
        assert.equal(listing?.url, url);
        assert.equal(listing.name, rental.title);
        assert.equal(listing.mainEntity.identifier, rental.slug);
        assert.equal(listing.mainEntity.address.addressLocality, rental.municipality);
        assert.equal(listing.mainEntity.numberOfBedrooms, rental.beds ?? undefined);
        assert.equal(listing.mainEntity.floorSize?.value, rental.area ?? undefined);
        if (rental.price !== null && rental.period) {
            assert.equal(listing.offers.businessFunction, 'http://purl.org/goodrelations/v1#LeaseOut');
            assert.equal(listing.offers.priceSpecification.price, rental.price);
            assert.equal(listing.offers.priceSpecification.priceCurrency, 'GNF');
            assert.equal(listing.offers.priceSpecification.referenceQuantity.unitText, rental.period);
        } else assert.equal(listing.offers, undefined);
        const trail = nodes.find((node) => node['@type'] === 'BreadcrumbList');
        assert.deepEqual(trail.itemListElement.map((item) => item.position), [1, 2, 3]);
        assert.equal(trail.itemListElement.at(-1).item, url);
    }
});

test('catalogue text cannot escape JSON-LD and unknown facts are omitted', () => {
    const ts = require('../luminor/node_modules/typescript');
    const previousLoader = require.extensions['.ts'];
    let helpers;
    try {
        require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
            compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
        }).outputText, filename);
        helpers = require('../luminor/src/data/structuredData.ts');
    } finally {
        if (previousLoader) require.extensions['.ts'] = previousLoader;
        else delete require.extensions['.ts'];
    }
    const description = '</script><script>alert("test")</script> & texte';
    const rental = { ...catalogue[0], description, beds: null, area: null, price: null, period: '', photos: [{ src: 'https://example.invalid/photo.jpg', alt: 'Photo', width: 800, height: 600 }], imgSrc: '' };
    const data = helpers.rentalStructuredData(rental);
    const encoded = helpers.serializeStructuredData(data);
    assert(!encoded.includes('<'));
    assert.equal(JSON.parse(encoded).description, description);
    assert.equal(data.offers, undefined);
    assert.equal(data.mainEntity.numberOfBedrooms, undefined);
    assert.equal(data.mainEntity.floorSize, undefined);
    assert.equal(data.mainEntity.image, undefined);
    const explicitZero = helpers.rentalStructuredData({ ...rental, beds: 0, price: 0, period: 'jour' });
    assert.equal(explicitZero.mainEntity.numberOfBedrooms, 0);
    assert.equal(explicitZero.offers.priceSpecification.price, 0);
    const missingPeriod = helpers.rentalStructuredData({ ...rental, price: 100 });
    assert.equal(missingPeriod.offers, undefined);
});
